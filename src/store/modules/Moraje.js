import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  //get all document register list
  getAllMorajeList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.MorajeieHozori.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleMorajeDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.MorajeieHozori.singleReportKMorajeieHozoriDetails}`, payload)
      .then(response => {
        return response
      })
  },
  //add single document
  addSingleMoraje({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.MorajeieHozori.addSingleReportMorajeieHozori}`, payload)
      .then(response => {
        return response
      })
  },
  // update single document
  updateSingleMoraje({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.MorajeieHozori.updateSingleMorajeieHozori}`, payload)
      .then(response => {
        return response
      })
  },
  // delete single document
  deleteSingleMoraje({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.MorajeieHozori.deleteSingleMorajeieHozori}${payload}`)
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
