import Vue from 'vue'

const component = {
  name: 'comp',
  // template: `<div :style='style'>
  //   <slot></slot>
  // </div>`,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'abc'
    }
  },
  props: ['props1'],
  render(createElement) {
    return createElement('div', {
      style: this.style
      // on: {
      //   click: () => {
      //     this.$emit('click')
      //   }
      // }
      // this.$slots.header 插槽名称是header。如果为this.$slots.default就是没有名字
    }, [this.$slots.header, this.props1])
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
  mounted() {
    console.log(this.$refs.comp, this.$refs.span)
  },
  methods: {
    handleClick() {
      console.log('clicked')
    }
  },
  // template: `<div>
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // </div>`,
  render(createElement) {
    // vue提供的创建节点的函数，在每个vue的实例上都会有这个函数。 参数为组件（dom节点）名字，标签上的属性，节点内的内容
    return createElement('comp-one', {
      ref: 'comp',
      props: {
        props1: this.value
      },
      // on: {
      //   click: this.handleClick
      // },
      // nativeOn自动绑定到组件的根节点的原生的dom上面
      nativeOn: {
        click: this.handleClick
      }
    }, [createElement('span', {
      ref: 'span',
      // 指定放在哪个插槽里
      slot: 'header'
    }, this.value)])
  }
})
