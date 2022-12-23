const dev = process.env.development

const menuList = [
  {
    title: 'Home',
    nivel: 0,
    icon: 'home',
    href: '/',
  },

  // {
  //   title: 'Financeiro',
  //   nivel: 0,
  //   icon: 'credit_score',
  //   submenu: [
  //     {
  //       title: 'Calendário de Produção',
  //       nivel: 1,
  //       add: '#',
  //       list: '#',
  //     },
  //     {
  //       title: 'Produtos  nivel: 1',
  //       nivel: 1,
  //       submenu: [
  //         {
  //           title: 'Produtos nivel: 2',
  //           nivel: 2,
  //         },
  //         {
  //           title: 'Sub Produtos',
  //           nivel: 2,
  //         },
  //         {
  //           title: 'Insumo',
  //           nivel: 2,
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Previsão de Consumo   nivel: 1,',
  //       nivel: 1,
  //       submenu: [
  //         {
  //           title: 'Previsão de Consumo  nivel: 2',
  //           nivel: 2,
  //         },
  //       ],
  //     },
  //     {
  //       title: 'NF de entrada',
  //       // link: 'https://www.google.com',
  //       nivel: 1,
  //       submenu: [
  //         {
  //           title: 'NF de entrada',
  //           // link: 'https://www.google.com',
  //           nivel: 2,
  //         },
  //       ],
  //     },
  //   ],
  // },
]

if (dev)
  menuList.push({
    title: 'Design System',
    nivel: 0,
    icon: 'design_services',
    href: '/design-system',
  })

export default menuList
