import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
const { URLS } = api.defaults

export default function useKanban() {
  const colunas = ref([])
  const cards = ref([])
  const colunasWithCards = ref([])
  const isLoading = ref(false)

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
        cards: cardslist,
      }
    })
  }

  onMounted(async () => {
    colunas.value = await getColunas()
    cards.value = await getCards()
    colunasWithCards.value = createColunasWithCards(colunas.value, cards.value)

    console.log(colunasWithCards.value)
  })

  return { colunas, cards, colunasWithCards, isLoading }
}
