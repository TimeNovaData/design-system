import { api } from 'src/boot/axios'
import { nextTick, onMounted, ref, unref, watch } from 'vue'
import axios from 'axios'
import { useManualRefHistory } from '@vueuse/core'
import { useAuthStore } from 'stores/auth.store'
import { useChamadoStore } from 'src/stores/chamado.store'

const BACKEND_URL = process.env.BACKEND_URL
const { URLS } = api.defaults

export default function useKanban() {
  const colunasWithCards = ref([])
  const cardAlterado = ref({ id: null })
  const { getFase, getChamado } = useChamadoStore()

  const { history, commit, clear /* undo, redo, */ } = useManualRefHistory(
    colunasWithCards,
    {
      capacity: 2, // limit  history records
      flush: 'sync', // options 'pre' (default), 'post' and 'sync'
      clone: true,
    }
  )
  // const computedOnlyCards = computed(() => onlyCards())

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
      .sort(ordenate)
  }

  async function commitAlt(val) {
    colunasWithCards.value = val
    await nextTick()
    commit()
    console.log(history.value)
    await sendCardChange()
  }

  // converte lista de array de objectos de cards e colunas
  // en lista somente de cards
  function convertInOnlyCards(arr) {
    return arr.reduce((acc, item) => {
      acc.push(...item.cards)
      return acc
    }, [])
  }

  const getCardPerID = (id) => (acc, i) => {
    if (i.id === id) acc = i
    return acc
  }

  function historyAlt(history) {
    // const timeStamp0 = history.value[0].snapshot
    // const timeStamp1 = history.value[1].snapshot
    // const id = cardAlterado.value.id
    // const OLD = convertInOnlyCards(timeStamp0).reduce(getCardPerID(id), {})
    // const NEW = convertInOnlyCards(timeStamp1).reduce(getCardPerID(id), {})
    // const data = GLOBAL.compareAndReturnDiff(OLD, NEW)
  }

  async function sendCardChange() {
    // Pega as apenas as diferenca entre o card do historico
    // historyAlt(history)
    const { TOKEN } = useAuthStore()
    const listIDSInOrder = convertInOnlyCards(colunasWithCards.value).map(
      (i) => i.id
    )

    try {
      const request = await axios.post(
        `${BACKEND_URL}${URLS.atualizar_ordem_chamado}`,
        listIDSInOrder,
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      )
    } catch (e) {
      console.log(e)
    }
  }

  function returnCardPerID(id) {
    return convertInOnlyCards(colunasWithCards.value).reduce(getCardPerID(id))
  }

  function ordenate(a, b) {
    if (a.ordem > b.ordem) return 1
    if (a.ordem < b.ordem) return -1
    return 0
  }

  onMounted(async () => {
    const fase = await getFase()
    colunasWithCards.value = createColunasWithCards(fase, [])
    const chamado = await getChamado()
    colunasWithCards.value = createColunasWithCards(fase, chamado)

    await nextTick()

    commit()
    clear()
  })

  return {
    colunasWithCards,
    cardAlterado,
    commitAlt,
    returnCardPerID,
  }
}

// const cardsCached = ref([])
// const colunasWithCards = ref([])
// const cardAlterado = ref({ id: null })
// const colunasWithCardsOrdenate = computed(() => ordenateCards())
// const computedOnlyCards = computed(() => onlyCards())
// const testando = ref([])
// const isLoading = ref(false)
// const getCardPerID = (acc, i) => {
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
// async function sendCardChange() {
//   // debugger
//   const value = computedOnlyCards.value.reduce(getCardPerID, {})
//   const valueCached = cardsCached.value.reduce(getCardPerID, {})
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
//     console.log(computedOnlyCards.value.reduce(getCardPerID, {}).fase, '🔥')
//   },
//   { deep: true }
// )
// watch(
//   () => testando,
//   () => {
//     console.log('testando')
//     console.log(testando.value.reduce(getCardPerID, {}).fase, 'testando')
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
//     console.log(`cardsCached`, oi.reduce(getCardPerID, {}).fase)
//     console.log(`cardsCached`, oi.reduce(getCardPerID, {}).id)
//   },
//   { deep: true }
// )
// watch(
//   () => computedOnlyCards,
//   async () => {
//     console.log(
//       `computedOnlyCards `,
//       computedOnlyCards.value.reduce(getCardPerID, {})
//     )
//     computedOnlyCards.value.reduce(getCardPerID, {})
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
//   sendCardChange,
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
