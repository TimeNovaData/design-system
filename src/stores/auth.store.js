import { defineStore } from 'pinia'
import { api, API_URL } from 'src/boot/axios'
import router from 'src/router'
import { computed, onMounted, ref, watch } from 'vue'
import { Cookies, Notify } from 'quasar'

const tokenOpt = {
  secure: process.env.HTTPS_MODE,
  expires: '0m 30s',
  // path: '/',
}

const refreshTokenOpt = {
  secure: process.env.HTTPS_MODE,
}

export const useAuthStore = defineStore('auth', () => {
  const returnUrl = ref('/')
  const TOKEN = Cookies.get('NDT_TOKEN')
  const REFRESH_TOKEN = Cookies.get('NDT_REFRESH_TOKEN')

  const user = ref({
    access: TOKEN && TOKEN,
    refresh: REFRESH_TOKEN && REFRESH_TOKEN,
  })

  watch(
    () => user.value.access,
    () => {
      api.defaults.headers.Authorization = `Bearer ${user.value.access}`
      const TOKEN = user.value.access
      TOKEN && Cookies.set('NDT_TOKEN', TOKEN, tokenOpt)
    }
  )

  async function login(username, password) {
    try {
      const request = await api.post(`token/`, { password, username })
      user.value = request.data
      const TOKEN = user.value.access
      const REFRESH_TOKEN = user.value.refresh

      REFRESH_TOKEN &&
        Cookies.set('NDT_REFRESH_TOKEN', REFRESH_TOKEN, refreshTokenOpt)
      TOKEN && Cookies.set('NDT_TOKEN', TOKEN, tokenOpt)
      // router().push('/design-system')

      return true
    } catch (e) {
      Notify.create({
        message: `Usuario ou senha invalidos`,
        position: 'top-right',
        timeout: 1000,
        html: true,
      })
      return false
    }
  }

  async function refreshToken() {
    try {
      console.warn('Tentando atualizar o TOKEN')
      const { data } = await api.post(`token/refresh/`, {
        refresh: user.value.refresh,
      })
      user.value.access = data.access

      console.warn('TOKEN Atualizado com sucesso')
      return user.value.access
    } catch (e) {
      console.error('Erro ao atualizar o TOKEN')
      logout()
    }
  }

  async function logout() {
    user.value = {}
    Cookies.remove('NDT_REFRESH_TOKEN')
    Cookies.remove('NDT_TOKEN')
    setTimeout(() => window.location.reload(), 200)
  }

  return { user, returnUrl, login, logout, refreshToken }
})
// api.interceptors.response.use(response => {
//     return response;
// }, (err: AxiosError) => {
//     if (err.response.status === 401) {
//         if (err.response.data?.code === 'token.expired') {
//             const { 'nextauth.refreshToken': refreshToken } = parseCookies(ctx);
//             const originalConfig = err.config;
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 api.post('/user/refresh', { refreshToken }).then(response => {
//                     const { refreshToken, token } = response.data;

//                     setCookie(ctx, 'nextauth.token', token, {
//                         // maxAge: 60 * 60 * 24 * 30, //30 days;
//                         maxAge: 60 * 60,
//                         path: '/'
//                     })

//                     setCookie(ctx, 'nextauth.refreshToken', refreshToken, {
//                         // maxAge: 60 * 60 * 24 * 30, // 1 month
//                         maxAge: 60 * 60,
//                         path: '/'
//                     })

//                     api.defaults.headers['Authorization'] = `Bearer ${token}`;

//                     failedRequestQueue.forEach(request => request.onSuccess(token));
//                     failedRequestQueue = [];
//                 }).catch(err => {
//                     failedRequestQueue.forEach(request => request.onFailed(err));
//                     failedRequestQueue = [];
//                     if (process.browser) {
//                         signOut();
//                     }
//                 }).finally(() => {
//                     isRefreshing = false;
//                 })
//             }

//             return new Promise((resolve, reject) => {
//                 failedRequestQueue.push({
//                     onSuccess: (token) => {
//                         originalConfig.headers['Authorization'] = `Bearer ${token}`
//                         resolve(api(originalConfig));
//                     },
//                     onFailed: (err) => {
//                         reject(err);
//                     }
//                 })
//             })

//         } else {
//
//             if (process.browser) {
//                 signOut();
//             } else {
//                 return Promise.reject(new AuthTokenError())
//             }
//         }
//     }

//     return Promise.reject(err);
// })
