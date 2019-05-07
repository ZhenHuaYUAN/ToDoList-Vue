<template>
  <section class="real-app">
    <!-- .enter 按下enter键 -->
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter="addTodo"
    >
    <item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo"/>
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    ></tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  // 不！能！获取组件实例 `this`
  // 因为当守卫执行前，组件实例还没被创建
  // 你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
  beforeRouteEnter(to, from, next) {
    console.log('todo beforeRouteEnter')
    next(vm => {
      console.log('after enter this.id is ', vm.name)
    })
  },
  // 在当前路由改变，但是该组件被复用时调用 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，同时这样的跳转
  // 不会触发monuted函数
  beforeRouteUpdate(to, from, next) {
    console.log('todo beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('todo beforeRouteLeave')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  data() {
    return {
      todos: [],
      filter: 'all',
      name: 'todoList'
    }
  },
  props: ['id'],
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo(e) {
      // e是event对象  unshift插入到第一项
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  components: {
    Item,
    Tabs
  },
  mounted() {
    console.log(this.id)
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>

