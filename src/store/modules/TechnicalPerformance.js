import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllTechnicalPerformanceList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.TechnicalPerformance.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleTechnicalPerformanceDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.TechnicalPerformance.singleTechnicalPerformanceDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleTechnicalPerformance({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.TechnicalPerformance.addSingleTechnicalPerformance}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleTechnicalPerformance({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.TechnicalPerformance.updateSingleTechnicalPerformance}`, payload)
      .then(response => {
        return response
      })
  },
  deleteSingleTechnicalPerformance({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.TechnicalPerformance.deleteSingleTechnicalPerformance}${payload}`)
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
