import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useProfileStore = defineStore('profileStore', () => {
  const profileActive = ref({
    id: 0,
    user: 0,
    data_nascimento: null,
    foto: '',
    nome: '',
    equipe: [],
    projetos: [],
  })

  const isLoading = ref(false)

  async function getProfile(id) {
    isLoading.value = true
    profileActive.value = {}

    const { data, error } = await useAxios(
      `${URLS.profile}${id}?no_loading'`,
      { method: 'GET' },
      api
    )

    try {
      setProfile(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setProfile(value) {
    profileActive.value = value
  }

  return {
    profileActive,
    isLoading,
    getProfile,
  }
})
