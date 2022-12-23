// import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutHome from 'src/layouts/LayoutHome.vue'
import PageLogin from 'src/pages/Login/PageLogin.vue'
import PageBlank from 'src/pages/Blank/PageBlank.vue'

const routes = [
  {
    path: '/design-system',
    component: () => import('src/pages/DesignSystem/DesignSystem.vue'),
  },

  {
    name: 'home',
    path: '/',
    component: LayoutHome,
    meta: {
      breadcrumbs: [{ label: 'Home', name: 'home' }],
    },
  },

  {
    path: '/login',
    name: 'login',
    component: PageLogin,
    // meta: { transition: 'slide-right' },
  },

  { path: '/:pathMatch(.*)*', component: PageBlank },
]

export default routes
