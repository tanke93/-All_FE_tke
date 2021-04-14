const express = require('express')
const app = express()

app.get('/user/:ids/:username', (req, res) => {
  res.send(req.params)
  console.log(req.params);
})
app.listen(80, () => {
  console.log('server running at http://127.0.0.1');
})