import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useUserStore = defineStore('userStore', () => {
  const user = ref([])
  const isLoading = ref(false)

  async function getUser() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.user + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setUser(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setUser(value) {
    user.value = value
  }

  return {
    getUser,
    setUser,
    user,
  }
})
