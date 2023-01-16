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
      setProjetos(data)
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
      setTempoProjeto([
        {
          item: 'Andrei Muniz',
          agrupamento: 'usuario',
          datas: [
            {
              data: '17/12/2022',
              duracao: 0,
            },
            {
              data: '18/12/2022',
              duracao: 0,
            },
            {
              data: '19/12/2022',
              duracao: 0,
            },
            {
              data: '20/12/2022',
              duracao: 0,
            },
            {
              data: '21/12/2022',
              duracao: 0,
            },
            {
              data: '22/12/2022',
              duracao: 0,
            },
            {
              data: '23/12/2022',
              duracao: 0,
            },
            {
              data: '24/12/2022',
              duracao: 0,
            },
            {
              data: '25/12/2022',
              duracao: 0,
            },
            {
              data: '26/12/2022',
              duracao: 0,
            },
            {
              data: '27/12/2022',
              duracao: 0,
            },
            {
              data: '28/12/2022',
              duracao: 0,
            },
            {
              data: '29/12/2022',
              duracao: 0,
            },
            {
              data: '30/12/2022',
              duracao: 0,
            },
            {
              data: '31/12/2022',
              duracao: 0,
            },
            {
              data: '01/01/2023',
              duracao: 0,
            },
            {
              data: '02/01/2023',
              duracao: 0,
            },
            {
              data: '03/01/2023',
              duracao: 0,
            },
            {
              data: '04/01/2023',
              duracao: 0,
            },
            {
              data: '05/01/2023',
              duracao: 0,
            },
            {
              data: '06/01/2023',
              duracao: 0,
            },
            {
              data: '07/01/2023',
              duracao: 0,
            },
            {
              data: '08/01/2023',
              duracao: 0,
            },
            {
              data: '09/01/2023',
              duracao: 0,
            },
            {
              data: '10/01/2023',
              duracao: 0,
            },
            {
              data: '11/01/2023',
              duracao: 24724,
            },
            {
              data: '12/01/2023',
              duracao: 8315,
            },
            {
              data: '13/01/2023',
              duracao: 3010,
            },
            {
              data: '14/01/2023',
              duracao: 0,
            },
            {
              data: '15/01/2023',
              duracao: 0,
            },
            {
              data: '16/01/2023',
              duracao: 0,
            },
          ],
        },
        {
          item: 'Edson Junior',
          agrupamento: 'usuario',
          datas: [
            {
              data: '17/12/2022',
              duracao: 0,
            },
            {
              data: '18/12/2022',
              duracao: 0,
            },
            {
              data: '19/12/2022',
              duracao: 0,
            },
            {
              data: '20/12/2022',
              duracao: 0,
            },
            {
              data: '21/12/2022',
              duracao: 0,
            },
            {
              data: '22/12/2022',
              duracao: 0,
            },
            {
              data: '23/12/2022',
              duracao: 0,
            },
            {
              data: '24/12/2022',
              duracao: 0,
            },
            {
              data: '25/12/2022',
              duracao: 0,
            },
            {
              data: '26/12/2022',
              duracao: 0,
            },
            {
              data: '27/12/2022',
              duracao: 0,
            },
            {
              data: '28/12/2022',
              duracao: 0,
            },
            {
              data: '29/12/2022',
              duracao: 0,
            },
            {
              data: '30/12/2022',
              duracao: 0,
            },
            {
              data: '31/12/2022',
              duracao: 0,
            },
            {
              data: '01/01/2023',
              duracao: 0,
            },
            {
              data: '02/01/2023',
              duracao: 0,
            },
            {
              data: '03/01/2023',
              duracao: 0,
            },
            {
              data: '04/01/2023',
              duracao: 0,
            },
            {
              data: '05/01/2023',
              duracao: 0,
            },
            {
              data: '06/01/2023',
              duracao: 0,
            },
            {
              data: '07/01/2023',
              duracao: 0,
            },
            {
              data: '08/01/2023',
              duracao: 0,
            },
            {
              data: '09/01/2023',
              duracao: 0,
            },
            {
              data: '10/01/2023',
              duracao: 0,
            },
            {
              data: '11/01/2023',
              duracao: 0,
            },
            {
              data: '12/01/2023',
              duracao: 0,
            },
            {
              data: '13/01/2023',
              duracao: 1488,
            },
            {
              data: '14/01/2023',
              duracao: 0,
            },
            {
              data: '15/01/2023',
              duracao: 0,
            },
            {
              data: '16/01/2023',
              duracao: 1599,
            },
          ],
        },
        {
          item: 'Priscila Martins',
          agrupamento: 'usuario',
          datas: [
            {
              data: '17/12/2022',
              duracao: 0,
            },
            {
              data: '18/12/2022',
              duracao: 0,
            },
            {
              data: '19/12/2022',
              duracao: 0,
            },
            {
              data: '20/12/2022',
              duracao: 0,
            },
            {
              data: '21/12/2022',
              duracao: 0,
            },
            {
              data: '22/12/2022',
              duracao: 0,
            },
            {
              data: '23/12/2022',
              duracao: 0,
            },
            {
              data: '24/12/2022',
              duracao: 0,
            },
            {
              data: '25/12/2022',
              duracao: 0,
            },
            {
              data: '26/12/2022',
              duracao: 0,
            },
            {
              data: '27/12/2022',
              duracao: 0,
            },
            {
              data: '28/12/2022',
              duracao: 0,
            },
            {
              data: '29/12/2022',
              duracao: 0,
            },
            {
              data: '30/12/2022',
              duracao: 0,
            },
            {
              data: '31/12/2022',
              duracao: 0,
            },
            {
              data: '01/01/2023',
              duracao: 0,
            },
            {
              data: '02/01/2023',
              duracao: 0,
            },
            {
              data: '03/01/2023',
              duracao: 25635,
            },
            {
              data: '04/01/2023',
              duracao: 18175,
            },
            {
              data: '05/01/2023',
              duracao: 19713,
            },
            {
              data: '06/01/2023',
              duracao: 0,
            },
            {
              data: '07/01/2023',
              duracao: 0,
            },
            {
              data: '08/01/2023',
              duracao: 0,
            },
            {
              data: '09/01/2023',
              duracao: 0,
            },
            {
              data: '10/01/2023',
              duracao: 0,
            },
            {
              data: '11/01/2023',
              duracao: 0,
            },
            {
              data: '12/01/2023',
              duracao: 0,
            },
            {
              data: '13/01/2023',
              duracao: 0,
            },
            {
              data: '14/01/2023',
              duracao: 0,
            },
            {
              data: '15/01/2023',
              duracao: 0,
            },
            {
              data: '16/01/2023',
              duracao: 0,
            },
          ],
        },
        {
          item: 'Marlon Victor',
          agrupamento: 'usuario',
          datas: [
            {
              data: '17/12/2022',
              duracao: 0,
            },
            {
              data: '18/12/2022',
              duracao: 0,
            },
            {
              data: '19/12/2022',
              duracao: 0,
            },
            {
              data: '20/12/2022',
              duracao: 0,
            },
            {
              data: '21/12/2022',
              duracao: 0,
            },
            {
              data: '22/12/2022',
              duracao: 0,
            },
            {
              data: '23/12/2022',
              duracao: 0,
            },
            {
              data: '24/12/2022',
              duracao: 0,
            },
            {
              data: '25/12/2022',
              duracao: 0,
            },
            {
              data: '26/12/2022',
              duracao: 0,
            },
            {
              data: '27/12/2022',
              duracao: 0,
            },
            {
              data: '28/12/2022',
              duracao: 0,
            },
            {
              data: '29/12/2022',
              duracao: 0,
            },
            {
              data: '30/12/2022',
              duracao: 0,
            },
            {
              data: '31/12/2022',
              duracao: 0,
            },
            {
              data: '01/01/2023',
              duracao: 0,
            },
            {
              data: '02/01/2023',
              duracao: 0,
            },
            {
              data: '03/01/2023',
              duracao: 0,
            },
            {
              data: '04/01/2023',
              duracao: 0,
            },
            {
              data: '05/01/2023',
              duracao: 0,
            },
            {
              data: '06/01/2023',
              duracao: 0,
            },
            {
              data: '07/01/2023',
              duracao: 0,
            },
            {
              data: '08/01/2023',
              duracao: 0,
            },
            {
              data: '09/01/2023',
              duracao: 0,
            },
            {
              data: '10/01/2023',
              duracao: 0,
            },
            {
              data: '11/01/2023',
              duracao: 0,
            },
            {
              data: '12/01/2023',
              duracao: 0,
            },
            {
              data: '13/01/2023',
              duracao: 24037,
            },
            {
              data: '14/01/2023',
              duracao: 0,
            },
            {
              data: '15/01/2023',
              duracao: 0,
            },
            {
              data: '16/01/2023',
              duracao: 0,
            },
          ],
        },
        {
          item: 'Joel Junior',
          agrupamento: 'usuario',
          datas: [
            {
              data: '17/12/2022',
              duracao: 0,
            },
            {
              data: '18/12/2022',
              duracao: 0,
            },
            {
              data: '19/12/2022',
              duracao: 0,
            },
            {
              data: '20/12/2022',
              duracao: 0,
            },
            {
              data: '21/12/2022',
              duracao: 0,
            },
            {
              data: '22/12/2022',
              duracao: 0,
            },
            {
              data: '23/12/2022',
              duracao: 0,
            },
            {
              data: '24/12/2022',
              duracao: 0,
            },
            {
              data: '25/12/2022',
              duracao: 0,
            },
            {
              data: '26/12/2022',
              duracao: 0,
            },
            {
              data: '27/12/2022',
              duracao: 0,
            },
            {
              data: '28/12/2022',
              duracao: 0,
            },
            {
              data: '29/12/2022',
              duracao: 0,
            },
            {
              data: '30/12/2022',
              duracao: 0,
            },
            {
              data: '31/12/2022',
              duracao: 0,
            },
            {
              data: '01/01/2023',
              duracao: 0,
            },
            {
              data: '02/01/2023',
              duracao: 0,
            },
            {
              data: '03/01/2023',
              duracao: 0,
            },
            {
              data: '04/01/2023',
              duracao: 0,
            },
            {
              data: '05/01/2023',
              duracao: 18144,
            },
            {
              data: '06/01/2023',
              duracao: 0,
            },
            {
              data: '07/01/2023',
              duracao: 0,
            },
            {
              data: '08/01/2023',
              duracao: 0,
            },
            {
              data: '09/01/2023',
              duracao: 0,
            },
            {
              data: '10/01/2023',
              duracao: 0,
            },
            {
              data: '11/01/2023',
              duracao: 0,
            },
            {
              data: '12/01/2023',
              duracao: 0,
            },
            {
              data: '13/01/2023',
              duracao: 6624,
            },
            {
              data: '14/01/2023',
              duracao: 0,
            },
            {
              data: '15/01/2023',
              duracao: 0,
            },
            {
              data: '16/01/2023',
              duracao: 7948,
            },
          ],
        },
      ])
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
