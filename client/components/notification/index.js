// 创建类似于Vue插件的方法
import Notification from './notification.vue'
import notify from './function'
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  // 加在Vue的prototype上的属性，每一个组件都可以调用
  Vue.prototype.$notify = notify
}
