const columns1 = [
  {
    name: 'titulo',
    field: (row) => row.titulo,
    label: 'Chamado',
    style: 'width: 100%',
    align: 'left',
    sortable: true,
  },
  {
    name: 'Solicitante',
    label: 'Solicitante',
    field: (row) => row.user_criacao.nome,
    align: 'left',
    sortable: true,
  },

  {
    name: 'Projeto',
    label: 'Projeto',
    field: (row) => row.projeto.nome,
    align: 'left',
    sortable: true,
  },
  {
    name: 'Previsto / Realizado',
    label: 'Previsto / Realizado',
    align: 'left',
  },
  {
    name: 'Tags',
    label: 'Tags',
    field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'left',
  },
]

export { columns1 }
