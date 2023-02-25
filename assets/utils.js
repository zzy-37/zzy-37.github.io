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

const markdown = async text => {
    if (!window.marked) await load_script('https://cdnjs.cloudflare.com/ajax/libs/marked/4.2.12/marked.min.js')
    return E('template', { innerHTML: marked.parse(text) })().content
}

const markdown_sync = text => {
    if (!window.marked) throw new Error('marked.js not loaded')
    return E('template', { innerHTML: marked.parse(text) })().content
}