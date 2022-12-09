import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth.store'
import { Cookies } from 'quasar'

const API_URL = process.env.API_URL
const TOKEN = Cookies.get('NDT_TOKEN')

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ TOKEN }`,
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
    tempotask: 'tempotask/',
    tipotask: 'tipotask/',
    anexo: 'anexo/',
    comentario: 'comentario/',
    colunakanban: 'colunakanban/',
    usuario: 'usuario/',
    anexochamado: 'anexochamado/',
    tagchamado: 'tagchamado/',
    subprojeto: 'subprojeto/',
    colunasubprojeto: 'colunasubprojeto/',
    atualizar_fase_chamado: 'url_atualizar_fase_chamado/',
    atualizar_ordem_chamado: 'atualizar_ordem_chamado_ajax/',
  },
})

api.interceptors.response.use(undefined, async function(error) {
  const authStore = useAuthStore()

  async function getToken() {
    if ( error.response.status === 403 ) {
      console.warn(`TOKEN INVALIDO ou VAZIO ${ error }`)

      const refresh = await authStore.refreshToken()

      error.config.headers.Authorization = `Bearer ${ authStore.user.access }`

      return await axios.request(error.config)
    }
  }

  return await getToken()
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api
  app.config.globalProperties.$api = api
  app.config.globalProperties.$API_URL = API_URL
})

export { api, API_URL }
