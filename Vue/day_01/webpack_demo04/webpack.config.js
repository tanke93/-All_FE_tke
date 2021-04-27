const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  //入口起点
  entry: './src/index.js',
  //输出
  output: {
    //输出路径  __dirname nodejs的变量，代表当前文件的目录的绝对路径
    path: path.resolve(__dirname, 'build'),
    //输出文件名
    filename: 'build.js',
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
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource', // 所有的字体图标文件, 都输出到dist下
        generator: { // 生成文件名字 - 定义规则
          filename: 'fonts/[name].[hash:6][ext]' // [ext]会替换成.eot/.woff
        }
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
