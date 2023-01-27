const dev = process.env.development

const menuList = [
  {
    title: 'Home',
    nivel: 0,
    icon: 'home',
    href: '/home',
  },

  {
    title: 'Colaborador',
    nivel: 0,
    icon: 'emoji_people',
    href: '/colaborador/user',
    permissions: 'staff',
  },
  {
    title: 'Chamados',
    nivel: 0,
    icon: 'view_kanban',
    href: '/kanban/',
  },

  {
    title: 'Alocação de MDO',
    nivel: 0,
    icon: 'timelapse',
    href: '/consumo_horas',
  },
  {
    title: 'Painel de Projetos',
    nivel: 0,
    icon: 'monitor_heart',
    href: '/visao_geral',
  },

  {
    title: 'Projeto',
    nivel: 0,
    icon: 'web',
    href: '/projeto',
    permissions: 'staff',
  },
  {
    title: 'Teste de cache',
    nivel: 0,
    icon: 'web',
    href: '/projeto',
    permissions: 'staff',
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
    }

    /* temporario */
  )

export default menuList
