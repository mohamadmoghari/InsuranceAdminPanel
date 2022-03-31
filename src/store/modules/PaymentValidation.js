import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllPaymentList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.PaymentValidation.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSinglePaymentDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.PaymentValidation.singlePaymentDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSinglePayment({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.PaymentValidation.addSinglePayment}`, payload)
      .then(response => {
        return response
      })
  },
  updateSinglePayment({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.PaymentValidation.updateSinglePayment}`, payload)
      .then(response => {
        return response
      })
  },
  deleteSinglePayment({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.PaymentValidation.deleteSinglePayment}${payload}`)
      .then(response => {
        return response
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
