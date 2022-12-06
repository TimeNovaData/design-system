import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutKanban from 'src/layouts/LayoutKanban.vue'
import LayoutHome from 'src/layouts/LayoutHome.vue'
import PageKanban from 'src/pages/Kanban/PageKanban.vue'
import PageLogin from 'src/pages/Login/PageLogin.vue'
import PageBlank from 'src/pages/Blank/PageBlank.vue'
const routes = [
  {
    path: '/design-system',
    component: DesignSystem,
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
  },
  {
    path: '/kanban/:id',
    component: LayoutKanban,

    children: [
      {
        name: 'kanban.board',
        path: 'board',
        component: PageKanban,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Kanban', name: 'kanban.board' },
          ],
        },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', component: PageBlank },
]

export default routes
