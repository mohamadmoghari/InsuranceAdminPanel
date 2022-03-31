import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllKhesaratVarizList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.NatayejNazarSanji.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleKhesaratVarizDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.NatayejNazarSanji.singleReportKNatayejNazarSanjiDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleKhesaratVariz({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.NatayejNazarSanji.addSingleReportNatayejNazarSanji}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleKhesaratVariz({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.NatayejNazarSanji.updateSingleNatayejNazarSanji}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleKhesaratVariz({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.NatayejNazarSanji.deleteSingleNatayejNazarSanji}${payload}`)
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
