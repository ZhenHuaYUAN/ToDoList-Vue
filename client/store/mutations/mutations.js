export default {
  // 不能传入第二个参数，如果需要传入多个参数时，只能把num包装成一个对象传入
  updateCount(state, {num}) {
    state.count = num
  }
}
