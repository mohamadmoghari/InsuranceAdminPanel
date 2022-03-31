export const message = {
  options: {},
  items: [],
  add(item) {
    if (item.t === undefined) item.t = 8000
    if (item.id === undefined)
      item.id =
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9)

    if (item.replace) {
      item.replace = item.replace.replace(/\/|-|\./g, '_')
      this.items.forEach(function(v, k) {
        if (v.replace === item.replace) item.index = k
      })
    }

    if (item.t !== false)
      item._timeout = setTimeout(() => item.remove(), item.t)

    item.remove = () => {
      this.remove(item.id)
    }

    if (item.index !== undefined) {
      this.items.splice(item.index, 1, item)
    } else {
      this.items.unshift(item)
    }
  },
  remove(id) {
    this.items.map((v, k) => {
      if (v.id === id) this.items.splice(k, 1)
    })
  },
  error(message) {
    return this.add({ type: 'danger', text: message })
  },
  success(message) {
    return this.add({ type: 'success', text: message, t: 2000 })
  },
  info(message) {
    return this.add({ type: 'info', text: message })
  },
  warning(message) {
    return this.add({ type: 'warning', text: message })
  }
}

import MessageComponent from './Message.vue'

export const vueMessage = {
  install(vue) {
    vue.util.defineReactive(vue.prototype, '$message', message)
    vue.component('v-message', MessageComponent)
  }
}
