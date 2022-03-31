import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllProvince({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Travel.getAllCityList}`)
      .then(response => {
        return response
      })
  },
  getAllTravelList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Travel.list}/${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleTravelDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Travel.singleTravelDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleTravel({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Travel.singleTravelDetails}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleTravel({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Travel.updateSingleTravel}${payload}` )
      .then(response => {
        return response
      })
  },
  deleteSingleTravel({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.Travel.deleteSingleTravel}${payload}`)
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
