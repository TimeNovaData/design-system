const columnsChamado = [
  {
    name: 'chamado',
    field: (row) => row.titulo || row.user_criacao.nome,
    label: 'Chamado',
    align: 'left',
    sortable: true,
  },
  {
    name: 'data_criacao',
    field: 'data_criacao',
    label: 'Data de Criação ',
    align: 'right',
    sortable: true,
  },
  {
    name: 'data_desejada',
    field: 'data_desejada',
    label: 'Data Desejada',
    align: 'right',
    sortable: true,
  },
  {
    name: 'data_atualizacao',
    field: 'data_atualizacao',
    label: 'Última Atualização',
    align: 'right',
    sortable: true,
  },

  {
    name: 'anexo',
    field: 'anexo',
    label: 'Anexos',
    align: 'left',
    sortable: true,
  },
]

const columnsTask = [
  {
    name: 'titulo',
    field: (row) => row.titulo || row.user_criacao.get_full_name,
    label: 'Task',
    align: 'left',
    sortable: true,
  },
  {
    name: 'responsavel_task',
    field: (row) => row.responsavel_task.get_full_name,
    label: 'Responsável',
    align: 'left',
    sortable: true,
  },
  {
    name: 'chamado',
    field: (row) => row.chamado.titulo,
    label: 'Chamado',
    align: 'left',
    sortable: true,
  },
  {
    name: 'data_criacao',
    field: 'data_criacao',
    label: 'Data Criação',
    align: 'right',
    sortable: true,
  },

  {
    name: 'data_desejada',
    field: 'data_desejada',
    label: 'Data Desejada',
    align: 'right',
    sortable: true,
  },

  {
    name: 'data_prevista',
    field: 'data_prevista',
    label: 'Data Prevista',
    align: 'right',
    sortable: true,
  },

  {
    name: 'tempo_decorrido',
    field: 'tempo_decorrido',
    label: 'Tempo Decorrido',
    align: 'right',
    sortable: true,
  },
]

export { columnsChamado, columnsTask }
