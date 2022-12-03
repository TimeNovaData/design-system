import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutKanban from 'src/layouts/LayoutKanban.vue'
import PageKanban from 'src/pages/Kanban/PageKanban.vue'
import PageLogin from 'src/pages/Login/PageLogin.vue'

const routes = [
  {
    path: '/design-system',
    component: DesignSystem,
  },

  {
    path: '/',
    redirect: '/kanban/1/board',
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
      },
    ],
  },
]

export default routes
