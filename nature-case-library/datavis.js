const { sqrt, random, sin, cos, PI, min, max } = Math

const ctx = ce('canvas')().getContext('2d')
const mouse_pos = div()
const mouse_index = div()
const selected_index = div()
const canvas_dim = div()

const container = ce('div', { id: 'datavis' })(
  ctx.canvas,
)

document.head.append(ce('style')(`\
body {
  margin: 0;
  height: 100vh;
}
body > #datavis {
  position: relative;
  height: 100%;
}
#datavis > canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
`))

// ctx.canvas.style = `border: solid;`

const main = () => {
  document.body.append(
    container,
    // canvas_dim,
    // mouse_index,
    // selected_index,
    // mouse_pos,
  )

  requestAnimationFrame(draw)
}

const color_rgb = (r, g, b, a = 1) => `rgb(${~~(r * 256)}, ${~~(g * 256)}, ${~~(b * 256)}, ${a})`
const color_hsl = (h, s, l, a = 1) => `hsl(${~~(h * 360)}, ${~~(s * 100)}%, ${~~(l * 100)}%, ${a})`

const group_color_saturation = 0.5
const group_color_lightness_light = 0.8
const group_color_lightness_medium = 0.6
const group_color_lightness_dark = 0.4

const color_light = h => color_hsl(h, group_color_saturation, group_color_lightness_light)
const color_medium = h => color_hsl(h, group_color_saturation, group_color_lightness_medium)
const color_dark = h => color_hsl(h, group_color_saturation, group_color_lightness_dark)

const hexagon_cell_size = 2.5
const hue_tech = 0.6
const hue_nature = 0.8
const color_selected = 'yellow'

let mouse_x, mouse_y
let was_in_hexagon = false
let highlight_alpha = 0
let highlight_r = 0
let mouse_over_proj_index = -1
let selected_proj_index = -1

ctx.canvas.onmousemove = e => {
  mouse_x = e.offsetX
  mouse_y = e.offsetY
}

ctx.canvas.onclick = e => {
  selected_proj_index = mouse_over_proj_index
}

