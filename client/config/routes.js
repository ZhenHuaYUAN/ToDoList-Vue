// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
  // 路由上可以带上参数 :id。后面的内容会作为id传到组件。能放到这个对应的component中使用。props配置为true时，会把id作为参数传递给组件
  // props还可以设置为对象、方法
    // path: '/app/:id',
    path: '/app',
    props: true,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    component: () => import('../views/todo/todo.vue'),
    // 保存路由中的信息
    meta: {
      title: 'this is app',
      description: 'lalal'
    }
    // 进入路由前被调用 在beforeEach和beforeResolve中间
    // beforeEnter: (to, from, next) => {
    //   console.log('beforeEnter')
    //   next()
    // }
  // 相当于在app下的子路由,需要在app中加上router-view标签
  // children: [
  //   {
  //     path: 'test',
  //     component: Login
  //   }
  // ]
  },
  {
    path: '/login',
    component: Login
  }
]
