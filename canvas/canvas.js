// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
function initShaderProgram(gl, vs, fs) {
    function createShader(type, src) {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, src)
        gl.compileShader(shader)

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) return shader

        // compilation failed
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vs)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fs)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!success) {
        console.error(gl.getProgramInfoLog(program))
        return gl.deleteProgram(program)
    }

    const uniforms = {}
    // load uniforms, stolen from p5js
    {
        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
        for (let i = 0; i < numUniforms; ++i) {
            const uniformInfo = gl.getActiveUniform(program, i);
            //uniforms thats are arrays have their name returned as
            //someUniform[0] which is a bit silly so we trim it
            //off here. The size property tells us that its an array
            //so we dont lose any information by doing this
            const uniformName = (uniformInfo.size > 1)
                ? uniformInfo.name.substring(0, uniformInfo.name.indexOf('[0]'))
                : uniformInfo.name
            const uniform = {
                location: gl.getUniformLocation(program, uniformInfo.name),
                size: uniformInfo.size,
                name: uniformName,
                type: uniformInfo.type,
            }
            uniforms[uniformName] = uniform;
        }
    }

    // closure, set uniform using the infomation loaded above
    program.setUniform = function (name, ...data) {
        const u = uniforms[name]
        if (!u) return console.warn(`Uniform: ${name} is not used.`)
        data = data.flat()
        switch (u.type) {
            case gl.BOOL: gl.uniform1i(u.location, (data[0] === true) ? 1 : 0); break
            case gl.INT: gl.uniform1iv(u.location, data); break
            case gl.FLOAT: gl.uniform1fv(u.location, data); break
            case gl.FLOAT_MAT3: gl.uniformMatrix3fv(u.location, false, data); break
            case gl.FLOAT_MAT4: gl.uniformMatrix4fv(u.location, false, data); break
            case gl.FLOAT_VEC2: gl.uniform2fv(u.location, data); break
            case gl.FLOAT_VEC3: gl.uniform3fv(u.location, data); break
            case gl.FLOAT_VEC4: gl.uniform4fv(u.location, data); break
            case gl.INT_VEC2: gl.uniform2iv(u.location, data); break
            case gl.INT_VEC3: gl.uniform3iv(u.location, data); break
            case gl.INT_VEC4: gl.uniform4iv(u.location, data); break
            case gl.SAMPLER_2D: gl.uniform1i(u.location, data[0]); break
            default: throw Error('Unsupported uniform type.')
        }
    }
    return program
}

function setArrayBuffer(gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
}

function newAttributeBuffer(gl, program, name, data, numComponents, type = gl.FLOAT, normalize = false) {
    switch (type) {
        case gl.BYTE:           data = new Int8Array(data); break
        case gl.SHORT:          data = new Int16Array(data); break
        case gl.UNSIGNED_BYTE:  data = new Uint8Array(data); break
        case gl.UNSIGNED_SHORT: data = new Uint16Array(data); break
        case gl.FLOAT:          data = new Float32Array(data); break
        default: console.error('Unsupported data type.')
    }
    const buffer = gl.createBuffer()
    setAttributeBuffer(gl, program, name, buffer, numComponents, type, normalize)
    setArrayBuffer(gl, buffer, data)
    return buffer
}

function setAttributeBuffer(gl, program, name, buffer, numComponents, type = gl.FLOAT, normalize = false) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    const location = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, numComponents, type, normalize, 0, 0);
}

function newTexture(gl, unit, image) {
    const texture = gl.createTexture()
    loadTexture(gl, unit, image, texture)
    return texture
}

function loadTexture(gl, unit, image, texture) {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,                // mipLevel
        gl.RGBA,          // internalFormat
        gl.RGBA,          // srcFormat
        gl.UNSIGNED_BYTE, // srcType
        image
    )
    gl.generateMipmap(gl.TEXTURE_2D)
}

const max32 = (-1 >>> 0) + 1
function rand32() { return Math.random() * max32 >>> 0 }

// https://stackoverflow.com/questions/664014/what-integer-hash-function-are-good-that-accepts-an-integer-hash-key#answer-12996028
function hash32(x) {
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = (x >> 16) ^ x;
    return x;
}

