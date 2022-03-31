import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllHospitalPaymentList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.HospitalPayment.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleHospitalPaymentDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.HospitalPayment.singleTravelDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleHospitalPayment({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.HospitalPayment.singleTravelDetails}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleHospitalPayment({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.HospitalPayment.updateSingleTravel}`, payload)
      .then(response => {
        return response
      })
  },
  deleteSingleHospitalPayment({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.HospitalPayment.deleteSingleTravel}${payload}`)
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
