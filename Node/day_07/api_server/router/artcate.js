const express = require('express')

const router = express.Router()

// 导入数据库操作模块
const db = require('../db/index')

const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate.js')
// 获取文章分类的列表数据

// 根据分类的状态，获取所有未被删除的分类列表数据
// is_delete 为 0 表示没有被 标记为删除 的数据
router.get('/cates', (req, res) => {
  db.query('select * from ev_article_cate where is_delete=0 order by id asc', (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results,
    })
  })
  // res.send('ok')
})
//新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), (req, res) => {

  db.query('select * from ev_article_cate where name=? or alias=?', [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    db.query('insert into ev_article_cate set ?', req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.cc(err)

      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')

      // 新增文章分类成功
      res.cc('新增文章分类成功！', 0)
    })
  })
})
// Id 删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), (req, res) => {

  db.query('update ev_article_cate set is_delete=1 where id=?', req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

    // 删除文章分类成功
    res.cc('删除文章分类成功！', 0)
  })
})

// 根据 Id 获取文章分类数据
router.get('/cates/:id', expressJoi(get_cate_schema), (req, res) => {
  db.query('select * from ev_article_cate where id=?', req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')

    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0],
    })
  })
})

//根据 Id 更新文章分类数据
router.post('/updatecate', expressJoi(update_cate_schema), (req, res) => {

  db.query('select * from ev_article_cate where Id<>? and (name=? or alias=?)', [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    db.query('update ev_article_cate set ? where Id=?', [req.body, req.body.Id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)

      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')

      // 更新文章分类成功
      res.cc('更新文章分类成功！', 0)
    })
  })
})
// 向外共享路由对象
module.exports = router