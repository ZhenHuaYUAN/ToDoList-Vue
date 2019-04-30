// 声明绝对路径
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
// 非JavaScript代码的东西打包成一个单独的文件
const ExtractPlugin = require("extract-text-webpack-plugin")


const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '/dist')
  },
  // 配置loader加载文件。可以加载前端会用到的所有资源。css、图片等
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },

      {
        // 图片文件大小小于1024,就会将图片转换为base64的代码
        test: /\.(gif|jpg|png|jpeg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name]-aaa.[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    
  ]
}

// 判断是正式环境还是开发环境  根据启动时的命令设置环境变量 。使用cross-env 避免不同平台设置不同
if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
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
  // 使调试时映射编译后的代码变成能看懂的
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 9090,
    // host使用0.0.0.0可以使同一个局域网里的其他机器通过ip地址访问到
    host: 'localhost',
    // webpack编译时显示到网页上
    overlay: {
      errors: true,
    },
    // 自动打开浏览器
    open: true,
    // 改了一个组件的代码，只改变组件的内容.包括下面的plugin
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
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
  })
  config.plugins.push(
    new ExtractPlugin('style.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'runtime'
    })
  )
}

module.exports = config