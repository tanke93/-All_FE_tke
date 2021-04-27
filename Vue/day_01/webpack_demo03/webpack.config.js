const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  //loader的配置
  module: {
    rules: [
      {
        test: /\.css$/i,//匹配css结尾的文件
        use: ['style-loader', 'css-loader']
        //css-loader
        //style-loader
      },
      {
        test: /\.less$/i,//匹配css结尾的文件
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  //插件
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],

  //模式
  mode: 'development',//production
};
