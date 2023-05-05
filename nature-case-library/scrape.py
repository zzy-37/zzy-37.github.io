import urllib.request

ref_url = 'https://www.theguardian.com/cities/gallery/2017/sep/01/popsicles-pollution-ice-lollies-taiwan-taipei-contaminated-waterways'
img_url = 'https://i.guim.co.uk/img/media/36652b6655ae305ebe50ed848cb961d15fba483b/0_0_5000_3000/master/5000.jpg?width=1750&quality=85&auto=format&fit=max&s=45b22a6ef71df99bc8755b3fa37f4432'

req = urllib.request.Request(img_url)

with open('out.webp', 'wb') as outf:
    with urllib.request.urlopen(req) as f:
        for header in f.getheaders():
            print(header)
        outf.write(f.read())
