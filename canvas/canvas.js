// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
function initShaderProgram(gl, vs, fs) {
    function load(type, src) {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, src)
        gl.compileShader(shader)

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) return shader

        // compilation failed
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    const vertexShader = load(gl.VERTEX_SHADER, vs)
    const fragmentShader = load(gl.FRAGMENT_SHADER, fs)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        program.setVertxAttr = function (name, numComponents, data) {
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)

            const loc = gl.getAttribLocation(this, name)
            gl.vertexAttribPointer(
                loc,            // location
                numComponents,  // numComponents
                gl.FLOAT,       // type
                false,          // normalize
                0,              // stride
                0               // offset
            )
            gl.enableVertexAttribArray(loc)
        }
        program.setUniform = function (dimension, name, data) {
            const loc = gl.getUniformLocation(this, name)
            switch (dimension) {
                case 1: return gl.uniform1fv(loc, data)
                case 2: return gl.uniform2fv(loc, data)
                case 3: return gl.uniform3fv(loc, data)
                case 4: return gl.uniform4fv(loc, data)
                default: throw Error(`Invalid dimention for uniform: ${dimension}`)
            }
        }
        return program
    }

    // link failed
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
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
//    const p = Array(512), permutation = [ 151,160,137,91,90,15,
//    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
//    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
//    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
//    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
//    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
//    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
//    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
//    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
//    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
//    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
//    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
//    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180 ];

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