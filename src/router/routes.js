import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutKanban from 'src/layouts/LayoutKanban.vue'
import PageKanban from 'src/pages/Kanban/PageKanban.vue'

const routes = [
  {
    path: '/design-system',
    component: DesignSystem,
  },

  {
    path: '/',
    redirect: '/kanban/1/board'
  },
  {
    path: '/kanban/:id',
    component: LayoutKanban,

    children: [
      {
        path: 'board',
        component: PageKanban,
      },
    ],
  },
]

export default routes
