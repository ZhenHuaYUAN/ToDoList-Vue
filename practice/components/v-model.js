import Vue from 'vue'

const component = {
  template: `<div>
    <input @input="handleInput" :value="value1"/>
  </div>`,
  props: {
    value1: String
  },
  // 更改v-model绑定的数据与事件
  model: {
    prop: 'value1',
    event: 'change'
  },
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data() {
    return {
      value: '123'
    }
  },
  // arguments是子组件传递出来的参数，形成数组的形式
  template: `<div>
      <comp-one :value='value' @change="value = arguments[0]"></comp-one>
      <comp-one v-model="value"></comp-one>
    </div>`
})
