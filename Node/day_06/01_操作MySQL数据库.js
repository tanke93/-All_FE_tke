const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01',
})

//测试mysql
// db.query('SELECT 1', (err, results) => {
//   if (err) return console.log(err.message)
//   //能够成功的执行
//   console.log(results);
// })

// const sqlStr = 'select * from users'

// db.query(sqlStr, (err, results) => {
//   if (err) return console.log(err.message)

//   console.log(results);
// })

//向user数据表中，新增一条数据
const user = { username: 'Spider-Man', password: 'pcc321' }
//待执行的SQL语句
const sqlStr = 'INSERT INTO users (username,password) VALUES (?,?)'

//便捷SQL写法
//const sqlStr ='INSET INTO users SET ?'
// db.query(sqlStr，user, (err, results) => {
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) { console.log('插入成功!'); }
// })

db.query(sqlStr, [user.username, user.password], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) { console.log('插入成功!'); }
})