import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllParaclinicMorefiList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.ParaclinicMorefi.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleParaclinicMorefiDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.ParaclinicMorefi.singleReportKParaclinicMorefiDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleParaclinicMorefi({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.ParaclinicMorefi.addSingleReportParaclinicMorefi}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleParaclinicMorefi({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.ParaclinicMorefi.updateSingleParaclinicMorefi}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleParaclinicMorefi({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.ParaclinicMorefi.deleteSingleParaclinicMorefi}${payload}`)
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
