const ce = name => document.createElement(name)
const { assign } = Object

const E = (name, attr = {}) => (...children) => {
    const el = assign(ce(name), attr)
    el.append(...children)
    return el
}

const fetch_text = async url => (await fetch(url)).text()

const load_script = src => new Promise((resolve, reject) =>
    document.head.append(E('script', {
        src: src,
        onload: resolve,
        onerror: reject
    })()))

const load_marked = () => window.marked ? Promise.resolve() :
    load_script('https://cdnjs.cloudflare.com/ajax/libs/marked/4.2.12/marked.min.js')

const load_katex = () => {
    if (window.katex) return Promise.resolve()
    document.head.append(E('link', {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.css'
    })())
    return load_script('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js')
}

const marked_katex_extension = (options = {}) => {
    const inlineKatex = {
        name: 'inlineKatex',
        level: 'inline',
        start: src => src.indexOf('$'),
        tokenizer: src => {
            const match = src.match(/^\$+([^$\n]+?)\$+/)
            if (match) {
                return {
                    type: 'inlineKatex',
                    raw: match[0],
                    text: match[1].trim()
                }
            }
        },
        renderer: token => katex.renderToString(token.text, assign(options, { displayMode: false }))
    }

    const blockKatex = {
        name: 'blockKatex',
        level: 'block',
        start: src => src.indexOf('\n$$'),
        tokenizer: src => {
            const match = src.match(/^\$\$+\n([^$]+?)\n\$\$+\n/)
            if (match) {
                return {
                    type: 'blockKatex',
                    raw: match[0],
                    text: match[1].trim()
                }
            }
        },
        renderer: token => `<p>${katex.renderToString(token.text, assign(options, { displayMode: true }))}</p>`
    }

    return { extensions: [inlineKatex, blockKatex] }
}

const load_marked_katex_extension = options =>
    Promise.all([load_marked(), load_katex()]).then(() => {
        marked.use(marked_katex_extension(options))
        return Promise.resolve()
    })

const html_to_fragment = text => E('template', { innerHTML: text })().content

const math = async (text, displayMode = false) => {
    await load_katex()
    return html_to_fragment(katex.renderToString(text, { displayMode }))
}

const math_sync = (text, displayMode = false) => {
    if (!window.katex) throw 'katex is not loaded'
    return html_to_fragment(katex.renderToString(text, { displayMode }))
}

const markdown = async text => {
    await load_marked()
    return html_to_fragment(marked.parse(text))
}

const markdown_sync = text => {
    if (!window.marked) throw 'marked.js not loaded'
    return html_to_fragment(marked.parse(text))
}