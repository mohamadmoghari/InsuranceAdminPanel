import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllKarshnasiList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Karshnasi.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleKarshnasiDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Karshnasi.singleReportKarshnasiDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleKarshnasi({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Karshnasi.addSingleReportKarshnasi}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleKarshnasi({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.Karshnasi.updateSingleKarshnasi}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleKarshnasi({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.Karshnasi.deleteSingleKarshnasi}${payload}`)
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
