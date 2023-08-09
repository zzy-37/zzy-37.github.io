import json
import urllib.request
import urllib.parse
import multiprocessing as mp
import os
import gzip

user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.68'


def get_page(url: str, outfile: str):
    filepath = 'dump/'+outfile
    if os.path.exists(filepath):
        if filepath.endswith('.pdf'):
            print(f'file {filepath} is pdf file, skipping')
            return
        try:
            with open(filepath, 'rb') as f:
                return f.read().decode()
        except Exception as e:
            print(f'Error when reading {filepath}, {e}')

    print(f'get {url}, writing to file {outfile}')
    try:
        req = urllib.request.Request(url)
        req.add_header('user-agent', user_agent)
        # req.add_header(
        #     'accept', "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8")
        # req.add_header('accept-encoding', 'gzip, deflate, br')
        with urllib.request.urlopen(req) as f:
            data = f.read()
            encoding = f.getheader('content-encoding')
            if encoding == 'gzip':
                print('got gzipped data')
                data = gzip.decompress(data)
        with open(filepath, 'wb') as f:
            f.write(data)
        return data
    except Exception as e:
        print(f"Error when getting {outfile}, url: {url}, {e}")


def process_html(s: str):

    def foreach_attr(attrs: str, fn):
        rest = attrs
        while len(rest) > 0:
            name, rest = chop_by_fn(rest, lambda c: c == '=')
            if len(rest) == 0:
                break
            _, rest = chop_by_fn(rest[1:], lambda c: not c.isspace())
            if rest[0] == '"':
                value, rest = chop_by_fn(rest[1:], lambda c: c == '"')
                rest = rest[1:]
            elif rest[0] == "'":
                value, rest = chop_by_fn(rest[1:], lambda c: c == "'")
                rest = rest[1:]
            else:
                value, rest = chop_by_fn(rest, lambda c: c.isspace())
            if fn(name, value):
                break

    links = []
    base = ''

    while len(s) > 0:
        tag_start = s.find('<')
        if tag_start < 0:
            break

        s = s[tag_start+1:]
        tag_end = s.find('>')
        if tag_end < 0:
            tag = s
            s = ''
        else:
            tag = s[:tag_end]
            s = s[tag_end+1:]

        if tag.startswith('script '):
            i = s.find('</script>')
            if i < 0:
                break
            s = s[i+len('</script>'):]

        elif tag.startswith('base'):
            rest = tag[len('base '):]

            def handle_href(n, v):
                if n == 'href':
                    base = v
                    return True
                return False
            foreach_attr(rest, handle_href)

        elif tag.startswith('img '):
            rest = tag[len('img '):]

            def handle_src(name, value):
                if name.strip() == 'src':
                    value = value\
                        .replace('&amp;', '&')\
                        .replace('&lt;', '<')\
                        .replace('&gt;', '>')\
                        .replace('&quot;', '"')\
                        .replace('&apos;', "'")
                    if not value.startswith('data:'):
                        links.append(value)
                    return True
                return False

            foreach_attr(rest, handle_src)

    return base, links


def chop_by_fn(s: str, fn: callable) -> tuple[str, str]:
    try:
        return next((s[:i], s[i:]) for i, c in enumerate(s) if fn(c))
    except StopIteration:
        return s, ''


NAME_INDEX = 0
LINK_INDEX = 4


def entry_get_filename(index: int, entry: list):
    link = entry[LINK_INDEX].split()[0]
    filename = str(index).zfill(3) + ' ' + entry[NAME_INDEX]
    filename = filename\
        .replace('\n', ' ')\
        .replace('|', ' ')\
        .replace('/', ' ')\
        .replace(':', ' ')

    if link.endswith('.pdf'):
        filename += '.pdf'
    else:
        filename += '.html'
    return filename


def get_img_links_from_html(filepath: str, page_url: str):
    if not filepath.endswith('.html') or not os.path.exists('dump/'+filepath):
        return []

    print(f'processing {filepath}')
    with open('dump/'+filepath, 'rb') as f:
        data = f.read().decode()

    base, img_links = process_html(data)

    def concat_url(img_path: str):
        if img_path.startswith('http'):
            return img_path

        if img_path.startswith('//'):
            return page_url + img_path
        
        if base.startswith('//'):
            base = 'https:' + '//'
        
        if base.startswith('http'):
            page_url = base

        u = urllib.parse.urlparse(page_url)
        if base.startswith('/'):
            page_url = f'{u.scheme}://{u.netloc}{base}'


        url = f'{u.scheme}://{u.netloc}'
        if img_path.startswith('/'):
            return url + img_path

        # relative path
        dir = os.path.dirname(u.path)
        return f'{url}{dir}/{img_path}'

    return list(map(concat_url, ))


def main():
    with open('case-library-entries.json', 'rb') as f:
        entires = json.load(f)

    page_urls = map(lambda e: e[LINK_INDEX].split()[0], entires)
    names = map(entry_get_filename, range(len(entires)), entires)

    # print(list(zip(names, page_urls)))
    # exit()

    pool = mp.Pool(mp.cpu_count())
    # page_contents = pool.starmap(get_page, zip(page_urls, names))
    img_links = pool.starmap(get_img_links_from_html, zip(names, page_urls))
    with open('imgs.json', 'w') as f:
        json.dump(img_links, f, indent=2)

    # links = []
    # for entry in entires:
    #     links.append(entry[LINK_INDEX].split())

    # with open('dump/data.txt', 'w') as f:
    #     json.dump(links, f, indent=2)

def resolve_url(page_url: str, base_href: str, img_src: str):
    if img_src.startswith('http'):
        return img_src

    if base_href.startswith('//'):
        base_href = 'https:' + base_href

    if base_href.startswith('http'):
        page_url = base_href

    page_u = urllib.parse.urlparse(page_url)
    if img_src.startswith('//'):
        return f'{page_u.scheme}:{img_src}'

    base = f'{page_u.scheme}://{page_u.netloc}'
    if img_src.startswith('/'):
        return base + img_src

    if not base_href.startswith('//') or not base_href.startswith('http'):
        path = base_href


    return 




if __name__ == '__main__':
    # main()

    print(urllib.parse.urlparse('asdfsadf/safd'))

    print(os.path.dirname('asdfas/'))
    print(os.path.dirname('asdfas'))
