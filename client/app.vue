<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}}</p>
    <router-link to="/app/123">app123</router-link>
    <router-link to="/login">login</router-link>
    <!-- <todo></todo> -->
    <!-- vue-router内置的组件 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
// 快速在组件中使用vuex
import {
  // mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
  components: {
    Header,
    Footer
    // Todo
  },
  methods: {
    // 'a/add'  'a/updateText'
    ...mapActions(['updateCountASync']),
    ...mapMutations(['updateCount'])
  },
  mounted() {
    console.log(this.$store)
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)
    // dispatch是用来触发actions的
    // this.$store.dispatch('updateCountASync', {
    //   num: 5,
    //   time: 2000
    // })
    this.updateCountASync({
      num: 5,
      time: 2000
    })
    // this['a/updateText']('123')
    // this['a/add']()
  },
  computed: {
    // ...mapState(['count']),
    // ...mapState({
    //   counter: 'count',
    //   textB: state => state.b.text,
    //   textC: state => state.c.text
    // }),
    // count() {
    //   return this.$store.state.count
    // },
    // fullName() {
    //   return this.$store.getters.fullName
    // }
    ...mapGetters({
      fullName: 'fullName'
      // textPlus: 'a/textPlus'
    })
    // textA() {
    //   return this.$store.state.a.text
    // }
  }
}
</script>

<style lang="stylus" scoped>
/* 背景虚化 */
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>