const draw = ts => {
  ctx.canvas.width = ctx.canvas.clientWidth
  ctx.canvas.height = ctx.canvas.clientHeight

  canvas_dim.textContent = `width: ${ctx.canvas.width}, height: ${ctx.canvas.height}`
  mouse_pos.textContent = `mouse: ${mouse_x} ${mouse_y}`
  mouse_index.textContent = 'mouseover index: ' + mouse_over_proj_index
  selected_index.textContent = 'selected index: ' + selected_proj_index

  const padding = 20
  const [vert_offx, vert_offy, vert_scale] = fit_center(ctx.canvas.width - padding * 2, ctx.canvas.height - padding * 2, vertical_layout_width, vertical_layout_height)
  const [hori_offx, hori_offy, hori_scale] = fit_center(ctx.canvas.width - padding * 2, ctx.canvas.height - padding * 2, horizontal_layout_width, horizontal_layout_height)

  const bg_gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height)
  bg_gradient.addColorStop(0, color_dark(hue_tech))
  bg_gradient.addColorStop(1, color_dark(hue_nature))
  ctx.fillStyle = bg_gradient
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const draw_text = (ctx, text, align, baseline, x, y) => {
    ctx.textAlign = align
    ctx.textBaseline = baseline
    ctx.fillText(text, x, y)
  }

  let offx1, offy1, offx2, offy2, scale
  ctx.font = 'bold 30px sans-serif'
  if (vert_scale > hori_scale) {
    scale = vert_scale
    offx1 = offx2 = vert_offx + padding
    offy1 = vert_offy + padding
    offy2 = offy1 + scale * tech_hexagons.height
  } else {
    scale = hori_scale
    offx1 = hori_offx + padding
    offx2 = offx1 + scale * tech_hexagons.width
    offy1 = offy2 = hori_offy + padding
  }

  const mouse_over_tech_group_index =
    test_mouse_inside_position(offx1, offy1, scale, tech_hexagons, tech_proj_indices)
  const mouse_over_nature_group_index = mouse_over_tech_group_index < 0 ?
    test_mouse_inside_position(offx2, offy2, scale, nature_hexagons, nature_proj_indices) : -1
  const is_in_hexagon = mouse_over_tech_group_index >= 0 || mouse_over_nature_group_index >= 0

  ctx.canvas.style.cursor = mouse_over_proj_index >= 0 ? 'pointer' : ''

  const set_bold_font_size = s => ctx.font = `bold ${s}px sans-serif`

  const font_unit = min(ctx.canvas.width / 100, 10)
  const font_size1 = font_unit * 4
  const font_size2 = font_unit * 10

  if (vert_scale > hori_scale) {
    ctx.textAlign = 'right'
    const x = ctx.canvas.width - padding

    {
      ctx.fillStyle = color_light(hue_tech)
      ctx.textBaseline = 'top'
      const y = padding

      set_bold_font_size(font_size1)
      ctx.fillText('Technology', x, y)
      if (mouse_over_tech_group_index >= 0) {
        set_bold_font_size(font_size2)
        ctx.fillText(technology_categories[mouse_over_tech_group_index], x, y + font_size1 + padding)
      }
    }

    {
      ctx.fillStyle = color_light(hue_nature)
      ctx.textBaseline = 'bottom'
      const y = ctx.canvas.height - padding

      set_bold_font_size(font_size1)
      ctx.fillText('Nature Topic', x, y)
      if (mouse_over_nature_group_index >= 0) {
        set_bold_font_size(font_size2)
        ctx.fillText(nature_topic_categories[mouse_over_nature_group_index], x, y - font_size1 - padding)
      }
    }
  } else {
    ctx.textBaseline = 'bottom'
    const y = ctx.canvas.height - padding

    {
      ctx.fillStyle = color_light(hue_tech)
      ctx.textAlign = 'left'
      const x = padding

      set_bold_font_size(font_size1)
      ctx.fillText('Technology', x, y)
      if (mouse_over_tech_group_index >= 0) {
        set_bold_font_size(font_size2)
        ctx.fillText(technology_categories[mouse_over_tech_group_index], x, y - font_size1 - padding)
      }
    }

    {
      ctx.fillStyle = color_light(hue_nature)
      ctx.textAlign = 'right'
      const x = ctx.canvas.width - padding

      set_bold_font_size(font_size1)
      ctx.fillText('Nature Topic', x, y)
      if (mouse_over_nature_group_index >= 0) {
        set_bold_font_size(font_size2)
        ctx.fillText(nature_topic_categories[mouse_over_nature_group_index], x, y - font_size1 - padding)
      }
    }
  }

  draw_group(
    ctx, offx1, offy1, scale,
    tech_hexagons, tech_proj_indices, hue_tech,
    is_in_hexagon, mouse_over_tech_group_index
  )
  draw_group(
    ctx, offx2, offy2, scale,
    nature_hexagons, nature_proj_indices, hue_nature,
    is_in_hexagon, mouse_over_nature_group_index
  )

  if (mouse_over_proj_index >= 0 || selected_proj_index >= 0) {
    const index = mouse_over_proj_index >= 0 ? mouse_over_proj_index : selected_proj_index
    const [name, place, author, year] = entries[index]

    ctx.fillStyle = color_light(hue_tech)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    const x = padding

    let y = padding
    let fontsize = font_unit * 3

    const draw_line = text => {
      ctx.fillText(text, x, y)
      y += fontsize + 5
    }

    set_bold_font_size(fontsize)
    draw_line(name)

    fontsize = font_unit * 2
    set_bold_font_size(fontsize)
    draw_line(place)
    draw_line(author)
    draw_line(year)
  }

  was_in_hexagon = is_in_hexagon
  requestAnimationFrame(draw)
}

