const load_category_project_indices = (category_names, category_index) =>
  category_names.map(category_name => {
    const indices = []
    for (let i = 0; i < entries.length; ++i) {
      if (apply_filter(entries[i], columns[category_index], category_name))
        indices.push(i)
    }
    return indices
  })

const tech_projs = load_category_project_indices(technology_categories, i_technology)
const nature_projs = load_category_project_indices(nature_topic_categories, i_nature_topic)

const { sqrt, random, sin, cos, PI, min, max } = Math

const draw_circle = (ctx, x, y, r) => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, PI * 2)
}

const fit_center = (w1, h1, w2, h2) => {
  const ratio1 = w1 / h1
  const ratio2 = w2 / h2
  const scale = ratio1 > ratio2 ? h1 / h2 : w1 / w2
  const offx = ratio1 > ratio2 ? (w1 - w2 * scale) / 2 : 0
  const offy = ratio1 > ratio2 ? 0 : (h1 - h2 * scale) / 2

  return [offx, offy, scale]
}

const mouse = {
  x: null,
  y: null
}

const width = 1600
const height = 800

const ctx = ce('canvas', { width, height })().getContext('2d')
const mouse_pos = div()
const mouse_index = div()
const color_picker_bg = input({ type: 'color', value: '#000000' })
const color_picker_highlight = input({ type: 'color', value: '#ffffff' })
const color_picker_selected = input({ type: 'color', value: '#ff0000' })

const main = () => {
  document.body.append(
    ctx.canvas,
    mouse_index,
    div(label('background: ', color_picker_bg)),
    div(label('hightlight: ', color_picker_highlight)),
    div(label('selected: ', color_picker_selected)),
    mouse_pos,
  )
}

// ctx.canvas.style = `border: solid;`

ctx.canvas.onmousemove = e => {
  mouse.x = e.offsetX
  mouse.y = e.offsetY
}

const point_in_rect = (px, py, x, y, w, h) =>
  px > x && px < x + w && py > y && py < y + h

const point_in_circle = (px, py, cx, cy, r) => {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy < r * r
}

const color_rgba = (r, g, b, a) => `rgba(${~~(r * 256)}, ${~~(g * 256)}, ${~~(b * 256)}, ${a})`

const get_hexagon_spiral_edge_length = points_count => {
  let len = 0
  for (let i = 1; i < points_count; i += 6 * ++len);
  return len
}

const draw_hexagon = (ctx, x, y, r) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  for (let a = 0; a < PI * 2; a += PI * 2 / corner_count) {
    const xx = x + cos(a) * r
    const yy = y + sin(a) * r
    ctx.lineTo(xx, yy)
  }
}

const draw_hexagon_spiral = (ctx, x, y, count) => {
  let a = 0
  let edgelen = 1, edge = 0

  let index = -1

  for (let i = 0; i < count; ++i) {
    if (point_in_circle(mouse.x, mouse.y, x, y, proj_dot_radius))
      index = i

    draw_circle(ctx, x, y, proj_dot_radius)
    ctx.fill()

    if (i === 1) a += 2
    if (i > 1) {
      if (a >= corner_count) a = 0
      else if (++edge === edgelen) {
        if (a === 1) ++edgelen
        edge = 0
        ++a
      }
    }
    x += cos(a * PI * 2 / corner_count) * hexagon_cell_size
    y += sin(a * PI * 2 / corner_count) * hexagon_cell_size
  }

  return index
}

const hexagon_spiral_get_nth_point = (x, y, n) => {
  let a = 0
  let edgelen = 1, edge = 0

  for (let i = 0; i < n; ++i) {
    if (i === 1) a += 2
    if (i > 1) {
      if (a >= corner_count) a = 0
      else if (++edge === edgelen) {
        if (a === 1) ++edgelen
        edge = 0
        ++a
      }
    }
    x += cos(a * PI * 2 / corner_count) * hexagon_cell_size
    y += sin(a * PI * 2 / corner_count) * hexagon_cell_size
  }
  return [x, y]
}

const generate_hexagon_center_points = projs => {
  const xs = new Float32Array(projs.length)
  const ys = new Float32Array(projs.length)
  const rs = new Float32Array(projs.length)

  for (let i = 0; i < projs.length; ++i)
    rs[i] = (get_hexagon_spiral_edge_length(projs[i].length) + 1) * hexagon_cell_size

  xs[0] = 0
  ys[0] = 0

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

        // if (!point_in_rect(x, y, r, r, width - 2 * r, height - 2 * r))
        //     continue

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

  return {
    xs, ys, rs,
    minx, miny, maxx, maxy
  }
}

const hexagon_cell_size = 10
const proj_dot_radius = 4
const corner_count = 6

const font_family = 'Neutra'
const large_group_font_size = 20
const category_font_size = 9
const proj_title_font_size = 12
const text_padding = 10

const tech_hexagons = generate_hexagon_center_points(tech_projs)
const nature_hexagons = generate_hexagon_center_points(nature_projs)

const group_offset_circle = (group, i, offx, offy) =>
  [group.xs[i] + offx, group.ys[i] + offy, group.rs[i]]

const mouse_over_group = (group, offx, offy) => {
  for (let i = 0; i < group.xs.length; ++i) {
    if (point_in_circle(mouse.x, mouse.y, ...group_offset_circle(group, i, offx, offy)))
      return i
  }
  return -1
}

