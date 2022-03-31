import VueRouter from 'vue-router'
import {routes} from './routes'
import modules from "@/modules";

const router = new VueRouter({
  linkExactActiveClass: 'is-active',
  routes: routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return {selector: to.hash}
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  let token = modules.actions.getToken()

  // if (!token && modules.config.noneToken.includes(to.name)) {
  //   return next(router.push('/login'))
  // }


  next()
})

export {router, VueRouter}
