const express = require('express')
const app = express()

const mw = function (req, res, next) {
  console.log('简单的中间件');
  next()
}

app.get('/', mw, (req, res) => {
  console.log(req.startTime);
  res.send('第一个GET局部中间件请求成功！')
})
app.get('/user', mw, (req, res) => {
  console.log(req.startTime);
  res.send('第一个GET局部中间件请求成功！')
})


app.listen(80, () => {
  console.log('http://127.0.0.1');
})