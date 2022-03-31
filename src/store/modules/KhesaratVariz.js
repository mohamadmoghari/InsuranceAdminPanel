import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllKhesaratVarizList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.KhesaratVariz.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleKhesaratVarizDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.KhesaratVariz.singleReportKhesaratVarizDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleKhesaratVariz({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.KhesaratVariz.addSingleReportKhesaratVariz}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleKhesaratVariz({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.KhesaratVariz.updateSingleKhesaratVariz}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleKhesaratVariz({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.KhesaratVariz.deleteSingleKhesaratVariz}${payload}`)
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
