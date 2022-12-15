import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useProjetoStore = defineStore('projetoStore', () => {
  const projetos = ref([])
  const subProjetos = ref([])
  const isLoading = ref(false)

  const projetosOptions = computed(() =>
    projetos.value.map((i) => ({ label: i.nome, value: i.id }))
  )

  const subProjetoOptions = computed(() =>
    projetos.value.map((i) => ({ label: i.nome, value: i.id }))
  )
  const projetoAndSubProjetoOptions = computed(() =>
    subProjetoOptions.value.concat(projetosOptions.value)
  )

  function setProjetos(value) {
    projetos.value = value
  }

  function setSubProjetos(value) {
    subProjetos.value = value
  }

  async function getProjetos() {
    isLoading.value = true
    const { data, error } = await useAxios(URLS.projeto, { method: 'GET' }, api)

    try {
      setProjetos(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getSubProjetos() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.subprojeto,
      { method: 'GET' },
      api
    )

    try {
      setSubProjetos(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  return {
    getProjetos,
    getSubProjetos,
    setProjetos,
    setSubProjetos,
    projetos,
    subProjetos,
    projetosOptions,
    subProjetoOptions,
    projetoAndSubProjetoOptions,
  }
})
