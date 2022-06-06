Element.prototype.$attr = function (attr) {
    Object.assign(this, attr)
    return this
}
Element.prototype.$class = function (...className) {
    this.className.add(...className)
    return this
}
Element.prototype.$style = function (style) {
    Object.assign(this.style, style)
    return this
}

function ce(name, ...children) {
    const el = document.createElement(name)
    el.append(...children)
    return el
}
function qs(query, parent = document) {
    return parent.querySelector(query)
}

function slugify(str) {
    return str.trim()
        .replace(/[^\w\s-.~]/g, '')
        .replace(/\s/g, '_')
}

class SliderGroup {
    constructor(container) {
        this.container = container || ce('div')
    }
    sliders = {}
    attr = {}
    value(name) { return this.sliders[name].value }
    add(name, attr) {
        const slider = ce('input').$attr({ type: 'range' })
            .$attr(this.attr)
            .$attr(attr)

        const label = ce('label', name)
        const value = ce('span', slider.value)
        slider.addEventListener('input', () => value.textContent = slider.value)
        this.sliders[name] = slider
        this.container.append(label, slider, value, ce('br'))
    }
}