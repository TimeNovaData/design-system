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

  async function getTempoProjeto(id) {
    try {
      const { data } = await api.get(URLS.projeto + id + '/tempo_projeto/')
      setTempoProjeto(data)
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
    tempoProjeto.value = [
      {
        item: '213 Sports',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 378,
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
        item: 'App Criteria',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 3086,
          },
          {
            data: '12/01/2023',
            duracao: 0,
          },
          {
            data: '13/01/2023',
            duracao: 3234,
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
            duracao: 13540,
          },
        ],
      },
      {
        item: 'App Marcelo bueno',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 6132,
          },
          {
            data: '10/01/2023',
            duracao: 2237,
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
            duracao: 1,
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
        item: 'Data Host',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 2948,
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
        item: 'Desenvolvimento de Sistema',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 42657,
          },
          {
            data: '10/01/2023',
            duracao: 56171,
          },
          {
            data: '11/01/2023',
            duracao: 15949,
          },
          {
            data: '12/01/2023',
            duracao: 41162,
          },
          {
            data: '13/01/2023',
            duracao: 6881,
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
            duracao: 49178,
          },
        ],
      },
      {
        item: 'Desenvolvimento Protótipo',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 16815,
          },
          {
            data: '12/01/2023',
            duracao: 15703,
          },
          {
            data: '13/01/2023',
            duracao: 20566,
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
        item: 'Dica Solar',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 12050,
          },
          {
            data: '10/01/2023',
            duracao: 5852,
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
        item: 'E2E Métricas',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 26075,
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
            duracao: 2407,
          },
        ],
      },
      {
        item: 'Fontes Odonto',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 951,
          },
          {
            data: '12/01/2023',
            duracao: 1905,
          },
          {
            data: '13/01/2023',
            duracao: 1247,
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
        item: 'Grana Pix',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 783,
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
            duracao: 15533,
          },
        ],
      },
      {
        item: 'Hotsite Latam',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 14312,
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
            duracao: 11079,
          },
        ],
      },
      {
        item: 'HTML Road',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 547,
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
        item: 'Hub Data',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 24976,
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
            duracao: 599,
          },
        ],
      },
      {
        item: 'Hub Road',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 28192,
          },
          {
            data: '10/01/2023',
            duracao: 16663,
          },
          {
            data: '11/01/2023',
            duracao: 5072,
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
            duracao: 1520,
          },
        ],
      },
      {
        item: 'Intranet Herbarium',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 35160,
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
            duracao: 9548,
          },
        ],
      },
      {
        item: 'Manutenção',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 992,
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
        item: 'Manutenção mundo do circo',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 3772,
          },
          {
            data: '11/01/2023',
            duracao: 0,
          },
          {
            data: '12/01/2023',
            duracao: 15248,
          },
          {
            data: '13/01/2023',
            duracao: 9755,
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
        item: 'Modulo TS',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 1244,
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
        item: 'Plataforma Investidor de Verdade',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 12286,
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
        item: 'Protótipo Sara Jóias',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 4034,
          },
          {
            data: '11/01/2023',
            duracao: 2239,
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
            duracao: 5024,
          },
        ],
      },
      {
        item: 'Segura treinamentos',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 4446,
          },
          {
            data: '10/01/2023',
            duracao: 5078,
          },
          {
            data: '11/01/2023',
            duracao: 12712,
          },
          {
            data: '12/01/2023',
            duracao: 3161,
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
        item: 'Sistema DAMF',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 2000,
          },
          {
            data: '10/01/2023',
            duracao: 0,
          },
          {
            data: '11/01/2023',
            duracao: 15540,
          },
          {
            data: '12/01/2023',
            duracao: 21532,
          },
          {
            data: '13/01/2023',
            duracao: 27591,
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
        item: 'Sistema Hardlink',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 8260,
          },
          {
            data: '10/01/2023',
            duracao: 5737,
          },
          {
            data: '11/01/2023',
            duracao: 0,
          },
          {
            data: '12/01/2023',
            duracao: 15205,
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
        item: 'Sistema VPS',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 17800,
          },
          {
            data: '13/01/2023',
            duracao: 9608,
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
            duracao: 492,
          },
        ],
      },
      {
        item: 'Site 8 oficio',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 8488,
          },
          {
            data: '12/01/2023',
            duracao: 0,
          },
          {
            data: '13/01/2023',
            duracao: 3116,
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
        item: 'Site Bahiense',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 16363,
          },
          {
            data: '11/01/2023',
            duracao: 16116,
          },
          {
            data: '12/01/2023',
            duracao: 1919,
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
        item: 'Site Duo Nove',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 2842,
          },
          {
            data: '10/01/2023',
            duracao: 8706,
          },
          {
            data: '11/01/2023',
            duracao: 3344,
          },
          {
            data: '12/01/2023',
            duracao: 11290,
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
            duracao: 6003,
          },
        ],
      },
      {
        item: 'site Eshopper',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 22966,
          },
          {
            data: '11/01/2023',
            duracao: 24526,
          },
          {
            data: '12/01/2023',
            duracao: 15264,
          },
          {
            data: '13/01/2023',
            duracao: 19642,
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
            duracao: 5130,
          },
        ],
      },
      {
        item: 'Site Institucional - V3A',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 3145,
          },
        ],
      },
      {
        item: 'site Mundo do Circo',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 1837,
          },
        ],
      },
      {
        item: 'Site Novo Espetto',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 2340,
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
        item: 'Site novo Local Power',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 2117,
          },
          {
            data: '12/01/2023',
            duracao: 1155,
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
        item: 'Site Outubro 2021',
        agrupamento: 'projeto',
        datas: [
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
            duracao: 8781,
          },
          {
            data: '13/01/2023',
            duracao: 17766,
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
            duracao: 12037,
          },
        ],
      },
      {
        item: 'site PECEP',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 13848,
          },
          {
            data: '10/01/2023',
            duracao: 25934,
          },
          {
            data: '11/01/2023',
            duracao: 20260,
          },
          {
            data: '12/01/2023',
            duracao: 20657,
          },
          {
            data: '13/01/2023',
            duracao: 8088,
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
        item: 'Site Pentágono',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 970,
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
        item: 'Squad Unifinance',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 1792,
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
            duracao: 14311,
          },
          {
            data: '13/01/2023',
            duracao: 1745,
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
            duracao: 8123,
          },
        ],
      },
      {
        item: 'Squad Wagtail',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 0,
          },
          {
            data: '10/01/2023',
            duracao: 4015,
          },
          {
            data: '11/01/2023',
            duracao: 1524,
          },
          {
            data: '12/01/2023',
            duracao: 0,
          },
          {
            data: '13/01/2023',
            duracao: 2864,
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
            duracao: 490,
          },
        ],
      },
      {
        item: 'Squad Wagtail - E2E Academy (Simulador)',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 24180,
          },
          {
            data: '10/01/2023',
            duracao: 23872,
          },
          {
            data: '11/01/2023',
            duracao: 6866,
          },
          {
            data: '12/01/2023',
            duracao: 0,
          },
          {
            data: '13/01/2023',
            duracao: 14696,
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
            duracao: 16310,
          },
        ],
      },
      {
        item: 'Squad Wagtail - Simulador (Assessment Coolers)',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 10833,
          },
          {
            data: '10/01/2023',
            duracao: 26861,
          },
          {
            data: '11/01/2023',
            duracao: 43046,
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
        item: 'Startup Stryn',
        agrupamento: 'projeto',
        datas: [
          {
            data: '09/01/2023',
            duracao: 25833,
          },
          {
            data: '10/01/2023',
            duracao: 22541,
          },
          {
            data: '11/01/2023',
            duracao: 14350,
          },
          {
            data: '12/01/2023',
            duracao: 12592,
          },
          {
            data: '13/01/2023',
            duracao: 7900,
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
            duracao: 22960,
          },
        ],
      },
    ]
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
