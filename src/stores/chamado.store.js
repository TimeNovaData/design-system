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

    const { data, error /* isFinished */ } = await useAxios(
      URLS.fase,
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

  async function getChamado() {
    isLoading.value = true

    const { data, error /* isFinished */ } = await useAxios(
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
  }
})

const oi = {
  id: 7,
  projeto: {
    id: 3,
    codigo: null,
    nome: 'Projeto C',
    cliente: 2,
    escopo: '',
    logo: 'http://localhost:8000/media/logos_projetos/android-icon-192x192.png',
    cor: '#11D276',
    usuarios_com_acesso: [],
  },
  tag: [],
  titulo: 'teste aqui',
  descricao: 'teste aqui',
  descricao_chamado: null,
  prioridade: {
    id: 2,
    nome: 'Média',
    ordem: 20,
  },
  fase: {
    id: 1,
    ultima_atualizacao: '2021-07-05T13:12:14.126243Z',
    nome: 'Novo',
    ordem: 10,
    fase_conclusao: false,
  },
  area_atendimento: {
    id: 1,
    nome: 'a',
  },
  usuario_teste: null,
  senha_usuario_teste: null,
  link: null,
  anexo: null,
  data_prevista: null,
  data_desejada: null,
  tempo_estimado: '00:15:23',
  data_conclusao: null,
  aprovado: false,
  prazo_aprovacao: null,
  data_aprovacao: null,
  responsavel: null,
  data_criacao: '2021-07-05T10:12:14.126193-03:00',
  data_atualizacao: '2021-07-05T10:12:14.126243-03:00',
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
  ordem: 0,
  descricao_quill_html: '',
  tempo_total: '0.0',
  tempo_decorrido: '00:00:00',
  valor_total: 0,
}
