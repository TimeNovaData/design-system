import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useProjetoStore = defineStore('projetoStore', () => {
  const projetos = ref([])
  const subProjetos = ref([])
  const isLoadingTempoProjeto = ref(false)

  const projeto = ref([])
  const tempoProjeto = ref([])

  async function getProjetos() {
    try {
      const { data } = await api.get(URLS.projeto + '?no_loading')
      const result = data.map((i) => {
        i.nome_completo = `${i.nome_cliente ? i.nome_cliente + ' ⠂' : ''}  ${
          i.nome || ''
        }`.trim()
        return i
      })

      setProjetos(result)
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function getSubProjetos() {
    try {
      const { data } = await api.get(URLS.subprojeto + '?no_loading')
      setSubProjetos(data)
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function getProjeto(id) {
    try {
      const { data } = await api.get(URLS.projeto + id)

      const result = data.map((i) => {
        i.nome_completo = `${i.nome_cliente ? i.nome_cliente + ' ⠂' : ''}  ${
          i.nome || ''
        }`.trim()
        return i
      })
      setProjeto(result)
      return result
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function getTempoProjeto(id, filters) {
    isLoadingTempoProjeto.value = true
    try {
      const { data } = await api.get(
        URLS.projeto + id + '/tempo_projeto/?x=' + filters
      )
      window._red('getTempoProjeto')
      console.log(data)
      setTempoProjeto(data)
      return data
    } catch (e) {
      console.log(e)
      return e
    } finally {
      isLoadingTempoProjeto.value = false
    }
  }

  function setProjetos(value) {
    projetos.value = value
  }

  function setProjeto(value) {
    projeto.value = value
  }

  function setSubProjetos(value) {
    subProjetos.value = value
  }
  function setTempoProjeto(value) {
    tempoProjeto.value = value
  }

  return {
    getProjetos,
    getSubProjetos,
    setProjetos,
    setSubProjetos,
    projetos,
    subProjetos,
    projeto,
    getProjeto,
    tempoProjeto,
    getTempoProjeto,
    isLoadingTempoProjeto,
  }
})
