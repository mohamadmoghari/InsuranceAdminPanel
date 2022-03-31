import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllMeetingList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Meeting.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleMeetingDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.Meeting.singleMeetingDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleMeeting({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.Meeting.addSingleMeeting}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleMeeting({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.Meeting.updateSingleMeeting}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleMeeting({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.Meeting.deleteSingleMeeting}${payload}`)
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
