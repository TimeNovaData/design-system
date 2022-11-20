import DesignSystem from '../pages/DesignSystem/DesignSystem.vue'

const routes = [
  {
    path: '/',
    component: DesignSystem,
    // children: [
    //   { path: '', component: () => import('../pages/DesignSystem/SectionButton.vue') }
    // ]
  },
  {
    path: '/home',
    component: DesignSystem,
  },
  {
    path: '/list',
    component: DesignSystem,
  },
  {
    path: '/add',
    component: DesignSystem,
  },
]

export default routes
