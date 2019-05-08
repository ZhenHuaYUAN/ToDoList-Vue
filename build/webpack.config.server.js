const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
// Vue服务端渲染必须用的插件
const VueServerPlugin = require('vue-server-renderer/server-plugin')
let config

config = merge(baseConfig, {
  // 打包出来的程序在node端执行
  target: 'node',
  entry: path.join(__dirname, '../client/server-enter.js'),
  devtool: '#source-map',
  output: {
    // 不同方式的引入js文件。控制 webpack 打包的内容是如何暴露的。
    // commonjs2将库的返回值分配给module.exports。正如名字所指，这个选项可以使用在 CommonJS 环境。
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // 在导出的文件里require package中的内容。让node不要去打包这部分文件
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }]
  },
  plugins: ([
    new ExtractPlugin('style.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
      'process.env.VUE_ENV': '"server"'
    }),
    // 整体的打包输出一个json文件而不是js文件
    new VueServerPlugin()
  ])
})

module.exports = config
