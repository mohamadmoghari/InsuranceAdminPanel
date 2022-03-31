import {Axios} from '../../plugins/axios'
import modules from '../../modules'

const state = {}
const getters = {}
const mutations = {}
const actions = {
  // Preview User Error Message
  PreviewUserErrorMessage({state, commit}, payload) {
    payload.errors.map(item => {
      payload.parent.$toast.error(
        item.field,
        'خطا',
        this.state.notificationSystem.options.error
      )
    })
  },
  //success message
  ShowSuccessToastMessageToUser({state, commit}, payload) {
    payload.parent.$toast.success(
      payload.message,
      payload.title,
      this.state.notificationSystem.options.success
    )
  },
  //error message
  ShowErrorToastMessageToUser({state, commit}, payload) {
    payload.parent.$toast.error(
      payload.message,
      payload.title,
      this.state.notificationSystem.options.error
    )
  },
  //get all travel list
  getAllTravelList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Global.travelList}`)
      .then(response => {
        return response
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
