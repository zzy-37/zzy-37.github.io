const make_ifs = (coefficients, probabilities = null) => ({
    coefficients,
    probabilities,
    set_probabilites(probabilities) { this.probabilities = probabilities },
    randomize_probablilties() {
        let probability_remain = 1
        this.probabilities = Array.from({ length: this.coefficients.length }, () => {
            const random_probablity = Math.random() * probability_remain
            probability_remain -= random_probablity
            return random_probablity
        })
    },
    update(x, y) {
        const random_zero_to_one = Math.random()
        let accumulator = 0
        let coefficient = null
        for (let i = 0; i < this.coefficients.length; ++i) {
            accumulator += this.probabilities ? this.probabilities[i] : 1 / this.coefficients.length
            if (accumulator > random_zero_to_one) {
                const [a, b, c, d, e, f] = this.coefficients[i]
                const nx = a * x + b * y + e
                const ny = c * x + d * y + f
                return [nx, ny]
            }
        }
        throw 'Unreachable'
    },
})

const make_random_ifs = set_count =>
    make_ifs(Array.from({ length: set_count }, () => {
        with (Math) {
            const m = random() * PI * 2
            const n = random() * PI * 2
            const ra = random()
            const rb = random()

            const a = sin(m) * ra
            const b = cos(m) * ra
            const c = sin(n) * rb
            const d = cos(n) * rb
            const e = random() * 2 - 1
            const f = random() * 2 - 1

            return [a, b, c, d, e, f]
        }
    }))

const barnsleysfern_ifs = make_ifs(
    [[0, 0, 0, 0.16, 0, 0],
    [0.85, 0.04, -0.04, 0.85, 0, 1.60],
    [0.20, -0.26, 0.23, 0.22, 0, 1.60],
    [-0.15, 0.28, 0.26, 0.24, 0, 0.44]],
    [0.01, 0.85, 0.07, 0.07])

const mapleleaf_ifs = make_ifs(
    [[0.1400, 0.0100, 0.0000, 0.5100, -0.0800, -1.3100],
    [0.4300, 0.5200, -0.4500, 0.5000, 1.4900, -0.7500],
    [0.4500, -0.4900, 0.4700, 0.4700, -1.6200, -0.7400],
    [0.4900, 0.0000, 0.0000, 0.5100, 0.0200, 1.6200]])

const tree_ifs = make_ifs(
    [[0.1950, -0.4880, 0.3440, 0.4430, 0.4431, 0.2452],
    [0.4620, 0.4140, -0.2520, 0.3610, 0.2511, 0.5692],
    [-0.6370, 0.0000, 0.0000, 0.5010, 0.8562, 0.2512],
    [-0.0350, 0.0700, -0.4690, 0.0220, 0.4884, 0.5069],
    [-0.0580, -0.0700, 0.4530, -0.1110, 0.5976, 0.0969]])

const twig_ifs = make_ifs(
    [[0.387, 0.430, 0.430, -0.387, 0.2560, 0.5220],
    [0.441, -0.091, -0.009, -0.322, 0.4219, 0.5059],
    [-0.468, 0.020, -0.113, 0.015, 0.4, 0.4]])

const ifs_to_canvas_fit_size = (ifs, width, height, iteration) => {
    with (Math) {
        let x = 0, y = 0
        let minx = 0, miny = 0
        let maxx = 0, maxy = 0
        const points = Array.from({ length: iteration }, () => {
            [x, y] = ifs.update(x, y)
            minx = min(x, minx)
            miny = min(y, miny)
            maxx = max(x, maxx)
            maxy = max(y, maxy)
            return [x, y]
        })

        const scl = min(width - 1, height - 1) / max(maxx - minx, maxy - miny)
        const pixels = new ImageData((maxx - minx) * scl + 1, (maxy - miny) * scl + 1)
        const points_count_per_pixel = new Uint16Array(pixels.width * pixels.height)
        let max_count = 0
        points.forEach(([x, y]) => {
            x = (x - minx) * scl | 0
            y = (y - miny) * scl | 0
            const i = x + y * pixels.width
            points_count_per_pixel[i] += 1
            max_count = max(points_count_per_pixel[i], max_count)
        })

        points_count_per_pixel.forEach((count, i) => {
            const bri = log1p(count) / log1p(max_count) * 255 | 0
            const pixel = pixels.data.subarray(i * 4)
            pixel[0] = 255
            pixel[1] = 255
            pixel[2] = 255
            pixel[3] = bri
        })

        const ctx = create_context(pixels.width, pixels.height)
        ctx.putImageData(pixels, 0, 0)
        return ctx.canvas
    }
}