const express = require('express')
const app = express()

//json格式
app.use(express.json())
//express.urlencoded
app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  console.log(req.body);
  res.send('post请求成功！')
})

app.post('/book', (req, res) => {
  console.log(req.body);
  res.send('请求成功')
})

app.listen(80, () => {
  console.log('http://127.0.0.1');
})