import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllBimeShodeList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.BimeShode.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleBimeShodeDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.BimeShode.singleBimeShodeDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleBimeShode({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.BimeShode.addSingleBimeShode}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleBimeShode({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.BimeShode.updateSingleBimeShode}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleBimeShode({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.BimeShode.deleteSingleBimeShode}${payload}`)
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
