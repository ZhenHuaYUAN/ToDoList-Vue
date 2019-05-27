import Vue from 'vue'
import Component from './func-notification'

// 通过js的方法调用创建一个组件 extend创建的是一个组件构造器，而不是一个具体的组件实例。
// 最终还是要通过Vue.components注册才可以使用的。
const NotificationConstructor = Vue.extend(Component)

// 保存已经创建过的notification列表
const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)
  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  // 如果是服务端不做任何操作,涉及到dom操作，服务端没有运行环境
  if (Vue.prototype.$isServer) return

  // ...rest剩下的键值对
  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  // $mount进行挂载。不传节点只是生成了一个$el的对象，还没有插入到dom中
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  // 计算高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  // 点击关闭监听
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  // 删除节点的操作,释放内存
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  return instance.vm
}
export default notify
