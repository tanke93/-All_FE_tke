const express = require('express')
const app = express()

app.use((req, res, next) => {
  // 请求到达的时间
  const time = Date.now()
  req.startTime = time
  next()
})

app.get('/', (req, res) => {
  console.log(req.startTime);
  res.send('第一个GET请求成功！' + req.startTime)
})

app.get('/user', (req, res) => {
  res.send('第二个GET请求成功！' + req.startTime)
})

app.listen(80, () => {
  console.log('http://127.0.0.1');
})