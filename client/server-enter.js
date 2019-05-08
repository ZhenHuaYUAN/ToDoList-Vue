import createApp from './create-app'
// server-render中定义的context
export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router
    } = createApp()
    router.push(context.url)
    // 路由记录被推进去后，所有的异步的操作做完后调用这个onReady
    router.onReady(() => {
      // 根据url匹配到的组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
