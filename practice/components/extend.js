import Vue from 'vue'

const component = {
  template: `
      <div>
        <input v-model='text'/>
        <span>{{propOne}}</span>
        <span v-show="active">see me if active</span>
      </div>`,
  data() {
    return {
      text: 123
    }
  },
  props: {
    active: Boolean,
    propOne: String
  },
  mounted() {
    console.log('component mounted')
  }
}
// extends 可以扩展一个组件，而不用全部重写
const component2 = {
  extends: component,
  data() {
    return {
      text: 321
    }
  },
  mounted() {
    // 子组件中可以这样改变父组件的值
    this.$parent.text = 123456
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  data: {
    text: 213
  },
  template: `
  <div>
    <span>{{text}}</span>
    <comp></comp>
  </div>`
})

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   // 此时传入data会覆盖组件中的默认值
//   data: {
//     text: '123'
//   },
//   // 生命周期方法不会被覆盖
//   mounted() {
//     console.log('instance mounted')
//   }
// })
