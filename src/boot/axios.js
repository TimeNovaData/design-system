import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth.store'
import emitter from 'src/boot/emitter'
import { Cookies } from 'quasar'
const { API_URL } = process.env
const TOKEN = Cookies.get('NDT_TOKEN')

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
})
api.interceptors.request.use(
  function (request) {
    emitter.emit('loader', 'start')
    return request
  },
  function () {
    emitter.emit('loader', 'stop')
  }
)
api.interceptors.response.use(
  function (response) {
    emitter.emit('loader', 'stop')
    return response
  },
  async function (error) {
    const authStore = useAuthStore()
    emitter.emit('loader', 'stop')
    async function getToken() {
      if (error.response.status === 403) {
        console.warn(`TOKEN INVALIDO ou VAZIO ${error}`)
        emitter.emit('loader', 'start')
        const refresh = await authStore.refreshToken()
        error.config.headers.Authorization = `Bearer ${authStore.user.access}`
        console.log(authStore.user)
        const request = await axios.request(error.config)
        emitter.emit('loader', 'stop')

        return request
      }
    }
    return await getToken()
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = api
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  app.config.globalProperties.$API_URL = API_URL
  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, API_URL }
