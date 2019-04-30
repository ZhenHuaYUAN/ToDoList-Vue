import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

// 把Vue的内容加载到root里
new Vue({
  render:(h)=>h(App)
}).$mount(root)