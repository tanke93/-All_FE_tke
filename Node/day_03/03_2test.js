const Time = require('./03_1格式化时间')
const dt = new Date()

const newDT = Time.dateFormat(dt)
console.log(newDT);