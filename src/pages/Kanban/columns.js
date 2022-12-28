const columns1 = [
  {
    name: 'titulo',
    // field: (row) => row.titulo,
    label: 'Chamado',
    style: 'width: 100%',
    align: 'left',
    sortable: true,
  },
  {
    name: 'tags',
    label: 'Tags',
    // field: (row) => row.user_criacao.nome,
    align: 'left',
    sortable: false,
  },

  {
    name: 'tasks',
    label: 'Tarefas Concluídas',
    // field: (row) => row.projeto.nome,
    align: 'left',
    sortable: true,
  },
  {
    name: 'responsaveis',
    label: 'Responsáveis',
    align: 'left',
  },
  {
    name: 'solicitado',
    label: 'Solicitado',
    // field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'left',
  },

  {
    name: 'desejado',
    label: 'Desejado',
    // field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'left',
  },
]

export { columns1 }
