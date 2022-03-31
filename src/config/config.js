import menu from './menu'
import {api} from './api'


export default {
  title: 'سامانه خدمات بیمه طلاب',
  pageTitle: 'مدیریت بیمه | ',
  noneToken: ['dashboard'],
  includeKeepAliveRouters: ['Login', 'register'],
  api,
  menu: menu
}
