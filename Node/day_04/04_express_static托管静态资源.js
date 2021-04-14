const express = require('express')
const app = express()

//调用express.static()方法快速对外提供静态资源
// app.use('/clock', express.static('./clock'))
app.use('/files', express.static('./files'))

app.listen(80, () => {
  console.log('http://127.0.0.1')
})