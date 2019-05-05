import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>显示html</span>',
    divId: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      background: 'black'
    }
  },
  // template: `<div v-bind:id="divId" @click="handleClick">
  //   {{isActive ? '正确' : '错误'}}
  //   {{arr.join(' ')}}
  //   <p v-html="html"></p>
  // </div>`,
  template: ` <div :class="[{ active: isActive }, {not: !isActive}]" @click="handleClick" :style='[styles, styles2]'>
      <p v-html="html"></p>
      <p>{{getJoinedArr(arr)}}</p>
    </div>`,
  methods: {
    handleClick() {
      this.isActive = !this.isActive
    },
    getJoinedArr(arr) {
      return arr.join(' ')
    }
  }
})
