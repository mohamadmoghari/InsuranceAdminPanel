const VueStore = {
  install(Vue, options) {
    let root = options._root || '',
      store = options._store || undefined

    if (root === '' && store === undefined) store = options

    store = store || {}

    if (root) {
      Vue.util.defineReactive(this, 'Store', store)
      Vue.prototype[root] = this.Store
    } else {
      for (let [k, v] of Object.entries(store)) {
        Vue.util.defineReactive(Vue.prototype, k, v)
      }
    }
  }
}

export default VueStore
