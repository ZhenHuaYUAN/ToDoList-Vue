import createApp from './create-app'

// server-render中传入的context
export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router
    } = createApp()
    // 给路由推一条记录，匹配要调用的组件
    router.push(context.url)
    // 路由记录被推进router中后，所有的异步的操作做完后调用的回调函数。做一些服务端渲染时获取数据的操作
    router.onReady(() => {
      // 获取url匹配的组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      // 服务端渲染时使用vue-meta的方式
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
