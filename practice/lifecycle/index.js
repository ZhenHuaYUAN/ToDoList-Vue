import Vue from 'vue'
const app = new Vue({
  // template: '<div>{{text}}</div>',
  data: {
    text: '1'
  },
  beforeCreate() {
    console.log(this.$el, 'beforeCreate')
  },
  created() {
    console.log(this.$el, 'created')
  },
  beforeMount() {
    console.log(this.$el, 'beforeMount')
  },
  mounted() {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate() {
    console.log(this, 'beforeUpdate')
  },
  updated() {
    console.log(this, 'updated')
  },
  activated() {
    console.log(this, 'activated')
  },
  deactivated() {
    console.log(this, 'deactivated')
  },
  beforeDestroy() {
    console.log(this, 'beforeDestroy')
  },
  destroyed() {
    console.log(this, 'destroyed')
  },
  render (h) {
    throw new TypeError('render Error')
    // console.log('render function invoked')
    // return h('div', {}, this.text)
  },
  // 开发过程中可能会被调用。render中出错时会调用。子组件的错不会触发
  renderError(h, err) {
    return h('div', {}, err.stack)
  },
  // 搜集线上的一些错误。所有子组件报的错都可以捕捉到。除非子组件停止了向上冒泡的事件
  errorCaptured () {
  }
})

app.$mount('#root')
// setInterval(() => {
//   app.text = app.text += 1
// }, 1000)

// setTimeout(() => {
//   app.$destroy()
// }, 1000)
