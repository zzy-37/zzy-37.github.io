Element.prototype.$attr = function (attr) {
    Object.assign(this, attr)
    return this
}
Element.prototype.$class = function (...className) {
    this.classList.add(...className)
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
function createContext(width, height, mode = '2d') {
    return ce('canvas').$attr({ width: width, height: height }).getContext(mode)
}

function slugify(str) {
    return str.trim()
        .replace(/[^\w\s-.~]/g, '')
        .replace(/\s/g, '_')
}

class labeledSlider {
    constructor(name, attr) {
        this.slider = ce('input').$attr({ type: 'range' })
            .$attr(attr)
        this.slider.addEventListener('input', this.update)
        this.name = name
        this.update()
    }

    label = ce('label')
    output = ce('output')
    get el() { return ce('div', this.label, this.slider, this.output) }
    get value() { return this.slider.value }
    set value(val) {
        this.slider.value = val
        this.update()
    }

    update = () => {
        this.label.textContent = this.name
        this.output.textContent = this.value
    }
}

class SliderGroup {
    constructor(container) {
        this.container = container || ce('div')
    }
    value(name) { return this.sliders[name].value }
    // values = {}
    sliders = {}
    attr = {}
    add(name, attr) {
        const obj = new labeledSlider(name, this.attr)
        obj.slider.$attr(attr)
        obj.update()
        this.sliders[name] = obj
        this.container.append(obj.el)
    }
}

class ButtonSwitcher {
    buttons = ce('div')
    elements = {}
    click(name) { this.elements[name].dispatchEvent(new Event('click')) }
    add(name, el, callback) {
        if (!this.ref) this.ref = el
        const button = ce('button', name)
        if (callback) button.onclick = callback
        button.addEventListener('click', () => {
            this.ref.replaceWith(el)
            this.ref = el
        })
        this.elements[name] = button
        this.buttons.append(button)
    }
}