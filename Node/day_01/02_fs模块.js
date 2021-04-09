const fs = require('fs')

// 语法：fs.readFile(path[,options],callback)
fs.readFile('./files/11.txt', 'utf8', (err, data) => {
  // 遵循 错误优先
  // 如果读取成功 err值为null
  // 如果读取失败 err值为错误对象 data的值为undefined
  console.log(err);
  console.log(data);
  if (err) {
    return console.log('文件读取失败!' + err.message);
  }
  console.log('文件读取成功！' + data);

})
fs.writeFile('./files/12.txt', 'Hello Node.js', function (err) {
  if (err) {
    return console.log('文件读取失败!' + err.message);
  }
})

