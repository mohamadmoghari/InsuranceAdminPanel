import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  //get all document register list
  getAllPardakhtSanadList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.PardakhtSanad.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSinglePardakhtSanadDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.PardakhtSanad.singlePardakhtSanadDetails}`, payload)
      .then(response => {
        return response
      })
  },
  //add single document
  addSinglePardakhtSanad({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.PardakhtSanad.addSinglePardakhtSanad}`, payload)
      .then(response => {
        return response
      })
  },
  // update single document
  updateSinglePardakhtSanad({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.PardakhtSanad.updateSinglePardakhtSanad}`, payload)
      .then(response => {
        return response
      })
  },
  // delete single document
  deleteSinglePardakhtSanad({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.PardakhtSanad.deleteSinglePardakhtSanad}${payload}`)
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
