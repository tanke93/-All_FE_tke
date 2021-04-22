const express = require('express')
const router = express.Router()
const db = require('../db/index')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
const bcrypt = require('bcryptjs')
// const { update_avatar_schema } = require('../schema/user')
//挂载路由
router.get('/userinfo', (req, res) => {
  const sql = 'select id,username,nickname,email,user_pic,from ev_users where id=?'

  db.query(sql, req.user.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc('获取用户信息失败！')
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0],
    })
  })
  // res.send('ok')
})
router.post('/userinfo', expressJoi(update_userinfo_schema), (req, res) => {
  //  定义待执行的SQL语句
  const sql = `update ev_users set ? where id=?`
  //  调用db.query()执行SQL语句并传递参数
  // const { id, ...user } = req.body
  const { username, user_pic } = req.body
  const user = { username, user_pic }

  db.query(sql, [req.body, req.body.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

    // 修改用户信息成功
    return res.cc('修改用户基本信息成功！', 0)
  })


  // res.send('ok')
})
router.post('/updatepwd', expressJoi(update_password_schema), (req, res) => {

  db.query('select * from ev_users where id=?', req.user.id, (err, results) => {
    if (err) return res.cc(err)
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误！')

  })

  // 对新密码进行 bcrypt 加密处理
  const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
  db.query('update ev_users set password=? where id=?', [newPwd, req.user.id], (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)

    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新密码失败！')

    // 更新密码成功
    res.cc('更新密码成功！', 0)
  })
})

router.post('/update/avatar', expressJoi(update_avatar_schema), (req, res) => {
  db.query('update ev_users set user_pic=? where id=?', [req.body.avatar, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新头像失败！')

    // 更新用户头像成功
    return res.cc('更新头像成功！', 0)
  })
  // res.send('ok')
})

module.exports = router