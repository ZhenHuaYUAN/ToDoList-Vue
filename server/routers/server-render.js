const ejs = require('ejs')

// render 开发时和生产环境不一样，要从外部传入
module.exports = async (ctx, render, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = {
    url: ctx.path
  }

  try {
    const appString = await render.renderToString(context)
    // 渲染html
    const html = ejs.render(template, {
      appString,
      // 拿到带有style标签的整个字符串
      style: context.renderStyles(),
      // 拿到带有script标签的整个字符串
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (error) {
    console.log('render error ', error)
    throw error
  }
}
