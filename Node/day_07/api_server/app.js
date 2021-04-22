const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const app = express()
const config = require('./config.js')

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.use('/api', require('./router/user.js'))

const expressJWT = require('express-jwt')

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/artcate
app.use('/my/artcate', artCateRouter)

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

app.use(function (err, req, res, next) {
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  res.cc(err)
})
app.listen(3007, () => {
  console.log('http://localhost:3007');
})