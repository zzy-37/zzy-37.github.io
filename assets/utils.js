const ce = name => document.createElement(name)
const { assign } = Object

const E = (name, attr = {}) => (...children) => {
    const el = assign(ce(name), attr)
    el.append(...children)
    return el
}

const load_script = src => new Promise((resolve, reject) =>
    document.head.append(E('script', {
        src: src,
        onload: resolve,
        onerror: reject
    })()))

const html_to_fragment = text => E('template', { innerHTML: text })().content

const markdown = async text => {
    if (!window.marked) await load_script('https://cdnjs.cloudflare.com/ajax/libs/marked/4.2.12/marked.min.js')
    return html_to_fragment(marked.parse(text))
}

const markdown_sync = text => {
    if (!window.marked) throw new Error('marked.js not loaded')
    return html_to_fragment(marked.parse(text))
}