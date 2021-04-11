const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  const method = req.method
  const str = `你的url为：${url},请求method为：${method}`
  console.log(str);
})

server.listen(8080, () => {
  console.log('server running at http://127.0.0.1');
})