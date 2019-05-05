import Vue from 'vue'

// new Vue({
//   // template挂载到什么地方。挂载的过程是会把整个节点替换掉
//   el: '#root',
//   template: '<div>{{text}}</div>',
//   data: {
//     text: 'text'
//   }
// })
// 另一种挂载的方法
const app = new Vue({
  template: '<div ref="aaa">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})

// setInterval(() => {
//   app.$data.text += 1
// }, 1000)

app.$mount('#root')
// 在新建Vue对象时穿进去的data内容
console.log(app.$data)
// 传入的props值
console.log(app.$props)
// html的结点
console.log(app.$el)
// 包含了创建Vue对象时的默认值和传进去的值。 里面的data值是通过vue在init对象时做过一些修改。直接修改它里面的值没有作用
console.log(app.$options)
// 下一次有值变化重新进行渲染时生效
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// vue的实例对象 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
console.log(app.$root)
// 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，
// 考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。
console.log(app.$children)
// 用来访问被插槽分发的内容。每个具名插槽 有其相应的属性
console.log(app.$slots)
// 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
console.log(app.$scopedSlots)
// 一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例。可以快速定位到模板里的某个结点或者组件
console.log(app.$refs)
// 服务端渲染时会用到这个判断。判断某些当前 Vue 实例是否运行于服务器。返回值是boolean类型
console.log(app.$isServer)

// Vue实例上的方法
// 监听一个值的改变。和写在option中效果相同。这样写需要自己去注销watch方法
const unWatch = app.$watch('text', (newText, oldText) => {
  console.log(`${newText}:${oldText}`)
})
setTimeout(() => {
  unWatch()
}, 2000)
// 监听事件触发
// app.$on('test', () => {
//   console.log('test emited')
// })
// 触发事件
app.$emit('test')
setInterval(() => {
  app.$emit('test')
}, 1000)
// 只监听一次
app.$once('test', () => {
  console.log('test emited')
})
// 强制组件重新渲染一次。声明时没有的属性的变化不会引起重新渲染。尽量不要使用这种方法，可能会导致页面不停的重新渲染，应用性能变低
// app.obj.a = app.text
// setInterval(() => {
//   app.obj.a += 1
//   app.$forceUpdate()
// }, 1000)
// let i = 0
// 通过$set向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，
// 删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制
// setInterval(() => {
//   i++
//   app.$set(app.obj, 'a', i)
// }, 1000)

// $nextTick( [callback] )将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
// setInterval(() => {
//   app.text += 1
//   app.text += 1
//   console.log(app.text)
//   app.$nextTick(function () {
//     console.log(app.text)
//   })
//   app.text += 1
//   app.text += 1
//   app.text += 1
// }, 1000)
