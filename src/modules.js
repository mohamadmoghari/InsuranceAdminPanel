import {enums} from './modules/enum'
import config from './config/config'
import api from './config/api'
import {settings} from './modules/settings'
import apiList from './config/apiList'
import actions from './modules/actions'
import {user} from './modules/user'


const modules = {
  enums,
  config,
  api,
  settings,
  apiList,
  actions,
  $user: user,
}

export default modules
