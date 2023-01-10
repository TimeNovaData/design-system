// import DesignSystem from 'src/pages/DesignSystem/DesignSystem.vue'
import LayoutKanban from 'src/layouts/LayoutKanban.vue'
import LayoutHome from 'src/layouts/LayoutHome.vue'
import LayoutTest from 'src/layouts/LayoutTest.vue'
import PageKanban from 'src/pages/Kanban/PageKanban.vue'
import PageLogin from 'src/pages/Login/PageLogin.vue'
import PageBlank from 'src/pages/Blank/PageBlank.vue'
import ConsumoHoras from 'src/pages/ConsumoHoras/ConsumoHoras.vue'
import PageKanbanList from 'src/pages/Kanban/PageKanbanList.vue'
import PageHome from 'src/pages/Home/PageHome.vue'
import PageSvgs from 'src/pages/svg/PageSvgs.vue'
import PageSingleProjeto from 'src/pages/SingleProjeto/PageSingleProjeto.vue'
import PageSingleUsuario from 'src/pages/SingleUsuario/PageSingleUsuario.vue'

const routes = [
  {
    path: '/design-system',
    component: () => import('src/pages/DesignSystem/DesignSystem.vue'),
  },

  {
    path: '/',
    component: LayoutHome,
    redirect: { name: 'home' },

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
      {
        name: 'home',
        path: '/home',
        component: PageHome,
        meta: {
          breadcrumbs: [{ label: 'Home', name: 'home' }],
        },
      },
      {
        name: 'svgs',
        path: '/svgs',
        component: PageSvgs,
        meta: {
          breadcrumbs: [{ label: 'Svgs', name: 'svgs' }],
        },
      },
      {
        name: 'projeto',
        path: '/projeto',
        redirect: '/projeto/0',
      },

      {
        name: 'singleProjeto',
        path: '/projeto/:id',
        component: PageSingleProjeto,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Single Projeto', name: 'projeto' },
          ],
        },
      },
      {
        path: '/colaborador/:id',
        name: 'colaborador',
        component: PageSingleUsuario,
        meta: {
          breadcrumbs: [{ label: 'Home', name: 'Single Usuário' }],
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
    path: '/kanban/',
    component: LayoutKanban,
    redirect: { name: 'kanban_board' },
    name: 'kanban',

    children: [
      {
        name: 'kanban_board',
        path: 'board',
        component: PageKanban,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Kanban', name: 'kanban' },
          ],
          tab: 'board',
        },
      },

      {
        name: 'kanban_list',
        path: 'list',
        component: PageKanban,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Kanban', name: 'kanban' },
          ],
          tab: 'list',
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
