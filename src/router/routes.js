import DesignSystem from '../pages/DesignSystem/DesignSystem.vue'
import LayoutKanban from '../layouts/LayoutKanban.vue'
import PageKanban from '../pages/Kanban/PageKanban.vue'

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
        name:'kanban',
        path: 'board',
        component: PageKanban,
      },
    ],
  },
]

export default routes
