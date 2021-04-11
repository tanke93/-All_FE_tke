const http = require('http')
const server = http.createServer()

server.on('request', (res, req) => {
  console.log('Someone visit our server.');
})
server.listen(8080, function () {
  console.log('server running at http://127.0.0.1:8080');
})