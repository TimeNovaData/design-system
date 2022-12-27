// import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutKanban from 'src/layouts/LayoutKanban.vue'
import LayoutHome from 'src/layouts/LayoutHome.vue'
import LayoutTest from 'src/layouts/LayoutTest.vue'
import PageKanban from 'src/pages/Kanban/PageKanban.vue'
import PageLogin from 'src/pages/Login/PageLogin.vue'
import PageBlank from 'src/pages/Blank/PageBlank.vue'
import ConsumoHoras from 'src/pages/ConsumoHoras/ConsumoHoras.vue'
import PageKanbanList from 'src/pages/Kanban/PageKanbanList.vue'
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
    children: [
      {
        name: 'consumo_horas',
        path: 'consumo_horas',
        component: ConsumoHoras,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Horas Consumidas', name: 'consumo_horas' },
          ],
        },
      },
    ],
  },

  {
    path: '/login',
    name: 'login',
    component: PageLogin,
    // meta: { transition: 'slide-right' },
  },
  {
    path: '/kanban/:id',
    component: LayoutKanban,

    children: [
      {
        name: 'kanban_board',
        path: 'board',
        component: PageKanban,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Kanban', name: 'kanban_board' },
          ],
        },
      },
      {
        name: 'kanban_list',
        path: 'list',
        component: PageKanbanList,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Kanban', name: 'kanban_board' },
          ],
        },
      },
    ],
  },

  {
    path: '/testes',
    name: 'testes',
    component: LayoutTest,
  },

  { path: '/:pathMatch(.*)*', component: PageBlank },
]

export default routes
