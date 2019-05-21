// 声明绝对路径
const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/'
  },
  // 配置loader加载文件。可以加载前端会用到的所有资源。css、图片等
  module: {
    rules: [
      // 希望在vue-loader处理vue文件之前先进行一次代码检测。
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
  }
}
module.exports = config
