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
import PageVisaoGeral from 'src/pages/VisaoGeral/PageVisaoGeral.vue'
import PageCalendar from 'src/pages/Calendar/PageCalendar.vue'

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
        name: 'home',
        path: '/home',
        component: PageHome,
        meta: {
          breadcrumbs: [{ label: 'Home', name: 'home' }],
          title: 'Home',
        },
      },

      {
        name: 'consumo_horas',
        path: 'consumo_horas',
        component: ConsumoHoras,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Alocação de MDO', name: 'consumo_horas' },
          ],
          title: 'Alocação de MDO',
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
            { label: 'Projeto', name: 'projeto' },
          ],
          title: 'Projeto',
          bruno: 'a',
        },
      },
      {
        path: '/colaborador/:id',
        name: 'colaborador',
        component: PageSingleUsuario,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Colaborador', name: 'colaborador' },
          ],
          title: 'Colaborador',
        },
      },
      {
        name: 'visao_geral',
        path: '/visao_geral',
        component: PageVisaoGeral,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Painel de Projetos', name: 'visao_geral' },
          ],
          title: 'Painel de Projetos',
        },
      },
      {
        name: 'agenda',
        path: '/agenda',
        component: PageCalendar,
        meta: {
          breadcrumbs: [
            { label: 'Home', name: 'home' },
            { label: 'Agenda', name: 'agenda' },
          ],
          title: 'Agenda',
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
            { label: 'Chamados', name: 'chamados' },
          ],
          title: 'Chamados - Quadro',

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
            { label: 'Chamados', name: 'chamados' },
          ],

          title: 'Chamados - Lista',
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

  { path: '/:pathMatch(.*)*', name: '404', component: PageBlank },
]

export default routes
