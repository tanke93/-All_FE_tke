const express = require('express')
const session = require('express-session')

const app = express()

app.use(express.static('./public'))

app.use(session({
  secret: 'heheda',
  resave: false,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/username', (req, res) => {
  const { isLogin, user } = req.session
  if (isLogin) {
    res.send({
      status: 0,
      msg: '获取成功',
      username: user.username
    })
  } else {
    res.send({
      status: 1,
      msg: '你还没登录',
    })
  }
})

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
  console.log(req.body)
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    req.session.user = req.body
    req.session.isLogin = true
    res.send({
      status: 0,
      msg: '登录成功'
    })
  } else {
    res.send({
      status: 1,
      msg: '登录失败'
    })
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出成功'
  })
})

app.listen(8080, () => {
  console.log('http://localhost:8080')
})