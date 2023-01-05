import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useProjetoStore = defineStore('projetoStore', () => {
  const projetos = ref([])
  const subProjetos = ref([])

  const projeto = ref([])
  const tempoProjeto = ref([])
  // const projetoAndSubProjetoOptions = computed(() =>
  //   subProjetos.value.concat(projetos.value)
  // )

  async function getProjetos() {
    const { data, error } = await useAxios(
      URLS.projeto + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setProjetos(data.value)
      return data.value
    } catch (e) {
      return error
    }
  }

  async function getSubProjetos() {
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
    }
  }

  async function getProjeto(id) {
    const { data, error } = await useAxios(
      URLS.projeto + id,
      { method: 'GET' },
      api
    )

    try {
      setProjeto(data.value)
      return data.value
    } catch (e) {
      return error
    }
  }

  async function getTempoProjeto(id) {
    const { data, error } = await useAxios(
      URLS.projeto + id + '/tempo_projeto/',
      { method: 'GET' },
      api
    )

    try {
      // setTempoProjeto(data.value)
      // prettier-ignore
      setTempoProjeto({0:{cargo:null,"06/12/2022":{duracao:9387},"07/12/2022":{duracao:0},"08/12/2022":{duracao:0},"09/12/2022":{duracao:0},"10/12/2022":{duracao:0},"11/12/2022":{duracao:0},"12/12/2022":{duracao:0},"13/12/2022":{duracao:0},"14/12/2022":{duracao:0},"15/12/2022":{duracao:20823},"16/12/2022":{duracao:570},"17/12/2022":{duracao:0},"18/12/2022":{duracao:0},"19/12/2022":{duracao:0},"20/12/2022":{duracao:0},"21/12/2022":{duracao:2432},"22/12/2022":{duracao:0},"23/12/2022":{duracao:0},"24/12/2022":{duracao:0},"25/12/2022":{duracao:0},"26/12/2022":{duracao:0},"27/12/2022":{duracao:2373},"28/12/2022":{duracao:0},"29/12/2022":{duracao:0},"30/12/2022":{duracao:0},"31/12/2022":{duracao:0},"01/01/2023":{duracao:0},"02/01/2023":{duracao:5764},"03/01/2023":{duracao:12490},"04/01/2023":{duracao:10852},"05/01/2023":{duracao:0}}});
      return data.value
    } catch (e) {
      return error
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
  }
})
