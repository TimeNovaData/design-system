import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth.store'
import { useBlurMode } from 'src/stores/blurMode'
import emitter from 'src/boot/emitter'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath

    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    emitter.emit('loader', 'stop')
    // redirect to login page if not logged in and trying to access a restricted page
    const auth = useAuthStore()
    const blur = useBlurMode()
    const publicPages = ['/login']
    const paginasObrigatorias = !publicPages.includes(to.path)
    const haveRefresh = auth.user.refresh
    const haveToken = auth.user.access

    blur.isKanban = ['kanban_board', 'kanban_list'].find((i) => i === to.name)

    if (paginasObrigatorias && !haveRefresh && !haveToken) {
      next({ path: '/login' })
    } else if (to.fullPath === '/login' && haveRefresh) {
      next({ path: '/' })
    } else {
      next()
    }
  })

  return Router
})
