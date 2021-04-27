const path = require('path')
module.exports = {
  //入口起点
  entry: './src/index.js',
  //输出
  output: {
    //输出路径  __dirname nodejs的变量，代表当前文件的目录的绝对路径
    path: path.resolve(__dirname, 'built'),
    //输出文件名
    filename: 'built.js',
  },
  module: {
    rules: []
  },
  plugins: [],
  mode: 'development',
};
