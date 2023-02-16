class IFS {
    constructor(name, coes, probs) {
        if (coes[0].length !== 6) throw Error('A coefficients array must contain 6 elements.')
        this.coes = coes
        if (probs) {
            if (coes.length !== probs.length) throw Error('Coefficients array and probablilities array is not the same length')
            this.probs = probs
        } else {
            this.probs = Array.from(coes, () => 1 / coes.length)
        }
        let prob = 0
        this.probs = this.probs.map(x => prob += x)
        // console.log(this.probs)
        this.name = name
    }
    update(x, y) {
        const r = Math.random()
        let idx = 0
        for (; r > this.probs[idx]; ++idx);
        const [a, b, c, d, e, f] = this.coes[idx]
        const nx = a * x + b * y + e
        const ny = c * x + d * y + f
        return [nx, ny]
    }
    iterate(iteration) {
        let x = 0, y = 0
        let min = 0, max = 0
        const coords = []
        for (let i = 0; i < iteration; ++i) {
            [x, y] = this.update(x, y)
            min = Math.min(min, x, y)
            max = Math.max(max, x, y)
            coords.push(x, y)
        }
        return { min, max, coords }
    }
    randomProbs() {
        this.probs = []
        for (let i = 0; i < this.coes.length - 1; ++i) {
            this.probs.push(Math.random())
        }
        this.probs.sort((a, b) => a - b)
        this.probs.push(1)
    }
}

const barnsleysFernIfs = new IFS("Barnsley's Fern",
    [
        [0, 0, 0, 0.16, 0, 0],
        [0.85, 0.04, -0.04, 0.85, 0, 1.60],
        [0.20, -0.26, 0.23, 0.22, 0, 1.60],
        [-0.15, 0.28, 0.26, 0.24, 0, 0.44]
    ],
    [0.01, 0.85, 0.07, 0.07]
)

const mapleLeafIfs = new IFS('Maple Leaf', [
    [0.1400, 0.0100, 0.0000, 0.5100, -0.0800, -1.3100],
    [0.4300, 0.5200, -0.4500, 0.5000, 1.4900, -0.7500],
    [0.4500, -0.4900, 0.4700, 0.4700, -1.6200, -0.7400],
    [0.4900, 0.0000, 0.0000, 0.5100, 0.0200, 1.6200],
])

const treeIfs = new IFS('Tree', [
    [ 0.1950, -0.4880,  0.3440,  0.4430, 0.4431, 0.2452],
    [ 0.4620,  0.4140, -0.2520,  0.3610, 0.2511, 0.5692],
    [-0.6370,  0.0000,  0.0000,  0.5010, 0.8562, 0.2512],
    [-0.0350,  0.0700, -0.4690,  0.0220, 0.4884, 0.5069],
    [-0.0580, -0.0700,  0.4530, -0.1110, 0.5976, 0.0969],
])

const twigIfs = new IFS('Twig', [
    [0.387, 0.430, 0.430, -0.387, 0.2560, 0.5220],
    [0.441, -0.091, -0.009, -0.322, 0.4219, 0.5059],
    [-0.468, 0.020, -0.113, 0.015, 0.4, 0.4],
])

const randomIFS = new IFS('Random', Array.from({ length: 4 }, genSet))

function genSet() {
    const m = Math.random() * Math.PI * 2
    const n = Math.random() * Math.PI * 2
    const ra = Math.random()
    const rb = Math.random()

    const a = Math.sin(m) * ra
    const b = Math.cos(m) * ra
    const c = Math.sin(n) * rb
    const d = Math.cos(n) * rb
    const e = Math.random() * 2 - 1
    const f = Math.random() * 2 - 1

    return [a, b, c, d, e, f]
}