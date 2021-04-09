const fs = require('fs')

fs.readFile('./files/score.txt', 'utf8', (err, data) => {
  if (err) {
    return console.log(err.message);
  }

 
  // console.log(ary);
  // { name: '小明', score: '100' },
  // { name: '小红', score: '90' },
  // { name: '小黑', score: '80' },
  // { name: '小绿', score: '70' },
  // { name: '小蓝', score: '60' }
  fs.writeFile('./files/scoreOK.txt', data.replace(/=/g, '：').replace(/\s/g, '\n'), err => {
    if (err) return console.log(err.message);
    console.log('写入成功');
  })

  // const ary = data.split(' ').map(v => v.replace(':', '：'))
  // fs.writeFile('./files/成绩OK.txt', ary.join('\n'), 'utf8', err => {
  //   if (err) return console.log(err.message);
  //   console.log('写入成功');
  // })
})
