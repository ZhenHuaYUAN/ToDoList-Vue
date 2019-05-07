import Vue from 'vue'

const ChildComponent = {
  template: '<div>{{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted() {
    console.log(this.yeye, this.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // template: `<div :style='style'>
  //  <div class='header'>
  //   <slot name='header'></slot>
  //  </div>
  //  <div class='body'>
  //   <slot name='body'></slot>
  //  </div>
  // </div>`,

  template: `<div :style='style'>
    <slot :value="value" p="啦啦啦"></slot>
    <child-component></child-component>
  </div>`,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'abc'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  // provider/inject：简单的来说就是在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量。
  // 需要注意的是这里不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。而不是局限于只能从当前父组件的prop属性来获取数据。
  // 再改变时不会导致子组件重新渲染。如果一定要给属性reactive（响应式）特性，需要给指定的属性提供get方法
  provide() {
    const data = {}
    // 这样定义后，子组件中每次使用value属性都会调用这个get方法去获得value
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      // 可以被读取
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data() {
    return {
      value: '123'
    }
  },
  mounted() {
    console.log(this.$refs.comp, this.$refs.span)
  },
  template: `<div>
    <comp-one ref="comp">
      <span slot-scope="props" ref="span">{{props.value}} {{props.p}} {{value}}</span>
    </comp-one>
    <input v-model="value" />
  </div>`
})
