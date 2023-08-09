const http = require('http')
const fs = require('node:fs')

const hostname = '127.0.0.1'
const port = 3000

const index_page = fs.readFileSync('index.html')

console.log(index_page)

const server = http.createServer((req, res) => {
  console.log()
  console.log('----------------------------------------')
  console.log('INFO: got request')
  console.log('method:', req.method)
  console.log('url:', req.url)
  // console.log('headers:', req.headers)

  if (req.url === '/') {
    if (req.method === 'GET') {
      // res.statusCode = 200;
      // res.setHeader('Content-Type', 'text/h')
      // res.end('Hello World\n')
      res.end(index_page)
      return
    }
  }

  res.statusCode = 404
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})