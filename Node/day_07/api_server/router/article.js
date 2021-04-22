// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

const multer = require('multer')

const path = require('path')

const db = require('../db/index.js')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ date: path.join(__dirname, '../uploads') })

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')

// 发布新文章
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

  //处理文章的信息对象
  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  }

  // 执行 SQL 语句
  db.query('insert into ev_articles set ?', articleInfo, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('发布文章失败！')

    // 发布文章成功
    res.cc('发布文章成功', 0)
  })
})

// 向外共享路由对象
module.exports = router