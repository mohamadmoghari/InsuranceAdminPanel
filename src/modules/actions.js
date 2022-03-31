import modules from '../modules.js'

let actions = {
  getToken() {
    let token = modules.settings.get('token')
    return token
  },
  setToken(token) {
    modules.settings.set('token', token)
  },

  clearToken() {
    modules.settings.clear('token')
  },
}

export default actions
