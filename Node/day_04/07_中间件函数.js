const express = require('express')
const app = express()

//方法一
// const mw = function (req, res, next) {
//   console.log('简单的中间件');
//   next()
// }
// app.use(mw)


app.get('/', (req, res) => {
  console.log('调用了/这个路由');
  res.send('第一个GET请求成功！')
})

//如果路由地址不正确，就会进入中间件
// app.get('/x', (req, res) => {
//   console.log('调用了/这个路由');
//   res.send('第一个GET请求成功！')
// })
//方法二
app.use((req, res, next) => {
  console.log('这个是一个中间件函数');
  next()
})


app.get('/user', (req, res) => {
  console.log('调用了/user这个路由');
  res.send('第二个GET请求成功！')
})

app.listen(80, () => {
  console.log('http://127.0.0.1');
})