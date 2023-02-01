import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth.store'
import { Cookies } from 'quasar'
import { useRouter } from 'vue-router'

const API_URL = process.env.API_URL
const TOKEN = Cookies.get('NDT_TOKEN')
const axiosController = new AbortController()

const api = axios.create({
  baseURL: API_URL,

  signal: axiosController.signal,

  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },

  URLS: {
    projeto: 'projeto/',
    cliente: 'cliente/',
    chamado: 'chamado/',
    fase: 'fase/',
    prioridade: 'prioridade/',
    registrochamado: 'registrochamado/',
    areaatendimento: 'areaatendimento/',
    task: 'task/',
    atualizar_ordem_task: 'task/atualizar_ordem_task/',
    tempotask: 'tempotask/',
    tempoProjeto: 'tempotask/tempo_projeto',
    andamento_periodo: 'tempotask/andamento_periodo',
    tipotask: 'tipotask/',
    anexo: 'anexo/',
    comentario: 'comentario/',
    comentarioprojeto: 'comentarioprojeto/',
    colunakanban: 'colunakanban/',
    usuario: 'usuario/',
    user: 'usuario/usuario_logado/',
    fotoUsuario: 'usuario/foto_usuario/',
    anexochamado: 'anexochamado/',
    anexoprojeto: 'anexosprojeto/',
    tagchamado: 'tagchamado/',
    subprojeto: 'subprojeto/',
    colunasubprojeto: 'colunasubprojeto/',
    atualizar_fase_chamado: 'url_atualizar_fase_chamado/',
    atualizar_ordem_chamado: 'chamado/atualizar_ordem_chamado/',
    logAlteracoesChamado: 'logalteracoeschamado/',
    profile: 'profile/',
    visao_geral_big_numbers: '/projeto/visao_geral_big_numbers/',
    contato: 'contato/',
    acessos: 'acessos/',
    tipoetapa: 'tipoetapa/',
    ferramenta: 'ferramenta/',
    avatar: 'avatar/',
  },
})

async function getToken(error) {
  const authStore = useAuthStore()

  if (error.response.status === 403) {
    console.warn(`TOKEN INVALIDO ou VAZIO ${error}`)
    await authStore.refreshToken()
    error.config.headers.Authorization = `Bearer ${authStore.user.access}`
    return await axios.request(error.config)
  } else {
    throw new Error(error)
  }
}

api.interceptors.response.use(undefined, async (error) => await getToken(error))

axios.interceptors.response.use(undefined, async (error) => {
  if (window.location.pathname.includes('login')) return error
  else return await getToken(error)
})

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    window._url_method = config.method
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api
  app.config.globalProperties.$api = api
  app.config.globalProperties.$API_URL = API_URL
})

export { api, API_URL, axiosController }
