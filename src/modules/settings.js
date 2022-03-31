import VueCookie from 'vue-cookie'

let hasLocalStorage = true

try {
  window.localStorage.setItem('____x_test', 'test')
  window.localStorage.removeItem('____x_test')
} catch (e) {
  hasLocalStorage = false
}

let localStore = {
  key: '__INSURANCE__LOCAL_CONFIG__',
  get: function(key, wid) {
    let data = '{}'

    if (hasLocalStorage) {
      data = window.localStorage.getItem(this.key) || data
    } else {
      data = VueCookie.get(this.key) || data
    }

    try {
      data = JSON.parse(data)
    } catch (er) {
      // eslint-disable-next-line
      console.warn('Cannot parse settings: ', data)
      data = {}
    }

    if (wid) {
      data = data[this.getKey(wid)]
      if (data === undefined) return key === undefined ? {} : undefined
    }

    if (key) data = data[key]

    return data
  },
  set: function(key, value, wid) {
    let data = this.get()

    if (wid) {
      let wKey = this.getKey(wid)
      let wData = data[wKey] || {}
      wData[key] = value
      data[wKey] = wData
    } else {
      data[key] = value
    }

    data = JSON.stringify(data)

    if (hasLocalStorage) {
      window.localStorage.setItem(this.key, data)
    } else {
      VueCookie.set(this.key, data, 100)
    }
  },
  /**
   * get or set if not exists
   * @param key
   * @param defaultValue
   * @param wid
   */
  getOrSet(key, defaultValue, wid) {
    let result = this.get(key, wid)
    if (result === undefined) {
      result = defaultValue
      this.set(key, defaultValue, wid)
    }
    return result
  },
  clear(key, wid) {
    let data = this.get()
    if (wid) {
      let wKey = this.getKey(wid)
      let wData = data[wKey]
      if (wData === undefined) return

      if (key) {
        wData[key] = undefined
      } else {
        wData = undefined
      }
      data[wKey] = wData
    } else {
      if (key) {
        if (data[key] === undefined) return
        data[key] = undefined
      } else {
        data = {}
      }
    }
    data = JSON.stringify(data)
    if (window.localStorage === undefined) {
      VueCookie.set(this.key, data, 100)
    } else {
      window.localStorage.setItem(this.key, data)
    }
  },
  bind(vm, property, key, defaultValue) {
    if (!defaultValue) defaultValue = vm[property]
    vm[property] = this.getOrSet(key, defaultValue)
    vm.$watch(property, val => {
      this.set(key, val)
    })
  }
}

export const settings = localStore

export const VueSettings = {
  install(Vue, options) {}
}
