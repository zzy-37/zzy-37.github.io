const gl_create_shader = (gl, type, src) => {
    with (gl) {
        const shader = createShader(type)
        shaderSource(shader, src)
        compileShader(shader)
        if (getShaderParameter(shader, COMPILE_STATUS))
            return shader

        console.error(getShaderInfoLog(shader))
        deleteShader(shader)
        return null
    }
}

const gl_vertex_shader = (gl, src) => gl_create_shader(gl, gl.VERTEX_SHADER, src)
const gl_fragment_shader = (gl, src) => gl_create_shader(gl, gl.FRAGMENT_SHADER, src)

const gl_create_program_from_shader = (gl, vert_shader, frag_shader) => {
    with (gl) {
        const program = createProgram()
        attachShader(program, vert_shader)
        attachShader(program, frag_shader)
        linkProgram(program)
        detachShader(program, vert_shader)
        detachShader(program, frag_shader)
        if (getProgramParameter(program, LINK_STATUS))
            return program

        console.error(getProgramInfoLog(program))
        deleteProgram(program)
        return null
    }
}

const gl_create_program_from_source = (gl, vert_src, frag_src) => {
    const vert_shader = gl_vertex_shader(gl, vert_src)
    const frag_shader = gl_fragment_shader(gl, frag_src)

    if (vert_shader && frag_shader) {
        const program = gl_create_program_from_shader(gl, vert_shader, frag_shader)
        gl.deleteShader(vert_shader)
        gl.deleteShader(frag_shader)
        return program
    }

    return null
}

const quad_vert_shader_src = `\
#version 300 es
void main(void) {
    vec2 uv = vec2(gl_VertexID & 1, gl_VertexID & 2);
    gl_Position = vec4(uv * 2.0 - 1.0, 0, 1);
}
`