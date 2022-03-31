import Modal from './Modal.vue'

export default {
  install: function(Vue, options) {
    Vue.directive('toggle-modal', {
      bind: function(el, binding) {
        el.addEventListener(
          'click',
          function() {
            try {
              window.modal[binding.value].toggle()
            } catch (er) {
              console.warn(`No modal found with id "${binding.value}"`)
              console.log(er)
            }
          },
          true
        )
      }
    })
    Vue.component('modal', Modal)
  }
}
