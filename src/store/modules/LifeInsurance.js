import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllCarInsuranceList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.LifeInsurance.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleCarInsuranceDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.LifeInsurance.singleCarInsuranceDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleCarInsurance({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.LifeInsurance.addSingleCarInsurance}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleCarInsurance({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.LifeInsurance.updateSingleCarInsurance}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleCarInsurance({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.LifeInsurance.deleteSingleCarInsurance}${payload}`)
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
