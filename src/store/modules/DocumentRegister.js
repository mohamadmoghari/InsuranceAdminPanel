import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  //get all document register list
  getAllDocumentRegisterList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.documentRegister.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  //add single document
  addSingleDocument({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.documentRegister.addSingleDocument}`, payload)
      .then(response => {
        return response
      })
  },
  // update single document
  updateSingleDocument({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.documentRegister.updateSingleDocument}`, payload)
      .then(response => {
        return response
      })
  },
  // delete single document
  deleteSingleDocument({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.documentRegister.deleteSingleDocument}${payload}`)
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
