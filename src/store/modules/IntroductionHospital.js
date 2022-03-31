import {Axios} from '../../plugins/axios'
import modules from '../../modules'


const state = {}
const getters = {}
const mutations = {}
const actions = {
  getAllIntroductionHospitalList({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.IntroductionHospital.list}${payload.PageNumber}/${payload.PageSize}`)
      .then(response => {
        return response
      })
  },
  getSingleIntroductionHospitalDetail({state, commit}, payload) {
    return new Axios()
      .get(`${modules.apiList.IntroductionHospital.singleReportIntroductionHospitalDetails}`, payload)
      .then(response => {
        return response
      })
  },
  addSingleIntroductionHospital({state, commit}, payload) {
    return new Axios()
      .post(`${modules.apiList.IntroductionHospital.addSingleReportIntroductionHospital}`, payload)
      .then(response => {
        return response
      })
  },
  updateSingleIntroductionHospital({state, commit}, payload) {
    return new Axios()
      .put(`${modules.apiList.IntroductionHospital.updateSingleReportIntroductionHospital}${payload}`)
      .then(response => {
        return response
      })
  },
  deleteSingleIntroductionHospital({state, commit}, payload) {
    return new Axios()
      .delete(`${modules.apiList.IntroductionHospital.deleteSingleReportIntroductionHospital}${payload}`)
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
