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
    name: 'tag',
    label: 'Tag',
    // field: (row) => row.tag,
    align: 'left',
    sortable: false,
  },

  {
    name: 'projeto',
    label: 'Projeto/Subprojeto',
    field: (row) => row.projeto.nome,
    align: 'left',
    sortable: true,
  },

  {
    name: 'quantidade_tasks',
    label: 'Tarefas Concluídas',
    field: (row) => row.quantidade_tasks,
    align: 'left',
    sortable: true,
  },
  {
    name: 'responsaveis',
    label: 'Responsáveis',
    field: (row) => row.responsaveis.map((i) => i.nome).join(','),
    align: 'left',
    sortable: false,
  },
  {
    name: 'solicitado',
    label: 'Solicitado',
    field: (row) => row.data_criacao,
    sortable: true,
    align: 'right',
  },

  {
    name: 'desejado',
    label: 'Desejado',
    // field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'right',
  },
  {
    name: 'previsto',
    label: 'Previsto',
    // field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'right',
  },
  {
    name: 'orçado',
    label: 'Orçado',
    // field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'right',
  },
  {
    name: 'decorrido',
    label: 'Decorrido',
    // field: (row) => row.tag.map((i) => i.nome).join(', '),
    sortable: true,
    align: 'right',
  },
]

export { columns1 }

const oi = {
  id: 90,
  projeto: {
    id: 15,
    nome: '#aquipneus#',
    logo: 'http://localhost:8000/media/logos_projetos/download-2-icon.png',
    cor: '#B9D22D',
    usuarios_com_acesso: [2, 6, 10],
    tem_subprojetos: false,
  },
  tag: [],
  titulo: 'Titulo do chamado',
  descricao: null,
  descricao_chamado: null,
  prioridade: null,
  fase: {
    id: 1,
    ultima_atualizacao: '2021-07-05T13:12:14.126243Z',
    nome: 'Novo',
    ordem: 10,
    fase_conclusao: false,
  },
  link: null,
  anexo: null,
  data_prevista: null,
  data_desejada: null,
  tempo_estimado: '00:00:00',
  data_conclusao: null,
  aprovado: false,
  prazo_aprovacao: null,
  data_aprovacao: null,
  responsaveis: [
    {
      id: 10,
      nome: '',
      foto: 'http://localhost:8000https://www.gravatar.com/avatar/64875629a18083c086c8af05a275d632/?s=100',
    },
  ],
  data_criacao: '2022-12-26T00:46:48.545319-03:00',
  data_atualizacao: '2022-12-26T00:46:48.545344-03:00',
  user_criacao: {
    id: 2,
    nome: 'emanuel morais',
    foto: 'http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg',
  },
  arquivado: false,
  sub_projeto: null,
  coluna_sub_projeto: null,
  ordem: 1,
  descricao_quill_html: '',
  tempo_total: '0.0',
  tempo_decorrido: '00:00:00',
  quantidade_tasks: 0,
  quantidade_tasks_concluidas: 0,
  quantidade_tasks_pendentes: 0,
}