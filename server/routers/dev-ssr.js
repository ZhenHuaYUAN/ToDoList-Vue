/* eslint-disable no-unused-vars */
const Router = require('koa-router')
const axios = require('axios')
// 文件系统，但不把文件写入磁盘。直接写到内存里面
const MemoryFs = require('memory-fs')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
const serverComplier = webpack(serverConfig)
const mfs = new MemoryFs()
// 指定输出目录在内存里
serverComplier.outputFileSystem = mfs
// webpack每次打包生成的新的文件
let bundle
serverComplier.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  // 不是导致webpack报错的错误
  stats.errors.forEach(error => {
    console.log(error)
  })
  stats.warnings.forEach(warn => {
    console.log(warn)
  })

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

// 处理服务端渲染返回的东西
const handleSSR = async (ctx) => {
  // 服务刚启动时webpack可能还没有打包好。
  if (!bundle) {
    ctx.body = 'loading'
    return
  }
  // 获取客户端生成的js的路径
  const clientManifesstRest = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  // 自动生成一个带有js标签的引用
  const clientManifest = clientManifesstRest.data
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  // 使用 server bundle 和（可选的）选项创建一个 BundleRenderer 实例。
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)
module.exports = router
