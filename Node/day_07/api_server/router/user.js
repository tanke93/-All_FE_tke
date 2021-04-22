const express = require('express')
const app = express()
// 导入自定义的db模块
const db = require('../db/index.js')

const bcryptjs = require('bcryptjs')

const expressJoi = require('@escook/express-joi')

const jwt = require('jsonwebtoken')

const { reg_login_schema } = require('../schema/user.js')

// const {   } = require('../db/index.js')

const config = require('../config.js')

const router = express.Router()

// 导入并使用用户信息路由模块
const userinfoRouter = require('../router/userinfo.js')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证

app.use('/my', userinfoRouter)

router.post('/reguser', expressJoi(reg_login_schema), (req, res) => {
  let { username, password } = req.body

  // if (!username || !password) {
  //   // return res.send({ status: 1, msg: '用户名或密码不能为空' })
  //   return res.cc('用户名或密码不能为空')
  // }
  //查询数据库
  db.query('select * from ev_users where username = ?', [username], (err, result) => {
    //这里如果报错是SQL执行不成功，如果没找到用户，是不会报错
    if (err) {
      // res.send({ status: 1, message: '服务器异常！请稍后再试' })
      res.cc('服务器异常！请稍后再试')
    }
    //SQL执行成功
    if (result.length > 0) {
      // return res.send({ status: 1, message: '该账号已存在，请更换其他账号' })
      return res.cc('该账号已存在，请更换其他账号')
    }

    //TODO 将该用户信息插入到数据库中
    password = bcryptjs.hashSync(password)

    db.query('insert into ev_users set ?', { username, password }, (err, result) => {
      // if (err) res.send({ status: 1, message: '服务器异常！请稍后再试' })
      if (err) return res.cc('服务器异常！请稍后再试')
      // if (result.affectedRows !== 1) return res.send({ status: 1, message: '注册失败！' })
      if (result.affectedRows !== 1) return res.cc('注册失败！')
      // return res.send({ status: 0, message: '注册成功！' })
      return res.cc('注册成功！', 0)
    })
  })
})
router.post('/login', expressJoi(reg_login_schema), (req, res) => {
  console.log(req.body);
  const { username, password } = req.body


  // 由于数据库中密码存储的是密文，所以不能直接通过SQL条件查询出这个用户
  // 先要根据用户名，从数据库中，把这个人的基本信息找出来（如果找不到这个人，说明账号错了）
  // 在根据bcryptjs包提供的API，对明文和密码进行比对（如果比对失败，说明密码错了）

  db.query('select * from ev_users where username = ?', [username], (err, result) => {
    if (err) return res.cc('服务器异常，请稍后重试！')
    if (result.length < 1) return res.cc('账号错误！')

    const ok = bcryptjs.compareSync(password, result[0].password)
    if (!ok) return res.cc('密码错误！')

    // 方法一
    const user = { ...result[0], password: '', user_pic: '' }
    // 方法二
    // const { password, user_pic, ...user } = result[0]
    // 对用户信息进行加密
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    res.send({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + tokenStr,
    })

    // res.cc('登录成功', 0)
  })
})

module.exports = router