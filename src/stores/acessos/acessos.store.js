import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

const { URLS } = api.defaults

export const useAcessoStore = defineStore('acessoStore', () => {
  const acessos = ref([])

  async function getAcessos(filtro = '') {
    try {
      const { data } = await api.get(URLS.anexo + '?x=' + filtro)
      setAcessos(data)
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  function setAcessos(value) {
    acessos.value = value
  }

  return {
    getAcessos,
    setAcessos,
    acessos,
  }
})