let highlight_alpha = 0
let highlight_r = null
let was_in_hexagon = false
let mouse_over_entry_index = -1
let selected_entry_index = -1
let color_bg
let color_highlight
let color_selected

ctx.canvas.onclick = () => {
  selected_entry_index = mouse_over_entry_index
}

const draw_mouse_over_highlight_hexagon = (ctx, projs, hexagons, i, offx, offy, group_name, group_category) => {
  const [x, y, r] = group_offset_circle(hexagons, i, offx, offy)
  if (was_in_hexagon) {
    highlight_alpha += 0.08
    if (highlight_alpha > 1) highlight_alpha = 1
    highlight_r -= (highlight_r - r) * 0.2
  } else {
    highlight_alpha = 0
    highlight_r = max(ctx.canvas.width, ctx.canvas.height) / 2
  }

  with (ctx) {
    fillStyle = color_highlight + (~~(highlight_alpha * 255)).toString(16)
    draw_hexagon(ctx, x, y, highlight_r)
    fill()

    fillStyle = color_bg
    const proj_index = draw_hexagon_spiral(ctx, x, y, projs[i].length)

    fillStyle = 'white'
    textBaseline = 'top'
    textAlign = 'left'

    let ty = text_padding
    let font_size = category_font_size
    font = `${font_size}px ${font_family}`
    const text = `${group_name}: ${group_category[i]}`
    fillText(text, text_padding, ty)
    ty += font_size + text_padding

    if (proj_index >= 0) {
      const entry_index = projs[i][proj_index]
      font_size = proj_title_font_size
      font = `${font_size}px ${font_family}`
      fillText(entries[entry_index][i_project_name], text_padding, ty)
      ty += font_size + text_padding
      return entry_index
    }
  }
  return -1
}

const draw_hexagon_group = (ctx, projs, hexagons, offx, offy, in_hexagon) => {
  for (let i = 0; i < projs.length; ++i) {
    const [x, y, r] = group_offset_circle(hexagons, i, offx, offy)
    if (in_hexagon) {
      ctx.strokeStyle = 'white'
      draw_hexagon(ctx, x, y, r)
      ctx.stroke()
    } else {
      ctx.fillStyle = 'white'
      draw_hexagon_spiral(ctx, x, y, projs[i].length)
    }

    if (mouse_over_entry_index >= 0 || selected_entry_index >= 0) {
      for (let j = 0; j < projs[i].length; ++j) {
        const index = projs[i][j]
        if (index === mouse_over_entry_index || index === selected_entry_index) {
          ctx.fillStyle = index === selected_entry_index ? color_selected : 'white'
          const [px, py] = hexagon_spiral_get_nth_point(x, y, j)
          draw_circle(ctx, px, py, proj_dot_radius)
          ctx.fill()
          if (index === max(mouse_over_entry_index, selected_entry_index))
            break
        }
      }
    }
  }
}

const draw3 = ts => {
  mouse_pos.textContent = `mouse: x: ${mouse.x}, y: ${mouse.y}`
  mouse_index.textContent = mouse_over_entry_index

  color_bg = color_picker_bg.value
  color_highlight = color_picker_highlight.value
  color_selected = color_picker_selected.value

  const basey = category_font_size + proj_title_font_size + 4 * text_padding
  const offx1 = text_padding * 3 - tech_hexagons.minx
  const offy1 = basey - tech_hexagons.miny
  const offx2 = tech_hexagons.maxx + offx1 + text_padding * 3 - nature_hexagons.minx
  const offy2 = basey - nature_hexagons.miny

  ctx.fillStyle = color_bg
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  let idx = mouse_over_group(tech_hexagons, offx1, offy1)
  let entry_index = -1
  if (idx >= 0) {
    entry_index = draw_mouse_over_highlight_hexagon(
      ctx, tech_projs, tech_hexagons, idx, offx1, offy1,
      columns[i_technology], technology_categories)
  } else {
    idx = mouse_over_group(nature_hexagons, offx2, offy2)
    if (idx >= 0) {
      entry_index = draw_mouse_over_highlight_hexagon(
        ctx, nature_projs, nature_hexagons, idx, offx2, offy2,
        columns[i_nature_topic], nature_topic_categories)
    }
  }
  mouse_over_entry_index = entry_index

  draw_hexagon_group(ctx, tech_projs, tech_hexagons, offx1, offy1, idx >= 0)
  draw_hexagon_group(ctx, nature_projs, nature_hexagons, offx2, offy2, idx >= 0)

  with (ctx) {
    fillStyle = 'white'
    font = `${large_group_font_size}px ${font_family}`
    textAlign = 'center'
    textBaseline = 'top'
    strokeStyle = 'white'

    with (tech_hexagons) {
      fillText(columns[i_technology],
        minx + offx1 + (maxx - minx) / 2,
        maxy + offy1 + text_padding)
      // strokeRect(minx + offx1, miny + offy1, maxx - minx, maxy - miny)
    }
    with (nature_hexagons) {
      fillText(columns[i_nature_topic],
        minx + offx2 + (maxx - minx) / 2,
        maxy + offy2 + text_padding)
      // strokeRect(minx + offx2, miny + offy2, maxx - minx, maxy - miny)
    }
  }

  was_in_hexagon = idx >= 0

  requestAnimationFrame(draw3)

}

requestAnimationFrame(draw3)
