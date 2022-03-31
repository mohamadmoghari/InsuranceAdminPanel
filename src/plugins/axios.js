import {settings} from '../modules/settings'
import {api} from '../config/api'
import {message} from './messages'
import axiosInstance from 'axios'

const CancelToken = axiosInstance.CancelToken

const Axios = function (vm) {
  const options = {
    $vm: vm,
    $vvm: undefined,
    $loader: true,
    $showError: true,
    $authCheck: true,
    $validate: false,
    $scope: undefined,
    $loadingKey: 'loading',
    $mainLoading: false,
    $retry: false
  }

  const loading = val => {
    if (
      options.$loader &&
      options.$vm &&
      typeof options.$vm[options.$loadingKey] === 'boolean'
    ) {
      options.$vm[options.$loadingKey] = val
    }
    if (options.$mainLoading) {
      // store.commit('updateLoading', val)
    }
  }

  const Axios = axiosInstance.create({
    baseURL: api.baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  Axios.interceptors.request.use(
    async function (config) {
      const token = settings.get('token')

      let op = config.data || {}

      if (op.$data) config.data = op.$data

      if (['get'].indexOf(config.method) !== -1) op = config

      for (let k in options) if (op.hasOwnProperty(k)) options[k] = op[k]

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }

      if (options.$validate || options.$scope || options.$vvm) {
        let vm = options.$vvm || options.$vm
        let valid = await vm.$validator.validateAll(options.$scope)
        if (!valid)
          return {
            ...config,
            cancelToken: new CancelToken(cancel =>
              cancel('لطفا  همه ی گزینه ها را کامل کنید')
            )
          }
      }

      loading(true)
      return config
    },
    function (error) {
      loading(false)
      return Promise.reject(error)
    }
  )

  Axios.interceptors.response.use(
    function (response) {
      loading(false)
      let data = response.data
      // let data = response.data.data || response.data
      // if (typeof data === 'number' || typeof data === 'string') return data
      return data
      //return camelKeys(data)
    },

    function (error) {
      // let message  = error.message;
      // let response = error.response;
      // let request  = error.request;
      // let config   = error.config;
      let data

      try {
        data = error.response.data
      } catch (er) {
        data = {}
      }

      if (error.response === undefined) error.response = {}

      const response = {
        status: 400,
        statusText: '',
        ...error.response
      }

      if (response.status === 401 || response.statusText === 'Unauthorized') {
        message.error('نام کاربری و رمزعبور صحیح نمی باشد.')
        settings.clear('token')
        options.$showError = false
      }

      let errorMessage =
        data.error ||
        data.message ||
        error.response.statusText ||
        error.message ||
        'لطفا دوباره تلاش کنید!'

      if (options.$validate) {
        try {
          let vm = options.$vm
          let errors = []
          if (data.errors) {
            for (let k in data.errors) errors = errors.concat(data.errors[k])
          }
          if (vm.errorList === undefined) {
            if (!errors.length) errors.push(errorMessage)
            errors.forEach(er => {
              message.add({
                type: 'danger',
                text: er,
                t: 30000,
                replace: er
              })
            })
          } else {
            vm.errorList = errors
            if (data.error) message.error(errorMessage)
          }
        } catch (e) {
          message.error(errorMessage)
        }
      } else if (options.$showError) {
        message.error(errorMessage)
      }

      // @todo:
      // here we will setup the retry popup

      if (options.$retry) {
      }

      loading(false)
      return Promise.reject(error)
    }
  )

  Axios.bind = vueInstance => {
    options.$vm = vueInstance
    return Axios
  }

  Axios.setConfig = newConfig => {
    for (let k in newConfig) {
      options[k] = newConfig[k]
    }
    return Axios
  }

  Axios.validate = (vm, scope) => {
    options.$validate = true
    options.$scope = scope
    options.$vvm = vm
    return Axios
  }

  return Axios
}

const ex = new Axios()
export {Axios, ex as axios}

export default {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      axios: {
        get() {
          return Axios(this)
        }
      }
    })
  }
}
