//模块化路由
const express = require('express')
const app = express()
//导入路由模块
const router = require('./06_router')

// app.use(router)
app.use('/api', router)

app.listen(80, () => {
  console.log('http://127.0.0.1');
})