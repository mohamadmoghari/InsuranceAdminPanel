import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllParaclinicList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Paraclinic.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleParaclinicDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Paraclinic.singleParaclinicDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleParaclinic({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Paraclinic.addSingleParaclinic}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleParaclinic({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.Paraclinic.updateSingleParaclinic}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleParaclinic({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.Paraclinic.deleteSingleParaclinic}${payload}`)
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
