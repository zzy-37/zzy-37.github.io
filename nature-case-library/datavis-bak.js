const area_xs = new Float32Array(technology_categories.length)
const area_ys = new Float32Array(technology_categories.length)
const area_rs = new Float32Array(technology_categories.length)
const proj_xs = Array(technology_categories.length)
const proj_ys = Array(technology_categories.length)

const sqrt_max_count = sqrt(max_count)
const sqrt_min_count = sqrt(min_count)
const min_r = 20
const max_r = 100
const proj_r = 5

const gen_points_from_offset = (x, y, valid_range, inner_gap = 0) => {
    const offset = map_range(random(), 0, 1, inner_gap, inner_gap + valid_range)
    const a = random() * PI * 2
    x += cos(a) * offset
    y += sin(a) * offset
    return [x, y]
}

const test_point = (x1, y1, x2, y2, min_dist) => {
    const dx = x1 - x2
    const dy = y1 - y2
    return dx * dx + dy * dy < min_dist * min_dist
}

for (let i = 0; i < technology_categories.length; ++i) {
    const ri = map_range(sqrt(tech_counts[i]), sqrt_min_count, sqrt_max_count, min_r, max_r)
    area_rs[i] = ri
    let x, y
    if (i === 0) {
        x = width / 2
        y = height / 2
        // x = ri + 50
        // y = ri + 50
    } else {
        gen_point: for (; ;) {
            next_point: for (let j = 0; j < i; ++j) {
                [x, y] = gen_points_from_offset(area_xs[j], area_ys[j], 50, ri + area_rs[j])
                if (x > ri && x < width - ri &&
                    y > ri && y < height - ri) {
                    for (let k = 0; k < i; ++k) {
                        if (test_point(x, y, area_xs[k], area_ys[k], ri + area_rs[k])) {
                            continue next_point
                        }
                    }
                    // found
                    break gen_point
                }
            }
        }
    }
    area_xs[i] = x
    area_ys[i] = y

    const xs = new Float32Array(tech_counts[i])
    const ys = new Float32Array(tech_counts[i])
    proj_xs[i] = xs
    proj_ys[i] = ys

    for (let j = 0; j < tech_counts[i]; ++j) {
        gen_point: for (; ;) {
            const [px, py] = gen_points_from_offset(x, y, ri - proj_r)
            for (let k = 0; k < j; ++k) {
                if (test_point(px, py, xs[k], ys[k], proj_r * 2 + 3)) {
                    continue gen_point
                }
            }
            xs[j] = px
            ys[j] = py
            break
        }
    }

    // ctx.fillStyle = 'white'
    // draw_circle(ctx, x, y, ri)
    // ctx.fill()
}

const animation = {
    x: null,
    y: null,
    r: null,
}

const state = {
    in_cell: false,
    in_set1: true,
    highlight_col: null,
}

const draw1 = ts => {

    const cell_size = 20
    const padding = 10
    const cell_count = Math.max(technology_categories.length, nature_topic_categories.length)

    const s = cell_size
    const p = padding
    const w = s * cell_count

    with (ctx) {
        fillStyle = 'black'
        fillRect(0, 0, canvas.width, canvas.height)

        save()

        let is_in_cell = false

        for (let i = 0; i < entries.length; ++i) {
            const x = (i % 5) * (w + p)
            const y = ~~(i / 5) * (s + p)

            strokeStyle = 'green'
            strokeRect(x, y, w + p, s + p)

            if (point_in_rect(mouse.x, mouse.y, x, y, w + p, s + p)) {
                fillStyle = 'green'
                fillRect(x, y, w + p, s + p)
            }

            for (let j = 0, set1 = entries[i][i_technology], set2 = entries[i][i_nature_topic];
                (set1 | set2) && j < technology_categories.length;
                ++j, set1 >>= 1, set2 >>= 1) {
                const cellx = x + j * s

                const color1 = `rgba(150, 80, 150, 1)`
                const color1_dim = `rgba(150, 80, 150, 0.2)`
                const color2 = `rgba(200, 200, 50, 1)`
                const color2_dim = `rgba(200, 200, 50, 0.2)`

                if (point_in_rect(mouse.x, mouse.y, cellx, y, s, s)) {
                    const dx = mouse.x - cellx
                    const dy = mouse.y - y

                    if (dx + dy < s && set1 & 1) {
                        is_in_cell = true
                        state.in_set1 = true
                        state.highlight_col = j
                    }
                    if (dx + dy > s && set2 & 1) {
                        is_in_cell = true
                        state.in_set1 = false
                        state.highlight_col = j
                    }
                }


                if (set1 & 1) {
                    // fillStyle = 'purple'
                    if (state.in_cell) {
                        if (state.in_set1 && state.highlight_col === j) {
                            fillStyle = color1
                        } else {
                            fillStyle = color1_dim
                        }
                    } else {
                        fillStyle = color1
                    }
                    beginPath()
                    moveTo(cellx, y)
                    lineTo(cellx + s, y)
                    lineTo(cellx, y + s)
                    fill()
                }

                if (set2 & 1) {
                    // fillStyle = 'yellow'
                    if (state.in_cell) {
                        if (!state.in_set1 && state.highlight_col === j) {
                            fillStyle = color2
                        } else {
                            fillStyle = color2_dim
                        }
                    } else {
                        fillStyle = color2
                    }
                    beginPath()
                    moveTo(cellx + s, y)
                    lineTo(cellx + s, y + s)
                    lineTo(cellx, y + s)
                    fill()
                }
            }
        }

        if (is_in_cell) {
            state.in_cell = true
        } else {
            state.in_cell = false
            state.in_set1 = false
        }

        restore()
    }

    requestAnimationFrame(draw1)
}

const draw2 = ts => {
    mouse_pos.textContent = `mouse: x: ${mouse.x}, y: ${mouse.y}`

    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let inside = false

    for (let i = 0; i < technology_categories.length; ++i) {
        const x = area_xs[i]
        const y = area_ys[i]
        const r = area_rs[i]
        if (test_point(mouse.x, mouse.y, x, y, r)) {
            inside = true
            if (!animation.r) {
                animation.r = 200
                animation.x = x
                animation.y = y
            } else {
                const dr = (animation.r - r) * 0.1
                const dx = (animation.x - x) * 0.2
                const dy = (animation.y - y) * 0.2
                animation.r -= dr
                animation.x -= dx
                animation.y -= dy
                ctx.fillStyle = 'white'
                draw_circle(ctx, animation.x, animation.y, animation.r)
                ctx.fill()
            }

            ctx.fillStyle = 'green'
            for (let j = 0; j < tech_counts[i]; ++j) {
                const x = proj_xs[i][j]
                const y = proj_ys[i][j]
                draw_circle(ctx, x, y, proj_r)
                ctx.fill()
            }

            break
        }
    }

    if (!inside) {
        ctx.fillStyle = 'white'
        for (let i = 0; i < technology_categories.length; ++i) {
            for (let j = 0; j < tech_counts[i]; ++j) {
                draw_circle(ctx, proj_xs[i][j], proj_ys[i][j], proj_r)
                ctx.fill()
            }
        }
    }

    requestAnimationFrame(draw2)
}