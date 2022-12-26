import { api } from 'src/boot/axios'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import axios from 'axios'
import GLOBAL from 'src/utils/GLOBAL'
import { Notify } from 'quasar'
import { useManualRefHistory } from '@vueuse/core'
import { useChamadoStore } from 'src/stores/chamados/chamados.store'
// import { useTagStore } from 'src/stores/tags/state'
import { useFaseStore } from 'src/stores/fases/fases.store'

const BACKEND_URL = process.env.BACKEND_URL
const { URLS } = api.defaults
const { ordenateKey, getItemPerID } = GLOBAL

// converte lista de array de objectos de cards e colunas
// en lista somente de cards
function convertInOnlyCardsOrCol(arr, type = 'cards') {
  return arr.reduce((acc, item) => {
    acc.push(...item[type])
    return acc
  }, [])
}

export default function useKanban() {
  const colunasWithCards = ref([])
  const cardAlterado = ref({ id: null })
  const drag = ref(false)
  // Stores
  const { getChamado } = useChamadoStore()
  const { getFases } = useFaseStore()
  // const { getTags } = useTagStore()

  const { history, commit, clear } = useManualRefHistory(colunasWithCards, {
    capacity: 1,
    flush: 'sync',
    clone: true,
  })

  const computedOnlyCols = computed(() =>
    convertInOnlyCardsOrCol(colunasWithCards.value, 'coluna')
  )

  function createColunasWithCards(colunas = Array, cards = Array) {
    return colunas
      .map((col) => {
        const cardslist = []
        cards?.forEach(
          (card) => col.id === card.fase.id && cardslist.push(card)
        )
        return unref({
          coluna: col,
          cards: cardslist,
        })
      })
      .sort(ordenateKey('ordem'))
  }

  async function commitAlt(val) {
    colunasWithCards.value = val
    await nextTick()
    commit()
    console.log(history.value)
    await sendChamadoChange()
  }

  watch(
    () => history,
    () => {
      if (history.value.length < 2) return

      console.log(
        convertInOnlyCardsOrCol(history.value[1]?.snapshot).reduce(
          getItemPerID(cardAlterado.value.id),
          {}
        ).fase,
        'OLD'
      )

      console.log(
        convertInOnlyCardsOrCol(history.value[0]?.snapshot).reduce(
          getItemPerID(cardAlterado.value.id),
          {}
        ).fase,
        'NEW'
      )

      console.log(history.value, 'history.value')
    },
    { deep: true, flush: 'post' }
  )
  watch(colunasWithCards, () => {
    // debugger
  })

  function historyAlt(history) {
    const timeStamp0 = history.value[0].snapshot
    const timeStamp1 = history.value[1].snapshot
    const id = cardAlterado.value.id
    const NEW = convertInOnlyCardsOrCol(timeStamp0).reduce(getItemPerID(id), {})
    const OLD = convertInOnlyCardsOrCol(timeStamp1).reduce(getItemPerID(id), {})
    return GLOBAL.compareAndReturnDiff(OLD, NEW)
  }

  async function sendChamadoChange() {
    // Pega as apenas as diferenca entre o card do historico
    const diff = historyAlt(history)
    const listIDSInOrder = convertInOnlyCardsOrCol(colunasWithCards.value).map(
      (i) => i.id
    )

    try {
      // patch no chamado mudando a fase
      if (diff) {
        await api.patch(
          URLS.chamado + cardAlterado.value.id + '/' + '?no_loading',
          diff
        )
      }

      // atualiza a ordem
      await axios.post(
        `${BACKEND_URL}${URLS.atualizar_ordem_chamado}?no_loading`,
        { 'ids_chamados[]': listIDSInOrder }
      )

      commit()
      clear()
    } catch (e) {
      colunasWithCards.value = history.value[1].snapshot
      clear()
      commit()
      console.log(e)

      Notify.create({
        type: 'error',
        message: `Ops, Um erro ocorreu`,
        position: 'top-right',
        timeout: 1500,
        // html: true,
      })
    }
  }

  function returnCardPerID(id) {
    return convertInOnlyCardsOrCol(colunasWithCards.value).reduce(
      getItemPerID(id)
    )
  }

  async function getDadosAndDeclare() {
    const fase = await getFases()
    colunasWithCards.value = createColunasWithCards(fase, [])
    const chamado = await getChamado()
    colunasWithCards.value = createColunasWithCards(fase, chamado)
    commit()
  }

  async function updateDados() {
    const fase = await getFases()
    const chamado = await getChamado()
    const value = createColunasWithCards(fase, chamado)
    colunasWithCards.value = value
    commit()
  }

  function startAndEndDrag(e, start) {
    e.stopImmediatePropagation()
    e.stopPropagation()
    drag.value = start

    const { oldIndex, newIndex, to, from, item } = e

    const id = item._underlying_vm_.id
    const fromID = from.closest('.kanban-col').getAttribute('data-id')
    const toID = to.closest('.kanban-col').getAttribute('data-id')

    const data = {
      id,
      oldIndex,
      newIndex,
      to,
      from,
      toID,
      fromID,
    }

    cardAlterado.value = { id }

    if (!start) {
      const v = colunasWithCards.value //
        .map(mudaAFase(data))
        .map(mudaAOrdem)

      commitAlt(v)
    }
  }

  function mudaAOrdem(i) {
    i.cards.map((i, index) => (i.ordem = index))
    return i
  }
  function mudaAFase({ toID, id }) {
    return function (chamado) {
      if (chamado.coluna.id === Number(toID)) {
        const index = chamado.cards.findIndex((card) => card.id === Number(id))

        chamado.cards[index].fase = chamado.coluna
      }
      return chamado
    }
  }

  onMounted(async () => {
    getDadosAndDeclare()
  })

  return {
    colunasWithCards,
    cardAlterado,
    commitAlt,
    returnCardPerID,
    computedOnlyCols,
    getDadosAndDeclare,
    updateDados,
    startAndEndDrag,
    drag,
  }
}

