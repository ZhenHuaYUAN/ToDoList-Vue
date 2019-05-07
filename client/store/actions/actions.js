// action里可以写异步的代码，mutation只能同步。就是用来处理异步的修改数据的方法
export default {
  updateCountASync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
