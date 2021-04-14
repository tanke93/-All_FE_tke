const express = require('express')
//创建路由器对象
const router = express.Router()

//挂载路由
router.get('/user/list', (req, res) => {
  res.send('GET请求成功！')
})

router.post('/user/add', (req, res) => {
  res.send('POST请求成功！')
})

module.exports = router