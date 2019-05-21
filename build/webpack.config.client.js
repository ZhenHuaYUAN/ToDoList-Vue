// 声明绝对路径
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 合并webpackconfig
const merge = require('webpack-merge')
// 非JavaScript代码的东西打包成一个单独的文件
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  // 给webpack编译过程中以及在js代码中判断环境可以调用process.env.NODE_ENV。 选择不同Vue源代码版本进行打包
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  // 会自动生成一个默认的文件名vue-ssr-client-manifest.json
  new VueClientPlugin()
]

let config
const devServer = {
  port: 8000,
  // host使用0.0.0.0可以使同一个局域网里的其他机器通过ip地址访问到
  host: 'localhost',
  // webpack编译时显示到网页上
  overlay: {
    errors: true
  },
  // 自动打开浏览器
  open: true,
  historyApiFallback: {
    // 这是在dist中的html，是HTMLPlugin生成的index.html的位置
    index: '/index.html'
  },
  // 改了一个组件的代码，只改变组件的内容.包括下面的plugin
  hot: true
}
// 判断是正式环境还是开发环境  根据启动时的命令设置环境变量 。使用cross-env 避免不同平台设置不同
if (isDev) {
  config = merge(baseConfig, {
    // 使调试时映射编译后的代码变成能看懂的
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          // css热重载
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
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
    plugins: defaultPlugins.concat([
      new ExtractPlugin('style.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
