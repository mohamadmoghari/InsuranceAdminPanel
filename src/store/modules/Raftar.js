import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  //get all document register list
  getAllRaftarList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Raftar.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleRaftarDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Raftar.singleRaftarDetails}`, payload)
      .then(response => {
        return response
      })
  },
  //add single document
  addSingleRaftar({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Raftar.addSingleRaftar}`, payload)
      .then(response => {
        return response
      })
  },
  // update single document
  updateSingleRaftar({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.Raftar.updateSingleRaftar}`, payload)
      .then(response => {
        return response
      })
  },
  // delete single document
  deleteSingleRaftar({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.Raftar.deleteSingleRaftar}${payload}`)
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
