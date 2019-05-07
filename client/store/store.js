import Vuex from 'vuex'

import defaultState from './state/state'

import mutations from './mutations/mutations'

import getters from './getters/getters'

import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    // 禁止在外部修改vuex中的参数,会报warning
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    // modules: {
    //   a: {
    //     // namespaced为true后，调用mutations的方法也必须加上a
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText(state, text) {
    //         console.log(state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       // getters是所有的get方法，rootState是全局的state
    //       textPlus(state, getters, rootState) {
    //         return state.text + rootState.count + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       // ctx是这一个模块的内容
    //       // add (ctx)
    //       add({state, commit, rootState}) {
    //         // 如果要调用全局空间的mutation，需要加上{root: true}
    //         commit('updateText', rootState.count)
    //         commit('updateCount', {num: 56789}, {root: true})
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     }
    //   }
    // }
  })
  // Vuex热更新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
