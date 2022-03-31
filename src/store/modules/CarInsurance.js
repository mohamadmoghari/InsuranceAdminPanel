import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllCarInsuranceList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.CarInsurance.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleCarInsuranceDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.CarInsurance.singleCarInsuranceDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleCarInsurance({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.CarInsurance.addSingleCarInsurance}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleCarInsurance({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.CarInsurance.updateSingleCarInsurance}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleCarInsurance({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.CarInsurance.deleteSingleCarInsurance}${payload}`)
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
