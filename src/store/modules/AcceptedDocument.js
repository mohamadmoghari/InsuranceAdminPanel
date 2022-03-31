import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllAcceptedDocumentList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.PzireshAsnad.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleAcceptedDocumentDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.PzireshAsnad.singleTravelDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleAcceptedDocument({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.PzireshAsnad.singleTravelDetails}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleAcceptedDocument({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.PzireshAsnad.updateSingleTravel}`, payload)
      .then(response => {
        return response
      })
  },
  deleteSingleAcceptedDocument({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.PzireshAsnad.deleteSingleTravel}${payload}`)
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
