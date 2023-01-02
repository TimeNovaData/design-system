import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUsuarioStore } from './usuarios.store'

const { URLS } = api.defaults

export const useUserStore = defineStore('userStore', () => {
  const user = ref([])
  const isLoading = ref(false)
  const usuarios = useUsuarioStore()
  const userProfile = ref({})

  const userFoto = computed(() => {
    const item = usuarios.usuariosFoto.filter((u) => u.id === user.value.id)[0]
    const foto = item?.foto
    return foto
  })

  async function getUser() {
    isLoading.value = true
    user.value = []

    const { data, error } = await useAxios(
      URLS.user + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setUser(data.value)
      // necessario pois a foto do user
      // esta em usersFoto
      // await usuarios.getUsuariosFoto()
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getProfile() {
    try {
      const { data } = await api.get(`${URLS.profile}${user.value.id}/`)
      setProfile(data.value)
      return data.value
    } catch (e) {
      return e
    }
  }

  function setUser(value) {
    user.value = value
  }

  function setProfile(value) {
    userProfile.value = value
  }
  function $reset() {
    user.value = []
  }

  return {
    $reset,
    getUser,
    getProfile,
    setUser,
    user,
    userFoto,
    userProfile,
  }
})