// https://mrl.cs.nyu.edu/~perlin/noise/
function improved_noise(seed = rand32()) {
    function noise(x = 0, y = 0, z = 0) {
        let X = Math.floor(x) & 255,                  // FIND UNIT CUBE THAT
            Y = Math.floor(y) & 255,                  // CONTAINS POINT.
            Z = Math.floor(z) & 255;
        x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
        y -= Math.floor(y);                                // OF POINT IN CUBE.
        z -= Math.floor(z);
        const u = fade(x),                                // COMPUTE FADE CURVES
              v = fade(y),                                // FOR EACH OF X,Y,Z.
              w = fade(z);
        const A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      // HASH COORDINATES OF
              B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      // THE 8 CUBE CORNERS,

        return lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  // AND ADD
                                       grad(p[BA  ], x-1, y  , z   )), // BLENDED
                               lerp(u, grad(p[AB  ], x  , y-1, z   ),  // RESULTS
                                       grad(p[BB  ], x-1, y-1, z   ))),// FROM  8
                       lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  // CORNERS
                                       grad(p[BA+1], x-1, y  , z-1 )), // OF CUBE
                               lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                       grad(p[BB+1], x-1, y-1, z-1 ))));
    }
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y, z) {
        const h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
        const u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
              v = h<4 ? y : h==12||h==14 ? x : z;
        return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
    }

    // seeded random permutation table
    const p = Array(512), permutation = Array.from({length: 256}, (v, i) => i)
    for (let i = 0; i < 256; i++) {
        seed = hash32(seed)
        const j = seed & 255
        const tmp = permutation[j]
        permutation[j] = permutation[i]
        permutation[i] = tmp
    }

    for (let i=0; i < 256 ; i++) p[256+i] = p[i] = permutation[i]
    return noise
}

class Vector extends Array {
    static subtract(a, b) {
        if (a.length !== b.length) throw Error('Vector dimension miss match.')
        return Vector.from(a, (v, i) => v - b[i])
    }

    static normalize(v) {
        let sum = 0
        for (let val of v) sum += val * val
        const length = Math.sqrt(sum)
        // make sure we don't divide by 0.
        if (length > 0.00001) return v.map(x => x / length)
        else return v.map(() => 0)
    }

    static cross(a, b) {
        if (a.length !== 3 || b.length !== 3) throw Error('Vector cross product can only be computed with two 3 dimensional vectors.')
        return new Vector(
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0],
        )
    }

    subtract(b) { return Vector.subtract(this, b) }
    normalize() { return Vector.normalize(this) }
}

// Matrices
class Matrix extends Array {
    static get [Symbol.species]() { return Array }
    constructor(row, col, data) {
        if (data.length !== row * col) throw Error(`Constructor of ${row}x${col} Matrix takes an array of length ${row * col}.`)
        if (data.length === 1) {
            super(1)
            this[0] = data[0]
        } else super(...data)
        this.#row = row
        this.#col = col
    }

