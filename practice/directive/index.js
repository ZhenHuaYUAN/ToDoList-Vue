import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
      <div v-text="text" v-show='active'></div>
      <div v-html="html" v-if='active'></div>
      <input type="text"  v-model.number.trim.lazy="number" />
      <ul>
        <li v-for="(item,index) in arr" :key="index"> {{index}}:{{item}} </li>
      </ul>
      <ul>
        <li v-for="(val,key,index) in obj" :key="index">{{index}}:{{key}}:{{val}} </li>
      </ul>
      <div>
        <input type="checkbox" :value="1" v-model="arr" />
        <input type="checkbox" :value="2" v-model="arr" />
        <input type="checkbox" :value="3" v-model="arr" />
      </div>
      <div>
        <input type="radio" value="one"  v-model="picked" />
        <input type="radio" value="two"  v-model="picked" />
      </div>
    </div>`,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    number: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})
