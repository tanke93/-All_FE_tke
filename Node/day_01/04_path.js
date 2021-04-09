const fs = require('fs');
const path = require('path');

//__dirname 当前文件(源代码文件)所在的目录的绝对路径

// path.join可以将多个路径拼接成一个完整的路径
// 好处： (自动识别当前的运行的操作系统，识别路径分隔符, 保证了跨操作系统移植代码)
const bname = path.basename(filePath)
console.log(bname);
const ename = path.extname(filePath)
console.log(ename);

fs.readFile(path.join(__dirname, './files/path模块.txt'), 'utf8', (err, data) => {
  if (err) return console.log(err.message);
  console.log(data);
})
console.log(__dirname);
