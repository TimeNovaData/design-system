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
import { nextTick } from 'vue'
import { useMeta } from 'quasar'
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
    console.log(to)
    emitter.emit('loader', 'stop')
    // redirect to login page if not logged in and trying to access a restricted page
    const auth = useAuthStore()
    const blur = useBlurMode()
    const publicPages = ['/login']
    const paginasObrigatorias = !publicPages.includes(to.path)
    const haveRefresh = auth.user.refresh
    const haveToken = auth.user.access

    blur.pageWithBlur = ['kanban_board', 'kanban_list'].find(
      (i) => i === to.name
    )

    if (paginasObrigatorias && !haveRefresh && !haveToken) {
      next({ path: '/login' })
    } else if (to.fullPath === '/login' && haveRefresh) {
      next({ path: '/' })
    } else {
      next()
    }
  })

  Router.afterEach(async (to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    await nextTick()
    // document.title = to.meta.title || DEFAULT_TITLE;

    const metaData = {
      // sets document title
      title: 'HUB',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title) => `${title} - ${to.meta.title}`,
    }

    useMeta(metaData)
  })

  return Router
})
