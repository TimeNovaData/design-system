const menuList = [
  {
    title: 'Home',
    nivel: 0,
    icon: 'sym_r_home',
    href: '/home',
  },
  {
    title: 'Financeiro',
    nivel: 0,
    icon: 'sym_r_credit_score',
    submenu: [
      {
        title: 'Calendário de Produção',
        nivel: 1,
        add: '/add',
        list: '/list',
      },
      {
        title: 'Produtos  nivel: 1',
        nivel: 1,
        submenu: [
          {
            title: 'Produtos nivel: 2',
            nivel: 2,
          },
          {
            title: 'Sub Produtos',
            nivel: 2,
          },
          {
            title: 'Insumo',
            nivel: 2,
          },
        ],
      },
      {
        title: 'Previsão de Consumo   nivel: 1,',
        nivel: 1,
        submenu: [
          {
            title: 'Previsão de Consumo  nivel: 2',
            nivel: 2,
          },
        ],
      },
      {
        title: 'NF de entrada',
        // link: 'https://www.google.com',
        nivel: 1,
        submenu: [
          {
            title: 'NF de entrada',
            // link: 'https://www.google.com',
            nivel: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Kanban',
    nivel: 0,
    icon: 'sym_r_space_dashboard',
    submenu: [
      {
        title: 'Calendário de Produção',
        nivel: 1,
        add: '/add',
        list: '/list',
      },
      {
        title: 'Produtos  nivel: 1',
        nivel: 1,
        submenu: [
          {
            title: 'Produtos nivel: 2',
            nivel: 2,
          },
          {
            title: 'Sub Produtos',
            nivel: 2,
          },
          {
            title: 'Insumo',
            nivel: 2,
          },
        ],
      },
      {
        title: 'Previsão de Consumo   nivel: 1,',
        nivel: 1,
        submenu: [
          {
            title: 'Previsão de Consumo  nivel: 2',
            nivel: 2,
          },
        ],
      },
      {
        title: 'NF de entrada',
        // link: 'https://www.google.com',
        nivel: 1,
        submenu: [
          {
            title: 'NF de entrada',
            // link: 'https://www.google.com',
            nivel: 2,
          },
        ],
      },
    ],
  },
]
export default menuList
