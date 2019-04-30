// 声明绝对路径
const path = require('path')

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  // 配置loader加载文件。可以加载前端会用到的所有资源。css、图片等
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },{
        test: /\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/
      },
      {
        // 图片文件大小小于1024,就会将图片转换为base64的代码
        test: /\.(gif|jpg|png|jpeg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resoureces/[path][name].[hash:8].[ext]'
          }
        }]
      }
    ]
  },
}
module.exports = config