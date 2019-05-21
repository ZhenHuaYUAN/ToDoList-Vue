const Koa = require('koa')
// 发送静态文件
const send = require('koa-send')
const path = require('path')
const app = new Koa()
// 服务端渲染分开发和正式环境两种情况
const isDev = process.env.NODE_ENV === 'development'
const staticRouter = require('./routers/static')
// 中间件记录服务端请求以及抓取的错误
app.use(async (ctx, next) => {
  try {
    // 记录所有请求的路径
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try agin later'
    }
  }
})

// 图标 使用绝对路径时需要加上根路径
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {
      root: path.join(__dirname, '../')
    })
  } else {
    await next()
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
