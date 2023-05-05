const append = elem => (...children) => (elem.append(...children), elem)
const ce = (name, attrs = {}) => (...children) =>
    append(Object.assign(document.createElement(name), attrs))(...children)

    ;['div', 'p', 'span', 'ul', 'li', 'b',
        'blockquote', 'label', 'details', 'summary',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    ].forEach(name => window[name] = (...children) => ce(name)(...children))

const a = (href = '#') => (...children) => ce('a', { href })(...children)
const input = attrs => ce('input', attrs)()
const button = attrs => ce('button', attrs)()
const img = src => ce('img', { src })()

const load_script = src => new Promise((resolve, reject) =>
    document.head.append(ce('script', { src, onload: resolve, onerror: reject })()))

const load_marked = () => load_script('https://cdnjs.cloudflare.com/ajax/libs/marked/4.2.12/marked.min.js')
const load_katex = () => {
    document.head.append(ce('link', {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css'
    })())
    return load_script('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js')
}

const assert = cond => { if (!cond) throw new Error('Assertion failed') }

const map_range = (x, a, b, c, d) => c + (x - a) / (b - a) * (d - c)
