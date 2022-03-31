import Vue from 'vue'
import Vuex from 'vuex'
import Global from "./modules/Global";
import DocumentRegister from "./modules/DocumentRegister";
import Travel from "./modules/Travel"
import HospitalPayment from "./modules/HospitalPayment";
import PaymentValidation from './modules/PaymentValidation'
import Archive from './modules/Archive'
import AcceptedDocument from './modules/AcceptedDocument'
import TechnicalPerformance from "./modules/TechnicalPerformance";
import Paraclinic from "./modules/Paraclinic";
import Meeting from "./modules/Meeting";
import CarInsurance from "./modules/CarInsurance";
import LifeInsurance from "./modules/LifeInsurance";
import BimeShode from "./modules/BimeShode";
import ReportInsurance from './modules/ReportInsurance'
import IntroductionHospital from './modules/IntroductionHospital'
import Karshenasi from './modules/Karshenasi'
import KhesaratVariz from './modules/KhesaratVariz'
import ParaclinicMorefi from './modules/ParaclinicMorefi'
import Moraje from './modules/Moraje'
import NarayejNazarsanji from './modules/NarayejNazarsanji'
import ParaclinicParvandePardakht from "./modules/ParaclinicParvandePardakht";
import PardakhtSanad from './modules/PardakhtSanad'
import Raftar from './modules/Raftar'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    loadingQueue: 0,
    loadingMessages: false,
    retry: {},
    userInfo: [],
    notificationSystem: {
      options: {
        success: {
          position: 'bottomRight',
          timeout: 8000
        },
        error: {
          position: 'bottomRight',
          timeout: 8000
        }
      }
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Global,
    DocumentRegister,
    Travel,
    HospitalPayment,
    PaymentValidation,
    Archive,
    AcceptedDocument,
    TechnicalPerformance,
    Paraclinic,
    Meeting,
    CarInsurance,
    LifeInsurance,
    BimeShode,
    ReportInsurance,
    IntroductionHospital,
    Karshenasi,
    KhesaratVariz,
    ParaclinicMorefi,
    Moraje,
    NarayejNazarsanji,
    ParaclinicParvandePardakht,
    PardakhtSanad,
    Raftar
  }
})
