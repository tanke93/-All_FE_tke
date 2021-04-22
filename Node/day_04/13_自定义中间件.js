const express = require('express')
const app = express()

//导入node.js的内置querystring模块
const qs = require('querystring')

//这是解析表单数据的中间件
app.use((req, res, next) => {
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

})
app.post('/user', (req, res) => {
  res.send(req.body)
})

app.listen(80, () => {
  console.log('http://127.0.0.1');
})

