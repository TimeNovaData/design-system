import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { NotifySucess, NotifyError } from 'src/boot/Notify'

const { URLS } = api.defaults

export const useAnexoStore = defineStore('anexoStore', () => {
  const anexos = ref([])
  const filaAnexos = ref([])

  const urlReq = () => ({
    projeto: {
      get: URLS.anexoprojeto + '?x=',
      delete: URLS.anexoprojeto,
    },
    task: {
      get: URLS.anexo + '?x=',
      delete: URLS.anexo,
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

  async function deleteAnexo(type, id) {
    console.log('deleteAnexo', { type, id })
    try {
      await api.delete(urlReq()[type].delete + id)

      NotifySucess('Anexo Removido com sucesso')
    } catch (err) {
      NotifyError('Erro ao Remover anexo')
      console.log(err)
    }
  }

  function setAnexos(value) {
    anexos.value = value
  }
  function setFilaAnexos(value) {
    filaAnexos.value = value
  }

  return {
    getAnexos,
    deleteAnexo,
    setAnexos,
    setFilaAnexos,
    anexos,
    filaAnexos,
  }
})
