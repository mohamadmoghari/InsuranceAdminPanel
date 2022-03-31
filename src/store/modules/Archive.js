import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllArchiveList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Baygani.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleArchiveDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Baygani.singleBayganiDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleArchive({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Baygani.addSingleBaygani}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleArchive({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.Baygani.updateSingleBaygani}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleArchive({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.Baygani.deleteSingleBaygani}${payload}`)
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
