// IFS
const ifsview = createContext(800, 600)
const ifsbg = createContext(800, 600)
const ifspre = createContext(800, 800)
const ifsList = [mapleLeafIfs, barnsleysFernIfs, treeIfs, twigIfs, randomIFS]
let ifs = mapleLeafIfs
let pointsData
const ifsSwicher = new ButtonSwitcher
for (let currentIfs of ifsList) {
    const { buttons, ref } = paramSliders(currentIfs)
    const el = ce('div', ce('h3', currentIfs.name),  buttons, ref)
    ifsSwicher.add(currentIfs.name, el, function () {
        ifs = currentIfs
        draw()
    })
}
function nextIfs() {
    let i = ifsList.indexOf(ifs)
    if (++i >= ifsList.length) i = 0
    ifsSwicher.click(ifsList[i].name)
}

const previewSliders = new SliderGroup
previewSliders.add('iteration', { max: 300000, value: 200000, oninput: draw })
previewSliders.add('r', { max: 255, value: 0, oninput: drawPreview })
previewSliders.add('g', { max: 255, value: 0, oninput: drawPreview })
previewSliders.add('b', { max: 255, value: 0, oninput: drawPreview })

function randomColor() {
    const sliders = previewSliders.sliders
    sliders.r.value = Math.random() * 255 | 0
    sliders.g.value = Math.random() * 255 | 0
    sliders.b.value = Math.random() * 255 | 0
    drawPreview()
}

// translate for view
let translateX = translateY = 0
let scale = 0.5
let rotation = 0

let move = true
ifsview.canvas.onkeydown = e => {
    e.preventDefault()
    switch (e.key) {
        case 'c': randomColor(); break
        case 's': ifsview.canvas.onwheel = changeScale; break
        case 'r': ifsview.canvas.onwheel = changeRotation; break
        case 'i': nextIfs(); break
        case ' ': move = !move; break
    }
}
ifsview.canvas.onwheel = changeScale

function changeRotation(e) {
    e.preventDefault()
    rotation += e.deltaY * 0.1
    drawView()
}
function changeScale(e) {
    e.preventDefault()
    scale += e.deltaY * 0.001
    drawView()
}
function drawBg() {
    const ctx = ifsbg
    clear(ctx)
    ctx.drawImage(ifsview.canvas, 0, 0)
}

ifsview.canvas.onclick = drawBg
ifsview.canvas.onmousemove = e => {
    if (move) {
        translateX = e.offsetX
        translateY = e.offsetY
        drawView()
    }
}

const btnClear = ce('button', 'Clear').$attr({ onclick: () => clear(ifsbg) })
const btnRandColor = ce('button', 'Random Color').$attr({ onclick: randomColor })
const btnRandProbs = ce('button', 'Random Probabilities').$attr({ onclick: () => {
    ifs.randomProbs()
    draw()
} })

const control = ce('div',
    ifsSwicher.buttons,
    ifsSwicher.ref,
    ce('hr'),
    previewSliders.container,
    btnRandColor,
    btnRandProbs,
    btnClear
).$style({
    display: 'inline-block',
    'vertical-align': 'top',
    padding: '1rem',
})

ifspre.canvas.$style({ 'max-width': '300px' })
const over = ce('div', control, ifspre.canvas).$class('border')
draw()

function draw() {
    const iteration = previewSliders.sliders.iteration.value
    pointsData = ifs.iterate(iteration)

    drawPreview()
}

function drawPreview() {
    let ctx = ifspre
    const pixels = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    fillImageDataFromPointsData(pixels, pointsData)
    ctx.putImageData(pixels, 0, 0)

    drawView()
}

function drawView() {
    const ctx = ifsview
    // const rotate = transformSliders.value('rotate')

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(ifsbg.canvas, 0, 0)

    ctx.save()
    ctx.translate(translateX, translateY)
    ctx.scale(scale, scale)
    ctx.rotate(rotation / 180 * Math.PI)

    ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)
    ctx.drawImage(ifspre.canvas, 0, 0)
    ctx.restore()
}

