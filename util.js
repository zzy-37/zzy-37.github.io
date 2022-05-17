function addUtilFunc(ele) {
    ele.$attr = function (attr) {
        Object.assign(this, attr)
        return this
    }
    ele.$class = function (...className) {
        this.className.add(...className)
        return this
    }
    ele.$style = function (style) {
        Object.assign(this.style, style)
        return this
    }
    return ele
}

function ce(name, ...children) {
    const ele = document.createElement(name)
    ele.append(...children)
    addUtilFunc(ele)
    return ele
}

addEventListener('load', () => {
    addUtilFunc(document.documentElement)
    addUtilFunc(document.head)
    addUtilFunc(document.body)
})