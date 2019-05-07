import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()

// 动态注册store组件。动态加载模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

// 导航守卫注册  在每次导航跳转前会执行这个函数，必须在里面使用了next才能跳转。可以在里面进行一些数据的校验
router.beforeEach((to, from, next) => {
  // if (to.fullPath === '/app') {
  //   next('/login')
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

// 路由跳转后
router.afterEach((to, from) => {
  console.log('afterEach')
})

Vue.use(store)

// 把Vue的内容加载到root里
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
