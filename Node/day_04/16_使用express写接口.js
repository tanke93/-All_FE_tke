const express = require('express')
const cors = require('cors')
const app = express()

//配置解析表单数据的中间件
app.use(cors())
app.use(express.urlencoded({ extended: false }))
const router = require('./17_apiRouter')
app.use('/api', router)

app.listen(80, () => {
  console.log('http://127.0.0.1');
})