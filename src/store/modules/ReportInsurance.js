import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllCarReportInsuranceList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.ReportInsurance.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleCarReportInsuranceDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.ReportInsurance.singleReportInsuranceDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleCarReportInsurance({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.ReportInsurance.addSingleReportInsurance}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleCarReportInsurance({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.ReportInsurance.updateSingleReportInsurance}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleCarReportInsurance({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.ReportInsurance.deleteSingleReportInsurance}${payload}`)
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
