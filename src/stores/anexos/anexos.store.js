import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useAnexoStore = defineStore('anexoStore', () => {
  const isLoading = ref(false)
  const anexos = ref([])

  async function getAnexos(filtro = '') {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.anexo + filtro,
      { method: 'GET' },
      api
    )

    try {
      setAnexos(data.value)
      // console.warn('store:', data.value)

      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setAnexos(value) {
    anexos.value = value
  }

  return {
    getAnexos,
    setAnexos,
    anexos,
  }
})