function fillImageDataFromPointsData(imageData, pointsData, color = {r: 255, g: 255, b: 255}) {
    const { min, max, coords } = pointsData
    const width = imageData.width
    const height = imageData.height
    const counts = Array(width * height)
    counts.fill(0)
    let maxCount = 0
    for (let i = 0; i < coords.length; i += 2) {
        const x = Math.floor(map(coords[i], min, max, 0, width - 1))
        const y = Math.floor(map(coords[i + 1], max, min, 0, height - 1))
        const idx = x + y * width
        maxCount = Math.max(++counts[idx], maxCount)
    }
    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            const i = x + y * width
            const bri = Math.log1p(counts[i]) / Math.log1p(maxCount) * 255 | 0
            imageData.data[i * 4]     = color.r
            imageData.data[i * 4 + 1] = color.g
            imageData.data[i * 4 + 2] = color.b
            imageData.data[i * 4 + 3] = bri
        }
    }
    return imageData
}

function paramSliders(ifs) {
    const vars = ['a', 'b', 'c', 'd', 'e', 'f']
    const result = new ButtonSwitcher
    for (let j = 0; j < ifs.coes.length; ++j) {
        const set = ifs.coes[j]
        const group = new SliderGroup
        group.attr = { min: -2, max: 2, step: 0.01 }
        for (let i = 0; i < 4; ++i) {
            group.add(vars[i], { value: set[i], oninput: function() {
                set[i] = this.value // update ifs coefficients
                draw()
            } })
        }
        result.add('Set ' + j, ce('div', ce('b', 'Set ' + j),  group.container))
    }
    return result
}

// L-system

class LSystem {
    constructor (axiom, angle, rule) {
        this.axiom = axiom
        this.angle = angle
        this.rule = rule
    }
    update(symbols) {
        let newSyms = ''
        for (let char of symbols) {
            if (char in this.rule) newSyms += this.rule[char]
            else newSyms += char
        }
        return newSyms
    }
    iterate(iteration) {
        let syms = this.axiom
        for (let i = 0; i < iteration; ++i)
            syms = this.update(syms, this.rule)
        return syms
    }
    interpret(ctx, draw, symbols, stepSize = 10) {
        for (let char of symbols) {
            switch (char) {
                case 'F':
                    draw()
                    ctx.translate(0, stepSize)
                    break
                case '-':
                    ctx.rotate(-this.angle)
                    break
                case '+':
                    ctx.rotate(this.angle)
                    break
                case '[':
                    ctx.save()
                    break
                case ']':
                    ctx.restore()
                    break
            }
        }
    }
}

function degToRad(deg) { return deg / 180 * Math.PI }

// Axiom X
// F --> FF
// X --> F-[[X]+X]+F[+FX]-X
// ø = 22.5
const bushLSystem = new LSystem('X', degToRad(22.5), {
    F: 'FF',
    X: 'F-[[X]+X]+F[+FX]-X',
})








function map(x, a, b, m, n) { return m + (n - m) * ((x - a) / (b - a)) }
function smoothstep(x) { return x * x * (3 - 2 * x) }
function interp(a, b, t) { return a + (b - a) * smoothstep(t) }
function lerp(a, b, t) { return a + (b - a) * t }
function clear(ctx) { ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) }

function drawSquare(ctx, p, a = 1) { ctx.fillRect(p[0] - a / 2, p[1] - a / 2, a, a) }
function drawLineMapped(ctx, p1, p2) {
    const m1 = mapToScreen(...p1)
    const m2 = mapToScreen(...p2)
    ctx.beginPath()
    ctx.moveTo(m1[0], m1[1])
    ctx.lineTo(m2[0], m2[1])
    ctx.stroke()
}
function drawLine(ctx, p1, p2) {
    ctx.beginPath()
    ctx.moveTo(p1[0], p1[1])
    ctx.lineTo(p2[0], p2[1])
    ctx.stroke()
}

function interpPoint(p1, p2, t) {
    return [interp(p1[0], p2[0], t),
            interp(p1[1], p2[1], t)]
}

const affine1 = createContext(400, 600)
const affine2 = createContext(400, 600)