// const cardsCached = ref([])
// const colunasWithCards = ref([])
// const cardAlterado = ref({ id: null })
// const colunasWithCardsOrdenate = computed(() => ordenateCards())
// const computedOnlyCards = computed(() => onlyCards())
// const testando = ref([])
// const isLoading = ref(false)
// const getItemPerID = (acc, i) => {
//   if (i.id === cardAlterado.value.id) {
//     acc = i
//   }
//   return acc
// }
// const pegaMudancas = (value, valueCached) => {
//   const modificado = {}
//   Object.entries(value).forEach(([key, v]) => {
//     const a = toRaw(value[key])
//     const b = toRaw(valueCached[key])
//     if (a !== b) {
//       modificado[key] = v
//     }
//   })
//   return modificado
// }
// async function sendChamadoChange() {
//   // debugger
//   const value = computedOnlyCards.value.reduce(getItemPerID, {})
//   const valueCached = cardsCached.value.reduce(getItemPerID, {})
//   const data = pegaMudancas(value, valueCached)
//   // debugger
//   try {
//     const request = await api.patch(
//       `${URLS.chamado}${cardAlterado?.value?.id}/?atualizar`,
//       data
//     )
//   } catch (e) {
//     console.log(e)
//   }
// }
// function onlyCards() {
//   return colunasWithCards.value.reduce((acc, item) => {
//     acc.push(...item.cards)
//     return acc
//   }, [])
// }
// watch(
//   () => colunasWithCards,
//   async () => {
//     console.log('colunasWithCards watch')
//     console.log(computedOnlyCards.value.reduce(getItemPerID, {}).fase, '🔥')
//   },
//   { deep: true }
// )
// watch(
//   () => testando,
//   () => {
//     console.log('testando')
//     console.log(testando.value.reduce(getItemPerID, {}).fase, 'testando')
//   },
//   { deep: true }
// )
// watch(
//   () => cardAlterado.value.id,
//   async () => {
//     console.log(`cardAlterado.value.id é ${cardAlterado.value.id}`)
//   }
// )
// watch(
//   () => cardsCached,
//   () => {
//     if (!cardsCached.value) return
//     const oi = [...cardsCached.value]
//     console.log(cardAlterado.value.id)
//     console.log(`cardsCached`, oi.reduce(getItemPerID, {}).fase)
//     console.log(`cardsCached`, oi.reduce(getItemPerID, {}).id)
//   },
//   { deep: true }
// )
// watch(
//   () => computedOnlyCards,
//   async () => {
//     console.log(
//       `computedOnlyCards `,
//       computedOnlyCards.value.reduce(getItemPerID, {})
//     )
//     computedOnlyCards.value.reduce(getItemPerID, {})
//   },
//   { deep: true }
// )
// async function getColunas() {
//   isLoading.value = true
//   try {
//     const { data } = await api.get(URLS.fase)
//     return data
//   } catch (e) {
//     console.log(e)
//   } finally {
//     isLoading.value = false
//   }
// }
// async function getCards() {
//   isLoading.value = true
//   try {
//     const { data } = await api.get(URLS.chamado + '?concluidos=True')
//     return data
//   } catch (e) {
//     console.log(e)
//   } finally {
//     isLoading.value = false
//   }
// }
// function createColunasWithCards(colunas = Array, cards = Array) {
//   return colunas.map((col) => {
//     const cardslist = []
//     cards.forEach((card) => col.id === card.fase.id && cardslist.push(card))
//     return {
//       coluna: col,
//       cards: cardslist.sort(ordenate),
//     }
//   })
// }
// function ordenate(a, b) {
//   if (a.ordem > b.ordem) return 1
//   if (a.ordem < b.ordem) return -1
//   return 0
// }
// // ordena todas as colunas
// function ordenateCards() {
//   return colunasWithCards.value.map((i) => {
//     i.cards.map((c, index) => (c.ordem = index) && c)
//     return i
//   })
// }
// onMounted(async () => {
//   const col = await getColunas()
//   const cardss = await getCards()
//   cardsCached.value = cardss
//   testando.value = cardss
//   colunasWithCards.value = createColunasWithCards(col, cardss)
// })
// return {
//   colunasWithCards,
//   isLoading,
//   ordenateCards,
//   // chamado,
//   colunasWithCardsOrdenate,
//   cardAlterado,
//   sendChamadoChange,
//   computedOnlyCards,
//   cardsCached,
// }

// watch(
//   () => cards,
//   () => {
//     console.log(
//       'mudou os carddds',
//       cards.map((i) => i.ordem)
//     )
//   },
//   { deep: true }
// )

// function pegarDiferenca(valor1, valor2) {
//   const valor3 = valor1.filter((a) => {
//     const diff = valor2.filter((b) => {
//       if (b.id === a.id) {
//         // console.log('id igual', b.id, a.id)
//         // console.log('ordem', b.ordem, a.ordem)
//         const teste = is.deepEqual(a, b)
//         if (a.ordem !== b.ordem) debugger
//         if (!teste) debugger
//         // console.log(a, b)
//         return false
//       } else {
//         return true
//       }
//     })
//     // console.log('oioioi', diff)
//     return diff
//   })
//   return valor3
// }

// ordena somente as modificadas
// function ordenateCards({ fromID, toID }) {
//   colunasWithCards.value.map((i) => {
//     if (i.coluna.id === Number(toID) || i.coluna.id === Number(fromID)) {
//       i.cards.map((card, index) => {
//         card.ordem = index
//         return card
//       })
//     }
//     return i
//   })
// }
