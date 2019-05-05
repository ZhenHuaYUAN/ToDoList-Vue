import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
      <p>Name: {{name}}</p>
      <p>{{getName()}}</p>
      <p>Number:{{number}}</p>
      <p>FullName:{{fullName}}</p>
      <p><input type="text" v-model="number"/></p>
      <p>FirstName:<input type="text" v-model="firstName"/></p>
      <p>LastName<input type="text" v-model="lastName"/></p>
      <p>Name<input type="text" v-model="name"/></p>
      <p>Obj.a:<input type="text" v-model="obj.a"/></p>
      </div>`,
  data: {
    firstName: 'Yuan',
    lastName: 'ZhenHua',
    number: 0,
    fullName: ' ',
    obj: {
      a: '123'
    }
  },
  // computed有缓存，数据没有改变的时候不会重新计算,性能开销比较小
  computed: {
    name: {
      get() {
        console.log('new name')
        return this.firstName + ' ' + this.lastName
      },
      set(name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    firstName: {
      // Vue会把watch中的内容编译成handler包裹的样子
      handler(newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      // 声明这个绑定后后会先执行一次handler
      immediate: true
    },
    obj: {
      handler() {
        console.log('obj.a changed')
      },
      immediate: true,
      // deep设为true会监听对象里的属性的变化
      deep: true
    }
  },
  methods: {
    getName() {
      console.log('getName')
      return this.firstName + ' ' + this.lastName
    }
  }
})
