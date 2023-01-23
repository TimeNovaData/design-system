import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

const { URLS } = api.defaults

export const useAnexoStore = defineStore('anexoStore', () => {
  const anexos = ref([])

  const urlReq = () => ({
    projeto: {
      get: URLS.anexoprojeto + '?x=',
    },
    task: {
      get: URLS.anexo + '?x=',
    },
  })

  async function getAnexos(filtros = '', set = true, type) {
    try {
      const { data } = await api.get(urlReq()[type].get + filtros)
      set && setAnexos(data.value)
      return data
    } catch (e) {
      console.log(e)
      return e
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