    #row
    #col
    get row() { return this.#row }
    get col() { return this.#col }
    get(i, j) { return this[i * this.col + j] }

    static multiply(a, b) {
        const result = []
        for (let rb = 0; rb < b.row; ++rb) {
            for (let ca = 0; ca < a.col; ++ca) {
                let sum = 0
                // https://webgl2fundamentals.org/webgl/lessons/webgl-matrix-vs-math.html
                // use rows as columns when doing matrix math
                for (let ra = 0; ra < a.row; ++ra) sum += b.get(rb, ra) * a.get(ra, ca)
                result.push(sum)
            }
        }
        return new Matrix(a.row, b.col, result)
    }

    multiply(b) { return Matrix.multiply(this, b) }

    sub(i, j) {
        const result = []
        for (let r = 0; r < this.row; ++r) {
            if (r === i) continue
            for (let c = 0; c < this.col; ++c) {
                if (c === j) continue
                result.push(this.get(r, c))
            }
        }
        return new Matrix(this.row - 1, this.col - 1, result)
    }
}

class SquareMatrix extends Matrix {
    constructor(d, data) { super(d, d, data) }
    static from(m) { return new this(m.row, m) }

    multiply(b) {
        const result = Matrix.multiply(this, b)
        if (b.constructor === this.constructor) return this.constructor.from(result)
        return result
    }
    sub(i, j) { return SquareMatrix.from(super.sub(i, j)) }

    det() {
        if (this.row === 1) return this[0]
        let result = 0
        for (let r = 0; r < this.row; ++r)
            result += ((r & 1) ? -1 : 1) * this.get(r, 0) * this.sub(r, 0).det()
        return result
    }
    inverse() {
        const result = []
        let det = 0
        for (let c = 0; c < this.col; ++c) {
            for (let r = 0; r < this.row; ++r) {
                const cofactor = ((r + c & 1) ? -1 : 1) * this.sub(r, c).det()
                if (c === 0) det += this.get(r, 0) * cofactor
                result.push(cofactor)
            }
        }
        return new SquareMatrix(this.row, result.map(x => x / det))
    }
}

class M4 extends SquareMatrix {
    constructor(...args) { super(4, args) }
    static from(m) { return new this(...m) }
    inverse() { return M4.from(super.inverse()) }

    static translation(tx, ty, tz) {
        return new M4(
             1,  0,  0, 0,
             0,  1,  0, 0,
             0,  0,  1, 0,
            tx, ty, tz, 1,
        )
    }
    static xRotation(angleInRadians) {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        return new M4(
            1,  0, 0, 0,
            0,  c, s, 0,
            0, -s, c, 0,
            0,  0, 0, 1,
        )
    }
    static yRotation(angleInRadians) {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        return new M4(
            c, 0, -s, 0,
            0, 1,  0, 0,
            s, 0,  c, 0,
            0, 0,  0, 1,
        )
    }
    static zRotation(angleInRadians) {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        return new M4(
             c, s, 0, 0,
            -s, c, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1,
        )
    }
    static scaling(sx, sy, sz) {
        return new M4 (
            sx,  0,  0, 0,
             0, sy,  0, 0,
             0,  0, sz, 0,
             0,  0,  0, 1,
        )
    }
    static projection(width, height, depth) {
        return new M4(
             2 / width, 0, 0, 0,
             0, -2 / height, 0, 0,
             0, 0, 2 / depth, 0,
            -1, 1, 0, 1,
        )
    }

    static orthographic(left, right, bottom, top, near, far) {
        return new M4(
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,

            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
        )
    }

    static perspective(fieldOfViewInRadians, aspect, near, far) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians)
        const rangeInv = 1.0 / (near - far)

        return new M4(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        )
    }

    static lookAt(cameraPosition, target, up) {
        let zAxis = Vector.subtract(cameraPosition, target).normalize()
        const xAxis = Vector.cross(up, zAxis).normalize()
        const yAxis = Vector.cross(zAxis, xAxis).normalize()

        return new M4(
            xAxis[0], xAxis[1], xAxis[2], 0,
            yAxis[0], yAxis[1], yAxis[2], 0,
            zAxis[0], zAxis[1], zAxis[2], 0,
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2],
            1,
        )
    }

    static transformVector(m, v) {
        const dst = [];
        for (let i = 0; i < 4; ++i) {
            dst[i] = 0.0;
            for (let j = 0; j < 4; ++j) {
                dst[i] += v[j] * m[j * 4 + i]
            }
        }
        return dst
    }

    translate(tx, ty, tz) { return this.multiply(M4.translation(tx, ty, tz)) }
    xRotate(angleinradians) { return this.multiply(M4.xRotation(angleinradians)) }
    yRotate(angleinradians) { return this.multiply(M4.yRotation(angleinradians)) }
    zRotate(angleinradians) { return this.multiply(M4.zRotation(angleinradians)) }
    scale(sx, sy, sz) { return this.multiply(M4.scaling(sx, sy, sz)) }
}

class M3 extends SquareMatrix {
    constructor(...args) { super(3, args) }
    static from(m) { return new this(...m) }
    inverse() { return M3.from(super.inverse()) }

    static translation(tx, ty) {
        return new M3(
             1,  0, 0,
             0,  1, 0,
            tx, ty, 1,
        )
    }
    static rotation(angleInRadians) {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        return new M3(
            c, -s, 0,
            s,  c, 0,
            0,  0, 1,
        )
    }
    static scaling(sx, sy) {
        return new M3 (
            sx,  0, 0,
             0, sy, 0,
             0,  0, 1,
        )
    }
    static projection(width, height) {
        return new M3(
             2 / width, 0, 0,
             0, -2 / height, 0,
            -1, 1, 1,
        )
    }

    translate(tx, ty) { return this.multiply(M3.translation(tx, ty)) }
    rotate(angleinradians) { return this.multiply(M3.rotation(angleinradians)) }
    scale(sx, sy) { return this.multiply(M3.scaling(sx, sy)) }
}