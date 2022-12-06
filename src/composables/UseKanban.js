import { is } from 'quasar'
import axios, { api } from 'src/boot/axios'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useCached } from '@vueuse/core'
const { URLS } = api.defaults

export default function useKanban() {
  let colunas
  let cards

  const colunasWithCards = ref([])
  const colunasWithCardsOrdenate = computed(() => ordenateCards())
  const cardAlterado = ref({
    id: null,
  })

  const isLoading = ref(false)

  const getCardPerID = (acc, i) => {
    if (i.id === cardAlterado.value.id) {
      acc = i
    }
    return acc
  }

  async function sendCardChange() {
    const value = cards.reduce(getCardPerID, {})
    // const oldValue =

    Object.keys(value).forEach((key) => {
      // for delete empty fields
      if (value[key] === null) {
        delete value[key]
      }
    })

    const request = await api.put(
      `${URLS.chamado}${cardAlterado?.value?.id}/`,
      value
    )
    console.log(request)
  }

  watch(
    () => colunasWithCards,
    async () => {
      // await nextTick()
      const arr = colunasWithCards.value.reduce((acc, item) => {
        acc.push(...item.cards)
        return acc
      }, [])

      console.log('colunasWithCards')
      cards = arr
    },
    { deep: true, flush: 'post' }
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
    colunasWithCards.value = createColunasWithCards(col, cardss)

    colunas = col
    cards = cardss

    console.log('montou')
  })

  return {
    colunasWithCards,
    isLoading,
    ordenateCards,
    // chamado,
    colunasWithCardsOrdenate,
    cardAlterado,
    sendCardChange,
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