{
    const ctx = affine1
    let minx = -5
    let maxx = 5
    let miny = -0.2
    let maxy = miny + (maxx - minx) * ctx.canvas.height / ctx.canvas.width
    function mapToScreen(x, y) {
        return [map(x, minx, maxx, 0, ctx.canvas.width),
                map(y, miny, maxy, 0, ctx.canvas.height)]
    }
    function drawAxices(ctx) {
        ctx.strokeStyle = '#808080'
        for (let x = minx; x < maxx; x += 0.5) {
            drawLineMapped(ctx, [x, miny], [x, maxy])
        }
        for (let y = 0; y < maxy; y += 0.5) {
            drawLineMapped(ctx, [minx, y], [maxx, y])
        }

        ctx.strokeStyle = '#ff1818'
        drawLineMapped(ctx, [minx, 0], [maxx, 0])
        drawLineMapped(ctx, [0, miny], [0, maxy])
    }

    function affineAnimation() {
        return {
            startT: 0,
            duration: 1000,
            color: '#FF1818',
            vec: [2, 2],
            pos: [0, 0],
            set: barnsleysFernIfs.coes[1],
            finished: false,
            animate: function (ts) {
                const dt = ts - this.startT
                if (dt > 0) {
                    const t = dt / this.duration
                    const [a, b, c, d, e, f] = this.set
                    const vx = a * this.vec[0] + b * this.vec[1]
                    const vy = c * this.vec[0] + d * this.vec[1]
                    const endV = [vx, vy]
                    if (dt < this.duration) {
                        const [ix, iy] = interpPoint(this.vec, endV, t)
                        // console.log(ix, iy)
                        ctx.strokeStyle = this.color
                        drawLineMapped(ctx, this.pos, [this.pos[0] + ix, this.pos[1] + iy])
                    } else {
                        this.vec = endV
                        this.startT = ts
                        this.animate = function (ts) {
                            const dt = ts - this.startT
                            if (dt > 0) {
                                const t = dt / this.duration
                                const [a, b, c, d, e, f] = this.set
                                const endP = [this.pos[0] + e, this.pos[1] + f]
                                if (dt < this.duration) {
                                    const ip = interpPoint(this.pos, endP, t)
                                    ctx.strokeStyle = this.color
                                    drawLineMapped(ctx, ip, [ip[0] + this.vec[0], ip[1] + this.vec[1]])
                                } else if (!this.finished) {
                                    this.finished = true
                                    const a = affineAnimation()
                                    a.startT = ts
                                    a.color = this.color
                                    a.vec = [endP[0] + this.vec[0], endP[1] + this.vec[1]]
                                    pts.push(a.vec)
                                    animations.push(a)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const pts = []
const animations = []
function startAnimation(ctx) {
    const startT = performance.now()

    const a1 = affineAnimation()
    const a2 = affineAnimation()
    const a3 = affineAnimation()
    const a4 = affineAnimation()
    a2.vec = [1, 3]
    a3.set = barnsleysFernIfs.coes[2]
    a3.color = '#18ff18'
    a4.set = barnsleysFernIfs.coes[3]
    a4.color = '#1818ff'
    // const a2 = lineAnimation()
    // a2.start = [[50, 100], [400, 300]]
    // a2.startT = 2000
    const arr = [a1, a2, a3, a4]
    let i = 0
    ctx.canvas.onclick = () => {
        if (i < arr.length) animations.push(arr[i++])
        if (i === 1) requestAnimationFrame(animate)
    }

    function animate(ts) {
        const time = ts - startT
        draw()
        let running = false
        for (let a of animations) {
            a.animate(time)
            if (!a.finished) running = true
        }
        if (running) requestAnimationFrame(animate)
    }

    function draw() {
        clear(ctx)
        drawAxices(ctx)
        ctx.fillStyle = '#ff1818'
        for (let p of pts) drawSquare(ctx, mapToScreen(...p), 5)
    }
}

function affine(p, set) {
    const [a, b, c, d, e, f] = set
    const nx = a * p[0] + b * p[1] + e
    const ny = c * p[0] + d * p[1] + f
    return [nx, ny]
}

{
    let p = [0, 0]
    affine2.canvas.onclick = () => {
        const idx = Math.random() * 4 | 0
        const set = barnsleysFernIfs.coes[idx]
        drawSquare(affine2, mapToScreen(...p = affine(p, set)), 5)
    }
}

affine1.translate(0, affine1.canvas.height)
affine1.scale(1, -1)
drawAxices(affine1)
startAnimation(affine1)

affine2.translate(0, affine2.canvas.height)
affine2.scale(1, -1)
affine2.fillStyle = '#ff1818'
drawAxices(affine2)



// ripple
const POINTS_NUM = 20

const ripple2d = createContext(800, 100)
const ripplegl = createContext(800, 600, 'webgl2')

const program = initShaderProgram(ripplegl, vs.textContent, fs.textContent)

// parameters
let dt
let speed = 10
let scaleX = 0.1
let scaleY = 1
let lifetime = 10
const group = new SliderGroup
group.add('speed', { value: speed, oninput: function () { speed = this.value } })
group.add('scaleX', { min: 0.01, max: 1, step: 0.01, value: scaleX, oninput: function () { scaleX = this.value } })
group.add('scaleY', { min: 0.01, max: 2, step: 0.01, value: scaleY, oninput: function () { scaleY = this.value } })
group.add('lifetime', { value: lifetime, oninput: function () { lifetime = this.value } })
group.container.$style({ padding: '1rem' })

const mouse = { x: 0, y: 0, down: false }

{
    let i = 0
    function addRipple() {
        times[i] = dt
        positions[i * 2] = mouse.x
        positions[i * 2 + 1] = mouse.y
        if (++i >= POINTS_NUM) i = 0
    }

    const positions = Array(POINTS_NUM * 2)
    positions.fill(0)
    const times = Array(POINTS_NUM)
    times.fill(0)
    function drawGL() {
        ripplegl.clearColor(0, 0, 0, 0)
        ripplegl.clear(ripplegl.COLOR_BUFFER_BIT | ripplegl.DEPTH_BUFFER_BIT)

        // program.setUniform('u_resolution', gl.canvas.width, gl.canvas.height)
        program.setUniform('u_time', dt)
        program.setUniform('u_scale_x', scaleX)
        program.setUniform('u_scale_y', scaleY)
        program.setUniform('u_lifetime', lifetime)
        program.setUniform('u_start_time', times)
        program.setUniform('u_pos', positions)

        ripplegl.drawArrays(ripplegl.TRIANGLE_STRIP, 0, 4)
    }
    function draw2d() {
        ripple2d.clearRect(0, 0, ripple2d.canvas.width, ripple2d.canvas.height)

        ripple2d.beginPath()
        for (let x = 0; x < ripple2d.canvas.width; ++x) {
            let r = ripple2d.canvas.height / 2
            for (let i = 0; i < POINTS_NUM; ++i) {
                r += calc(x, positions[i * 2], times[i]) * 5
            }
            if (x === 0) ripple2d.moveTo(x, r)
            else ripple2d.lineTo(x, r)
        }
        ripple2d.stroke()
    }
}

ripplegl.canvas.onmousemove = e => {
    const dx = e.movementX
    const dy = e.movementY
    const dist = Math.sqrt(dx * dx + dy * dy)
    mouse.x = e.offsetX
    mouse.y = ripplegl.canvas.height - e.offsetY
    if (mouse.down && dist > 40) addRipple()
}
ripplegl.canvas.onmousedown = e => { mouse.down = true; addRipple() }
ripplegl.canvas.onmouseup = e => { mouse.down = false }

newAttributeBuffer(ripplegl, program, 'a_position', [-1, -1, 1, -1, -1, 1, 1, 1], 2)
ripplegl.useProgram(program)

ripple2d.strokeStyle = '#fff'
const startts = performance.now()
loop()

function loop(ts) {
    dt = (ts - startts) * 0.001 * speed
    draw2d()
    drawGL()
    requestAnimationFrame(loop)
}

function calc(x, pos, start_time) {
    const dist = Math.abs(x - pos) * scaleX
    const t = dt - start_time;
    const pow = (t > lifetime) ? 0.0 : (lifetime - t) / lifetime * scaleY;
    const r = Math.cos(dist - dt) / dist * pow
    return r
}

onload = () => {
    affineContainer.append(
        affine1.canvas,
        affine2.canvas,
    )
    ifsContainer.append(over, ifsview.canvas)
    rippleContainer.append(group.container, ripple2d.canvas, ripplegl.canvas)
}