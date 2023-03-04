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

const gl_create_program_from_source = (gl, vert_src, frag_src) => {
    with (gl) {
        const vert_shader = gl_create_shader(gl, VERTEX_SHADER, vert_src)
        const frag_shader = gl_create_shader(gl, FRAGMENT_SHADER, frag_src)

        if (vert_shader && frag_shader) {
            const program = createProgram()
            attachShader(program, vert_shader)
            attachShader(program, frag_shader)
            linkProgram(program)
            detachShader(program, vert_shader)
            detachShader(program, frag_shader)
            deleteShader(vert_shader)
            deleteShader(frag_shader)
            if (getProgramParameter(program, LINK_STATUS))
                return program

            console.error(getProgramInfoLog(program))
            deleteProgram(program)
        }

        return null
    }
}

const quad_vert_shader_src = `\
#version 300 es
void main(void) {
    vec2 uv = vec2(gl_VertexID & 1, (gl_VertexID >> 1) & 1);
    gl_Position = vec4(uv * 2.0 - 1.0, 0, 1);
}
`