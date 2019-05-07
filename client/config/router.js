import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    // 配置router-link标签的样式  内容有部分相同时加上这个样式
    linkActiveClass: 'active-link',
    // 路径完全与router-link中的to的内容完全相同时加上这个class
    linkExactActiveClass: 'exact-active-link',
    // 去除掉#号
    // mode: 'history',
    // 页面路径跳转时页面要不要滚动。如果之前有进入到过to的路由中，会保存页面位置
    scrollBehavior (to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // 浏览器不支持histoty时自动转成hash的形式
    fallback: true
    // url里带的参数从字符串转成json的对象
    // parseQuery (query) {},
    // stringifyQuery (obj) {}
    // base: '/base/'
  })
}
