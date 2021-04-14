const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url

  // const fpath = path.join(__dirname, '/clock', url)

  console.log(url);
  let fpath = ''
  if (url === '/') {
    fpath = path.join(__dirname, './clock/index.html')
  } else {
    fpath = path.join(__dirname, '/clock', url)
  }

  fs.readFile(fpath, 'utf8', (err, data) => {
    if (err) return res.end('404,找不到页面！')
    res.end(data)
  })
})
server.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080');
})