const draw_group = (
  ctx, offx, offy, scale,
  hexagons, proj_indices, hue,
  is_in_hexagon, mouse_over_group_index
) => {
  ctx.save()
  ctx.translate(offx, offy)
  ctx.scale(scale, scale)

  foreach_hexagon_in_catagory(hexagons, proj_indices.length, (x, y, r, i) => {
    if (is_in_hexagon) {
      if (i === mouse_over_group_index) {
        if (!was_in_hexagon) {
          highlight_alpha = 0
          highlight_r = max(ctx.canvas.width, ctx.canvas.height) / 2 / scale
        } else {
          highlight_alpha += 0.04
          if (highlight_alpha > 0.7) highlight_alpha = 0.7
          highlight_r -= (highlight_r - r) * 0.2
        }
        ctx.fillStyle = color_hsl(hue, group_color_saturation, group_color_lightness_light, highlight_alpha)
        draw_hexagon(ctx, x, y, highlight_r)
        ctx.fill()
      } else {
        ctx.strokeStyle = color_dark(hue)
        ctx.lineWidth = 2 / scale
        // ctx.fillStyle = color_medium(hue)
        ctx.fillStyle = color_hsl(hue, group_color_saturation, group_color_lightness_medium, 0.5)
        draw_hexagon(ctx, x, y, r)
        ctx.fill()
        ctx.stroke()
      }
    }

    foreach_point_in_hexagon_spiral(proj_indices[i].length, (dx, dy, j) => {
      const proj_index = proj_indices[i][j]
      if (proj_index === selected_proj_index) {
        ctx.fillStyle = color_selected
      } else if (proj_index === mouse_over_proj_index) {
        ctx.fillStyle = color_light(hue)
      } else if (i === mouse_over_group_index) {
        ctx.fillStyle = color_dark(hue)
      } else {
        ctx.fillStyle = color_medium(hue)
      }

      if (proj_index === selected_proj_index ||
        proj_index === mouse_over_proj_index ||
        i === mouse_over_group_index ||
        !is_in_hexagon
      ) {
        const r = proj_index === selected_proj_index || proj_index === mouse_over_proj_index ?
          1.2 : 0.9
        draw_circle(ctx, x + dx, y + dy, r)
        ctx.fill()
      }

      if (is_in_hexagon && i !== mouse_over_group_index && proj_index === max(selected_proj_index, mouse_over_proj_index))
        return true // break out of foreach loop
    })
  })

  ctx.restore()
}

const test_mouse_inside_position = (offx, offy, scale, hexagons, proj_indices) => {
  const mouse_offx = (mouse_x - offx) / scale
  const mouse_offy = (mouse_y - offy) / scale
  let mouse_over_group_index = -1
  let mouse_over_proj_index_ = -1
  foreach_hexagon_in_catagory(hexagons, proj_indices.length, (x, y, r, i) => {
    if (point_in_circle(mouse_offx, mouse_offy, x, y, r)) {
      mouse_over_group_index = i
      foreach_point_in_hexagon_spiral(proj_indices[i].length, (dx, dy, j) => {
        if (point_in_circle(mouse_offx, mouse_offy, x + dx, y + dy, 1)) {
          mouse_over_proj_index_ = proj_indices[i][j]
          return true // break out of foreach loop
        }
      })
      return true // break out of foreach loop
    }
  })
  mouse_over_proj_index = mouse_over_proj_index_
  return mouse_over_group_index
}

const foreach_hexagon_in_catagory = (hexagons, n, callback) => {
  for (let i = 0; i < n; ++i) {
    const x = hexagons.xs[i]
    const y = hexagons.ys[i]
    const r = hexagons.rs[i]
    if (callback(x, y, r, i)) break
  }
}

