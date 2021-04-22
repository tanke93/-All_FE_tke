const express = require('express')
const router = express.Router()

//get
//挂载路由
router.get('/get', (req, res) => {
  const query = req.query
  //给客户端响应处理结果
  res.send({
    status: 0,//0表示处理成功；1：表示处理失败
    msg: 'GET 请求成功',
    data: query//需要响应给客户端的数据
  })
})
//post
router.post('/post', (req, res) => {
  //通过req.body
  const body = req.body

  res.send({
    status: 0,//0表示处理成功；1：表示处理失败
    msg: 'POST 请求成功',
    data: body//需要响应给客户端的数据
  })
})

// 定义 DELETE 接口
router.delete('/delete', (req, res) => {
  res.send({
    status: 0,
    msg: 'DELETE请求成功',
  })
})

module.exports = router