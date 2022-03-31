import './assets/sass/_bootstrap.scss'
import './assets/sass/style.scss'
import './modules/utils'
import 'core-js'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import {moment} from './modules/moment'
import './modules/helper'

Vue.prototype.$moment = moment
Vue.prototype.$parents = function (parentName) {
  parentName = parentName.toLowerCase()
  let parent = this
  const pName = function (vm) {
    if (vm && vm.$options && vm.$options.name) {
      return vm.$options.name.toLowerCase()
    } else {
      return ''
    }
  }
  while (parent && pName(parent) !== parentName) {
    parent = parent.$parent
  }
  return parent
}
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

Vue.use(clone(VuePersianDatetimePicker), {
  name: 'date-picker',
  props: {
    format: 'YYYY-MM-DDTHH:mm',
    altFormat: 'YYYY-MM-DDTHH:mm',
    displayFormat: 'jDD jMMMM jYYYY',
    //color: '#0d83dd',
    autoSubmit: true
  }
})
Vue.use(clone(VuePersianDatetimePicker), {
  name: 'time-picker',
  props: {
    type: 'time',
    format: 'HH:mm',
    altFormat: 'HH:mm',
    displayFormat: 'HH:mm',
    color: '#0d83dd'
  }
})

/**********************************************
 * router and vue router
 *********************************************/
import {router, VueRouter} from './router/router'
Vue.use(VueRouter)

/**********************************************
 * helpers and tools
 *********************************************/
import Loader from "./components/helper/Loader";
import BSelect from './components/helper/BSelect.vue'
import Pagination from './components/helper/Pagination.vue'
import Province from "./components/tools/Province";
import Travel from "./components/tools/Travel";
Vue.component('loader',Loader)
Vue.component('BSelect', BSelect)
Vue.component('Pagination', Pagination)
Vue.component('Province',Province)
Vue.component('Travel',Travel)
/**********************************************
 * plugins
 *********************************************/
import Modal from './plugins/modal'
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.css'
Vue.use(Modal)
Vue.use(VueIziToast)
/**********************************************
 * Store
 *********************************************/
import {store} from './store/store'
import VueStore from './store/vueStore'
import modules from './modules'

Vue.use(VueStore, modules)

/**********************************************
 * Vue Validate
 *********************************************/
import VeeValidate from 'vee-validate'
import {validatorOptions} from './modules/validator'

Vue.use(VeeValidate, validatorOptions)
/**********************************************
 * Vue Filters
 *********************************************/
import filters from './modules/vueFilters'

Vue.filter('date', filters.date)
Vue.filter('time', filters.time)
/**********************************************
 * Vue Directives
 *********************************************/

/**********************************************
 * Vue Mixins
 *********************************************/

/*********************************************
 * THE APP
 *********************************************/
Vue.config.productionTip = false
Vue.config.warnHandler = () => {
}
window.APP = new Vue({
  el: '#app',
  router,
  store,
  components: {},
  directives: {},
  render: h => h(App)
})
