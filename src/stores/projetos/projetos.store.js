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
  const projetosLoading = ref(true)

  async function getProjetos() {
    projetosLoading.value = true

    try {
      const { data } = await api.get(URLS.projeto + '?no_loading')

      setProjetos(data)
      return data
    } catch (e) {
      console.log(e)
      return e
    } finally {
      projetosLoading.value = false
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

      setProjeto(data)
      return data
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

  async function getContatos(filtros) {
    try {
      const { data } = await api.get(URLS.contato + '?x=' + filtros)
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function getAcessos(filtros) {
    try {
      const { data } = await api.get(URLS.acessos + '?x=' + filtros)
      return data
    } catch (e) {
      console.log(e)
      return e
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
    getContatos,
    getAcessos,
  }
})