const foreach_point_in_hexagon_spiral = (n, callback) => {
  for (
    let i = 0, a = 0, x = 0, y = 0, edgelen = 1, edge = 0;
    i < n;
    ++i
  ) {
    if (callback(x, y, i)) break
    if (i === 1) a += 2
    if (i > 1) {
      if (a >= 6) a = 0
      else if (++edge === edgelen) {
        if (a === 1) ++edgelen
        edge = 0
        ++a
      }
    }
    x += cos(a * PI / 3) * hexagon_cell_size
    y += sin(a * PI / 3) * hexagon_cell_size
  }
}

const fit_center = (w1, h1, w2, h2) => {
  const ratio1 = w1 / h1
  const ratio2 = w2 / h2
  const scale = ratio1 > ratio2 ? h1 / h2 : w1 / w2
  const offx = ratio1 > ratio2 ? (w1 - w2 * scale) / 2 : 0
  const offy = ratio1 > ratio2 ? 0 : (h1 - h2 * scale) / 2
  return [offx, offy, scale]
}

const point_in_rect = (px, py, x, y, w, h) =>
  px > x && px < x + w && py > y && py < y + h

const point_in_circle = (px, py, cx, cy, r) => {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy < r * r
}

const get_hexagon_spiral_edge_length = points_count => {
  let len = 0
  for (let i = 1; i < points_count; i += 6 * ++len);
  return len
}

const draw_circle = (ctx, x, y, r) => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, PI * 2)
}

const draw_hexagon = (ctx, x, y, r) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  for (let i = 1; i < 6; ++i) {
    const xx = x + cos(i * PI / 3) * r
    const yy = y + sin(i * PI / 3) * r
    ctx.lineTo(xx, yy)
  }
  ctx.closePath()
}

const generate_hexagon_center_points = projs => {
  const xs = new Float32Array(projs.length)
  const ys = new Float32Array(projs.length)
  const rs = new Float32Array(projs.length)

  for (let i = 0; i < projs.length; ++i)
    rs[i] = (get_hexagon_spiral_edge_length(projs[i].length) + 1) * hexagon_cell_size

  xs[0] = ys[0] = 0

  let minx, miny, maxx, maxy
  minx = miny = -rs[0]
  maxx = maxy = rs[0]

  for (let i = 1; i < projs.length; ++i) {
    const r = rs[i]

    let found = false
    while (!found) {
      for (let j = 0; !found && j < i; ++j) {
        const a = random() * PI * 2
        const rsum = r + rs[j]
        const x = xs[j] + cos(a) * rsum
        const y = ys[j] + sin(a) * rsum

        found = true
        for (let k = 0; k < i; ++k) {
          if (point_in_circle(x, y, xs[k], ys[k], r + rs[k])) {
            found = false
            break
          }
        }

        if (found) {
          xs[i] = x
          ys[i] = y
          if (x - r < minx) minx = x - r
          if (x + r > maxx) maxx = x + r
          if (y - r < miny) miny = y - r
          if (y + r > maxy) maxy = y + r
        }
      }
    }
  }

  for (let i = 0; i < projs.length; ++i) {
    xs[i] -= minx
    ys[i] -= miny
  }

  return {
    xs, ys, rs,
    width: maxx - minx,
    height: maxy - miny
  }
}

const load_category_project_indices = (category_names, category_index) =>
  category_names.map(category_name => {
    const indices = []
    for (let i = 0; i < entries.length; ++i) {
      if (apply_filter(entries[i], columns[category_index], category_name))
        indices.push(i)
    }
    return indices
  })

const tech_proj_indices = load_category_project_indices(technology_categories, i_technology)
const nature_proj_indices = load_category_project_indices(nature_topic_categories, i_nature_topic)

const tech_hexagons = generate_hexagon_center_points(tech_proj_indices)
const nature_hexagons = generate_hexagon_center_points(nature_proj_indices)

const vertical_layout_width = max(tech_hexagons.width, nature_hexagons.width)
const vertical_layout_height = tech_hexagons.height + nature_hexagons.height
const horizontal_layout_width = tech_hexagons.width + nature_hexagons.width
const horizontal_layout_height = max(tech_hexagons.height, nature_hexagons.height)