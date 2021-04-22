const qs = require('querystring')
const bodyParser = (req, res, next) => {
  //定义中间件具体的业务逻辑
  // 1.定义一个str
  let str = ''
  // 2.监听req的data事件
  req.on('data', (chunk) => {
    str += chunk
  })
  //3.监听req的end的事件
  req.on('end', () => {
    // console.log(str);
    const body = qs.parse(str)
    req.body = body
    console.log(body)
    next()
  })
}

module.exports = bodyParser