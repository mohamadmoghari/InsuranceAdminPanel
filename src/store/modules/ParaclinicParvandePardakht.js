import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllParaclinicParvandePardakhtList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.ParaclinicParvandePardakht.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleParaclinicParvandePardakhtDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.ParaclinicParvandePardakht.singleParaclinicParvandePardakhtDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleParaclinicParvandePardakht({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.ParaclinicParvandePardakht.addSingleParaclinicParvandePardakht}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleParaclinicParvandePardakht({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.ParaclinicParvandePardakht.updateSingleParaclinicParvandePardakht}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleParaclinicParvandePardakht({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.ParaclinicParvandePardakht.deleteSingleParaclinicParvandePardakht}${payload}`)
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
