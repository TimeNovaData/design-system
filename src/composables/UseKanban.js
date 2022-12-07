import { is } from 'quasar'
import axios, { api } from 'src/boot/axios'
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
  unref,
  watch,
} from 'vue'

// import { useCached } from '@vueuse/core'

const { URLS } = api.defaults

export default function useKanban() {
  const cardsCached = ref([])
  const colunasWithCards = ref([])
  const cardAlterado = ref({ id: null })
  const colunasWithCardsOrdenate = computed(() => ordenateCards())
  const computedOnlyCards = computed(() => onlyCards())

  const testando = ref([])

  const isLoading = ref(false)

  const getCardPerID = (acc, i) => {
    if (i.id === cardAlterado.value.id) {
      acc = i
    }
    return acc
  }

  const pegaMudancas = (value, valueCached) => {
    const modificado = {}

    Object.entries(value).forEach(([key, v]) => {
      const a = toRaw(value[key])
      const b = toRaw(valueCached[key])

      if (a !== b) {
        modificado[key] = v
      }
    })

    return modificado
  }

  async function sendCardChange() {
    // debugger
    const value = computedOnlyCards.value.reduce(getCardPerID, {})
    const valueCached = cardsCached.value.reduce(getCardPerID, {})

    const data = pegaMudancas(value, valueCached)
    // debugger

    try {
      const request = await api.patch(
        `${URLS.chamado}${cardAlterado?.value?.id}/?atualizar`,
        data
      )
    } catch (e) {
      console.log(e)
    }
  }

  function onlyCards() {
    return colunasWithCards.value.reduce((acc, item) => {
      acc.push(...item.cards)
      return acc
    }, [])
  }

  watch(
    () => colunasWithCards,
    async () => {
      console.log('colunasWithCards watch')
      console.log(computedOnlyCards.value.reduce(getCardPerID, {}).fase, '🔥')
    },
    { deep: true }
  )
  watch(
    () => testando,
    () => {
      console.log('testando')
      console.log(testando.value.reduce(getCardPerID, {}).fase, 'testando')
    },
    { deep: true }
  )

  watch(
    () => cardAlterado.value.id,
    async () => {
      console.log(`cardAlterado.value.id é ${cardAlterado.value.id}`)
    }
  )

  watch(
    () => cardsCached,
    () => {
      if (!cardsCached.value) return
      const oi = [...cardsCached.value]
      console.log(cardAlterado.value.id)

      console.log(`cardsCached`, oi.reduce(getCardPerID, {}).fase)
      console.log(`cardsCached`, oi.reduce(getCardPerID, {}).id)
    },
    { deep: true }
  )

  watch(
    () => computedOnlyCards,
    async () => {
      console.log(
        `computedOnlyCards `,
        computedOnlyCards.value.reduce(getCardPerID, {})
      )
      computedOnlyCards.value.reduce(getCardPerID, {})
    },
    { deep: true }
  )

  async function getColunas() {
    isLoading.value = true
    try {
      const { data } = await api.get(URLS.fase)
      return data
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }

  async function getCards() {
    isLoading.value = true
    try {
      const { data } = await api.get(URLS.chamado)
      return data
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }

  function createColunasWithCards(colunas = Array, cards = Array) {
    return colunas.map((col) => {
      const cardslist = []
      cards.forEach((card) => col.id === card.fase.id && cardslist.push(card))
      return {
        coluna: col,
        cards: cardslist.sort(ordenate),
      }
    })
  }

  function ordenate(a, b) {
    if (a.ordem > b.ordem) return 1
    if (a.ordem < b.ordem) return -1
    return 0
  }

  // ordena todas as colunas
  function ordenateCards() {
    return colunasWithCards.value.map((i) => {
      i.cards.map((c, index) => (c.ordem = index) && c)
      return i
    })
  }

  onMounted(async () => {
    const col = await getColunas()
    const cardss = await getCards()
    cardsCached.value = cardss
    testando.value = cardss

    colunasWithCards.value = createColunasWithCards(col, cardss)
  })

  return {
    colunasWithCards,
    isLoading,
    ordenateCards,
    // chamado,
    colunasWithCardsOrdenate,
    cardAlterado,
    sendCardChange,
    computedOnlyCards,
    cardsCached,
  }
}

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
