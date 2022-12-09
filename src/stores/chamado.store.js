import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useChamadoStore = defineStore('chamadoStore', () => {
  // const chamados = ref(false)
  // const fase = ref(false)
  const isLoading = ref(false)

  async function getFase() {
    isLoading.value = true

    const { data, error } = await useAxios(URLS.fase, { method: 'GET' }, api)

    try {
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getChamado() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.chamado + '?concluidos=False',
      { method: 'GET' },
      api
    )

    try {
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getTags() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.tagchamado,
      { method: 'GET' },
      api
    )

    try {
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function createChamado(fase) {
    isLoading.value = true

    const { data, error, execute } = await useAxios(
      URLS.chamado,
      { method: 'POST' },
      api
    )

    execute({ params: { key: 1 } })

    try {
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  return {
    /*  chamados, fase, */
    getFase,
    getChamado,
    createChamado,
    getTags,
  }
})

const oi = {
  id: 41,
  projeto: {
    id: 15,
    codigo: null,
    nome: '#aquipneus#',
    cliente: null,
    escopo: 'teste',
    logo: 'http://localhost:8000/media/logos_projetos/download-2-icon.png',
    cor: '#11D276',
    usuarios_com_acesso: [2, 6, 10],
  },
  tag: [
    { id: 1, nome: 'Tag talk', cor_letra: '#1406D2', cor_fundo: '#FCFE98' },
    { id: 3, nome: 'tag tu', cor_letra: '#D2821B', cor_fundo: '#F6FEFA' },
    { id: 6, nome: 'sdfds', cor_letra: '#8f0000', cor_fundo: '#F6FEFA' },
  ],
  titulo: 'teste 1',
  descricao: '',
  descricao_chamado: null,
  prioridade: null,
  fase: {
    id: 1,
    ultima_atualizacao: '2021-07-05T13:12:14.126243Z',
    nome: 'Novo',
    ordem: 10,
    fase_conclusao: false,
  },
  area_atendimento: null,
  usuario_teste: null,
  senha_usuario_teste: null,
  link: null,
  anexo: null,
  data_prevista: null,
  data_desejada: null,
  tempo_estimado: '00:00:00',
  data_conclusao: null,
  aprovado: false,
  prazo_aprovacao: null,
  data_aprovacao: null,
  responsavel: {
    id: 2,
    password:
      'pbkdf2_sha256$260000$cmoUIN364AYpSRyE0MF0fD$Wzt5v6I6F0ns/NP5XRIO9JjZw4DxzU9TBYw1CDis30w=',
    last_login: '2022-12-05T09:34:12.898720-03:00',
    is_superuser: true,
    username: 'emanuel2',
    first_name: 'emanuel',
    last_name: 'morais',
    email: 'emanuelbruno2018vasc@gmail.com',
    is_staff: true,
    is_active: true,
    date_joined: '2021-05-06T13:03:42-03:00',
    groups: [],
    user_permissions: [],
  },
  data_criacao: '2022-03-11T17:11:26.685797-03:00',
  data_atualizacao: '2022-03-11T17:11:26.685872-03:00',
  usuario_criacao: {
    id: 2,
    password:
      'pbkdf2_sha256$260000$cmoUIN364AYpSRyE0MF0fD$Wzt5v6I6F0ns/NP5XRIO9JjZw4DxzU9TBYw1CDis30w=',
    last_login: '2022-12-05T09:34:12.898720-03:00',
    is_superuser: true,
    username: 'emanuel2',
    first_name: 'emanuel',
    last_name: 'morais',
    email: 'emanuelbruno2018vasc@gmail.com',
    is_staff: true,
    is_active: true,
    date_joined: '2021-05-06T13:03:42-03:00',
    groups: [],
    user_permissions: [],
  },
  usuario_atualizacao: {
    id: 2,
    password:
      'pbkdf2_sha256$260000$cmoUIN364AYpSRyE0MF0fD$Wzt5v6I6F0ns/NP5XRIO9JjZw4DxzU9TBYw1CDis30w=',
    last_login: '2022-12-05T09:34:12.898720-03:00',
    is_superuser: true,
    username: 'emanuel2',
    first_name: 'emanuel',
    last_name: 'morais',
    email: 'emanuelbruno2018vasc@gmail.com',
    is_staff: true,
    is_active: true,
    date_joined: '2021-05-06T13:03:42-03:00',
    groups: [],
    user_permissions: [],
  },
  arquivado: false,
  sub_projeto: null,
  coluna_sub_projeto: null,
  ordem: 1,
  descricao_quill_html: '<p>dqdqwdq</p>',
  tempo_total: '0.0',
  tempo_decorrido: '00:00:00',
  valor_total: 0,
}
