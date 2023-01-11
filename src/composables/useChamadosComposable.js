import { api } from 'src/boot/axios'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import axios from 'axios'
import GLOBAL from 'src/utils/GLOBAL'
import { Notify } from 'quasar'
import { useManualRefHistory } from '@vueuse/core'
import { useChamadoStore } from 'src/stores/chamados/chamados.store'
// import { useTagStore } from 'src/stores/tags/state'
import { useFaseStore } from 'src/stores/fases/fases.store'
import { storeToRefs } from 'pinia'

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

export default function useChamadosComposable() {
  const colunasWithCards = ref([])
  const cardAlterado = ref({ id: null })
  const drag = ref(false)
  const logAlt = ref([])

  // useModalChamado(colunasWithCards)

  // Stores
  const { getChamado } = useChamadoStore()
  const { chamados } = storeToRefs(useChamadoStore())
  const { getFases } = useFaseStore()
  // const { getTags } = useTagStore()

  const { history, commit, clear, undo, redo } = useManualRefHistory(
    colunasWithCards,
    {
      capacity: 1,
      flush: 'sync',
      clone: true,
    }
  )

  const computedOnlyCols = computed(() =>
    convertInOnlyCardsOrCol(colunasWithCards.value, 'coluna')
  )

  const listIDSInOrder = computed(() =>
    convertInOnlyCardsOrCol(colunasWithCards.value).map((i) => i.id)
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
    // console.log(history.value)
    await sendChamadoChange()
  }

  async function commitAltFront(val) {
    colunasWithCards.value = val
    await nextTick()
    commit()
  }

  function applyFilters(value, arr) {
    if (value === false) {
      commitAltFront(arr)
      return
    }

    commitAltFront(value)
  }

  function historyAlt(history) {
    const timeStamp0 = history.value[0].snapshot
    const timeStamp1 = history.value[1].snapshot
    const id = cardAlterado.value.id
    const NEW = convertInOnlyCardsOrCol(timeStamp0).reduce(getItemPerID(id), {})
    const OLD = convertInOnlyCardsOrCol(timeStamp1).reduce(getItemPerID(id), {})
    return GLOBAL.compareAndReturnDiff(OLD, NEW)
  }

  let cacheOrder
  async function atualizarOrdem() {
    // atualiza a ordem
    if (cacheOrder !== listIDSInOrder.value) {
      cacheOrder = listIDSInOrder.value
      await api.post(`${URLS.atualizar_ordem_chamado}?no_loading`, {
        id_chamados: listIDSInOrder.value,
      })
    }
  }

  async function sendChamadoChange() {
    // Pega as apenas as diferenca entre o card do historico
    const diff = historyAlt(history)

    try {
      // patch no chamado mudando a fase
      if (diff) {
        const request = await api.patch(
          URLS.chamado + cardAlterado.value.id + '/?no_loading',
          diff
        )
      }

      await atualizarOrdem()

      commit()
      clear()
    } catch (e) {
      console.log(history.value)
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

  async function getLogAlt(id) {
    try {
      const { data } = await api.get(
        `${URLS.logAlteracoesChamado}?chamado__id=${id}&no_loading`
      )

      logAlt.value = data
    } catch (e) {
      Notify.create({
        type: 'error',
        message: `Erro ao puxar o log de alterações`,
        position: 'top-right',
        timeout: 2000,
        html: true,
      })
    }
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
    chamados,
    colunasWithCards,
    cardAlterado,
    computedOnlyCols,
    drag,
    logAlt,
    commitAlt,
    returnCardPerID,
    getDadosAndDeclare,
    updateDados,
    startAndEndDrag,
    applyFilters,
    atualizarOrdem,
    getLogAlt,
  }
}
