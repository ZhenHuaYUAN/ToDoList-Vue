/* eslint-disable no-unused-vars */
// 处理开发环境的服务端渲染
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// 和fs的区别是不把文件写入到磁盘上面
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

// 编译webpack
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
// 指定webpack的编译的输出目录是在内存里
serverCompiler.outputFileSystem = mfs

// 记录webpack每次打包生成的新的文件
let bundle
serverCompiler.watch({}, (err, stats) => {
  // 打包的报错直接抛出异常
  if (err) {
    throw err
  }
  stats = stats.toJson()
  // 其他的错误 比如eslint
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warn => {
    console.warn(warn)
  })
  // 读取生成的bundle文件,生成的目录根据webpack.config.server中指定的
  const bundlePath = path.join(
    serverConfig.output.path,
    // VueServerPlugin打包生成的json文件名
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  // webpack打包时打印
  console.log('new bundle generated')
})

// koa中间件 处理服务端渲染返回的东西
const handleSSR = async (ctx) => {
  // 判断bundle是否存在。使用server.template.ejs模板
  if (!bundle) {
    ctx.body = '等一会儿'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  // 服务端渲染的过程。vue-server-render输出的是body里的html代码.
  // 读取模板的内容
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  // 声明render （渲染） 会生成一个可以直接调用render的一个方法
  const renderer = VueServerRender.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
