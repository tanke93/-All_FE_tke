const express = require('express')
const app = express()

const parser = require('body-parser')

app.use(parser.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  //如果没有配置任何解析数据的中间件，则req.body默认等于undefined
  console.log(req.body);
  res.send('请求成功！')
})
app.listen(80, () => {
  console.log('http://127.0.0.1');
})