//node.js 的服务器开发框架
//本质:第三方包
//express是基于http内置模块封装的
const express = require('express')
//创建Web服务器
const app = express()
//监听客户端的GET和POST请求，并且向客户端响应具体的内容
//GET
app.get('/user', (req, res) => {
  res.send({ name: 'zs', age: 18, 'gender': '男' })
})
//POST
app.post('/user', (req, res) => {
  res.send('请求成功')
})
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})