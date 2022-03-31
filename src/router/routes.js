import {asyncRequire} from './modules'

const Header = asyncRequire('includes/Header')
const RightSidebar = asyncRequire('includes/Sidebar/Sidebar')
const RightSidebarOverlay = asyncRequire('includes/Sidebar/SidebarOverlay')
const Footer = asyncRequire('includes/Footer')

//Main Component
const dashboard = asyncRequire('Dashboard/dashboard')
const Login = asyncRequire('User/Login');

//Master Component
const documentRegistration = asyncRequire('DocumentRegistration/DocumentRegistration');
const travel = asyncRequire('Travel/Travel');
const HospitalPayment = asyncRequire('HospitalPayment/HospitalPayment');
const PaymentValidation = asyncRequire('PaymentValidation/PaymentValidation')
const Archive = asyncRequire('Archive/Archive')
const AmalkardFani = asyncRequire('AmalkardFani/AmalkardFani')
const Paraclinic = asyncRequire('Paraclinic/Paraclinic')
const Meeting = asyncRequire('Meeting/Meeting')
const CarInsurance = asyncRequire('CarInsurance/Car')
const LifeInsurance = asyncRequire('LifeInsurance/Life')
const BimeShode = asyncRequire('BimeShode/BimeShode')
const ReportInsurance = asyncRequire('ReportInsurance/ReportInsurance')
const IntroductionHospital = asyncRequire('IntroductionHospital/IntroductionHospital')
const KarshenasiAsnad = asyncRequire('KarshenasiAsnad/Karshenasi')
const KhesaratVariz = asyncRequire('KhesaratVariz/KhesaratVariz')
const ParaclinicMorefi = asyncRequire('ParaclinicMorefi/ParaclinicMorefi')
const NatayejeNazarsanji = asyncRequire('NatayejeNazarsanji/NatayejeNazarsanji')
const ParvandePardakht = asyncRequire('ParvandePardekhteParaclinic/ParvandePardekhteParaclinic')
const PardakhtSanad = asyncRequire('PardakhtSanad/PardakhtSanad')
const Raftar = asyncRequire('Raftar/Raftar')
//other page
const NotFound = asyncRequire('pages/NotFound')

const getComponents = (def, header, rightSidebar, footer) => {
  let obj = {default: def}
  if (header !== false) obj.header = Header
  if (rightSidebar !== false) {
    obj['right-sidebar'] = RightSidebar
    obj['right-sidebar-o'] = RightSidebarOverlay
  }
  if (footer !== false) obj['footer'] = Footer
  return obj
}
//route use header and footer
const getRoute = (base, component, name, title, header, rightSidebar, footer) => {
  return {
    path: base,
    components: getComponents(component, header, rightSidebar, footer),
    name: name,
    meta: {
      pageTitle: title,
      base: base
    }
  }
}
//route dont use header and footer
const getSingleRoute = (base, component, name, title) => {
  return {
    path: base,
    component: component,
    name: name,
    meta: {
      pageTitle: title,
      base: base
    }
  }
}

//create path route
const routePath = {
  Login: '/login',
  Dashboard: '/',
  documentRegister: '/doc_register',
  travel: '/travel',
  archive: '/archive',
  hospitalPayment: '/hospital_payment',
  paymentValidation: '/payment_validation',
  technical_performance: '/technical_performance',
  paraclinic: '/paraclinic',
  meeting: '/meeting',
  carInsurance: '/car',
  lifeInsurance: '/life',
  bimeShode: '/bimeShode',
  reportInsurance: '/report_insurance',
  introductionHospital: '/introduction-hospital',
  karshenasiAsnad: '/karshenasi_asnad',
  KhesaratVariz: '/Khesarat_variz',
  paraclinicMorefi: '/paraclinic_morefi',
  natayejeNazarsanji: '/natayeje_nazarsanji',
  parvandePardekhteParaclinic: '/parvande_pardekhte_paraclinic',
  pardakhtSanad: '/pardakht_sanad',
  raftar: '/raftar',
  NotFount: '/*'
}

//هinstalation route
export const routes = [
  getSingleRoute(routePath.Login, Login, 'Login', 'ورود'),
  getRoute(routePath.Dashboard, dashboard, 'dashboard', 'داشبرد'),
  getRoute(routePath.documentRegister, documentRegistration, 'ثبت اسناد', 'ثبت اسناد'),
  getRoute(routePath.travel, travel, 'ثبت سفرها', 'ثبت سفرها'),
  getRoute(routePath.archive, Archive, 'بایگانی ها', 'بایگانی ها'),
  getRoute(routePath.hospitalPayment, HospitalPayment, 'پرونده بیمارستانی', 'پرونده بیمارستانی'),
  getRoute(routePath.paymentValidation, PaymentValidation, 'صحت سنجی', 'صحت سنجی'),
  getRoute(routePath.technical_performance, AmalkardFani, 'عملکرد فنی', 'عملکرد فنی'),
  getRoute(routePath.meeting, Meeting, 'جلسات برگزارشده', 'جلسات برگزارشده'),
  getRoute(routePath.paraclinic, Paraclinic, 'پاراکلینیک', 'پاراکلینیک'),
  getRoute(routePath.carInsurance, CarInsurance, 'بیمه خودرو', 'بیمه خودرو'),
  getRoute(routePath.lifeInsurance, LifeInsurance, 'بیمه عمر', 'بیمه عمر'),
  getRoute(routePath.bimeShode, BimeShode, 'بیمه', 'بیمه'),
  getRoute(routePath.reportInsurance, ReportInsurance, 'گزارش بیمه شده', 'گزارش بیمه شده'),
  getRoute(routePath.introductionHospital, IntroductionHospital, 'معرفی بیمارستان', 'معرفی بیمارستان'),
  getRoute(routePath.karshenasiAsnad, KarshenasiAsnad, 'کارشناسی اسناد', 'کارشناسی اسناد'),
  getRoute(routePath.KhesaratVariz, KhesaratVariz, 'خسارت واریز', 'خسارت واریز'),
  getRoute(routePath.paraclinicMorefi, ParaclinicMorefi, 'معرفی پاراکلینیک', 'معرفی پاراکلینیک'),
  getRoute(routePath.natayejeNazarsanji, NatayejeNazarsanji, 'نتایح نظرسنجی', 'نتایح نظرسنجی'),
  getRoute(routePath.parvandePardekhteParaclinic, ParvandePardakht, 'پرونده پرداخت پاراکلینیک', 'پرونده پرداخت پاراکلینیک'),
  getRoute(routePath.pardakhtSanad, PardakhtSanad, 'پرداخت سند', 'پرداخت سند'),
  getRoute(routePath.raftar, Raftar, 'رفتار', 'رفتار'),
  getSingleRoute(routePath.NotFount, NotFound, 'NotFound', '404')
]
