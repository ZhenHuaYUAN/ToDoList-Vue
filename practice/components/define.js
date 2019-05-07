import Vue from 'vue'

const component = {
  template: `
      <div>
        This is {{text}}
        <span v-show="active">啦啦啦啦</span>
        <span @click="handleChange">{{propOne}}</span>
      </div>`,
  // 定义组件时如果data不是一个function的话，另外的地方同时使用多个此组件标签，里面的data值都相同
  // 组件中的data写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的data，类似于给每个组件实例创建一个私有的数据空间，
  // 让各个组件实例维护各自的数据。
  // 而单纯的写成对象形式，就使得所有组件实例共用了一份data，就会造成一个变了全都会变的结果。
  data() {
    return {
      text: 123
    }
  },
  methods: {
    handleChange() {
      this.$emit('change')
    }
  },
  // 父组件通过props指定子组件的一些可变的行为
  props: {
    active: {
      type: Boolean,
      // required:true
      // 如果default是一个对象，需要声明一个方法，在里面定义对象
      default: true
      // 自定义的去验证props值
      // validator (value) {
      // }
    },
    propOne: Number
  }
}
// 所有的地方都可以使用这个组件,全局注册
// Vue.component('CompOne', component)

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data: {
    text: 1
  },
  // 使用v-bind的方式传递数据，Vue会自动解析。否则只能传递字符串
  template: `
    <div>
      <comp-one :active="true"  :prop-one="text" @change="handleChange"></comp-one>
      <comp-one  :prop-one="text"></comp-one>
    </div>`,
  methods: {
    handleChange() {
      this.text += 1
    }
  }
})
