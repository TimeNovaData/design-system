const dev = process.env.development

const menuList = [
  {
    title: 'Home',
    nivel: 0,
    icon: 'home',
    href: '/home',
  },
  {
    title: 'Kanban',
    nivel: 0,
    icon: 'view_kanban',
    href: '/kanban/',
  },

  {
    title: 'Horas Consumidas',
    nivel: 0,
    icon: 'timelapse',
    href: '/consumo_horas',
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
  menuList.push(
    {
      separator: true,
      title: 'a',
      type: 'dev',
    },
    {
      title: 'Design System',
      nivel: 0,
      icon: 'design_services',
      href: '/design-system',
      type: 'dev',
    },
    {
      title: "Svg's",
      nivel: 0,
      icon: 'auto_awesome_motion',
      href: '/svgs',
      type: 'dev',
    },
    {
      title: 'Testes',
      nivel: 0,
      icon: 'bug_report',
      href: '/testes',
      type: 'dev',
    },

    /* temporario */

    {
      title: 'Single Projeto',
      nivel: 0,
      icon: 'web',
      href: '/projeto',
    },
    {
      title: 'Single Colaborador',
      nivel: 0,
      icon: 'svguse:/icons.svg#icon_users',
      href: '/colaborador/1',
      userId: 0,
    }
  )

export default menuList
