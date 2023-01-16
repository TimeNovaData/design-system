import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUsuarioStore } from './usuarios.store'

const { URLS } = api.defaults

export const useUserStore = defineStore('userStore', () => {
  const user = ref()
  const isLoading = ref(false)
  const usuarios = useUsuarioStore()
  const userProfile = ref({})

  const userFoto = computed(() => {
    const item = usuarios.usuarios.filter((u) => u?.id === user.value?.id)[0]
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
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getProfile() {
    const id = user.value?.id
    if (!id) return
    try {
      const { data, error } = await useAxios(
        `${URLS.profile}?user__id=${id}&no_loading`,
        { method: 'GET' },
        api
      )

      userProfile.value = data.value[0]
      return data.value
    } catch (e) {
      console.log(e)
      return e
    }
  }

  function setUser(value) {
    user.value = value
  }

  async function setProfile(value) {
    userProfile.value = value
    const id = userProfile.value.id
    if (!id) return
    try {
      api.patch(`${URLS.profile}${id}/?no_loading`, userProfile.value)
    } catch (e) {
      console.log(e)
    }
  }

  function $reset() {
    user.value = {}
  }

  return {
    $reset,
    getUser,
    getProfile,
    setUser,
    setProfile,
    user,
    userFoto,
    userProfile,
  }
})
