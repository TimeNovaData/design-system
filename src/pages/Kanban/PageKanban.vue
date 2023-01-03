<template>
  <KanbanHeader
    ref="kanbanHeader"
    @tree-points-click="() => modalRight.dialogRef.show()"
    @reload="() => emitter.emit('reloadDataKanban')"
  >
    <template #filtros>
      <KanbanFilters @applyFilters="handleApplyFilters"></KanbanFilters>
    </template>
  </KanbanHeader>

  <KanbanModalRight ref="modalRight"></KanbanModalRight>
  <Transition @enter="enter" @before-enter="beforeEnter" :css="false">
    <section v-if="tabs === 'board'" class="kanban-container">
      <div
        class="kanban-col--wrapper p-16"
        @mousedown="(e) => enableDragScroll(e)"
      >
        <KanbanCol
          v-for="col in colunasWithCards"
          :cards="col.cards"
          :colData="col.coluna"
          :key="col.coluna.id"
          :data-id="col.coluna.id"
          @mouseup="handleColClick"
          @mousedown="handleColClick"
          @newCards="clickNewCard"
        >
          <Transition name="fade" duration="150">
            <KanbanNewCard
              v-if="novoCard.id === col.coluna.id"
              :colData="col.coluna"
              @digitandoNome="() => setHeightInCol()"
              @invalid="closeNewCard"
              @create="handleCreateChamado"
            ></KanbanNewCard>
          </Transition>

          <draggable
            v-bind="dragOptions"
            :list="col.cards"
            :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null,
              class: `transition-div `,
            }"
            group="a"
            itemKey="name"
            @end="(e) => startAndEndDrag(e, false)"
            @start="(e) => startAndEndDrag(e, true)"
          >
            <template #item="{ element }">
              <KanbanCard
                :item="element"
                :visaoExpandida="visaoExpandida"
                :data-card-id="element.id"
                @cardClick="handleCardClick(element)"
              >
              </KanbanCard>
            </template>

            <!--  -->
          </draggable>
        </KanbanCol>
      </div>
    </section>

    <section v-else class="h-[inherit] pb-32">
      <PageKanbanList @openModal="handleCardClick"></PageKanbanList>
    </section>
  </Transition>

  <KanbanModal ref="modal" @changed="commitAlt(colunasWithCards)"></KanbanModal>

  <img :src="kanbanBG" aria-hidden="true" class="image-bg" alt="" />
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  provide,
  ref,
  toRaw,
  watch,
  inject,
} from 'vue'
import { storeToRefs } from 'pinia'
import KanbanCard from 'src/components/Kanban/KanbanCard.vue'
import KanbanCol from 'src/components/Kanban/KanbanCol.vue'
import KanbanModal from 'src/components/Kanban/KanbanModal.vue'
import useChamadosComposable from 'src/composables/useChamadosComposable'
import useKanbanBG from 'src/composables/useKanbanBG'
import useKanbanVisaoExpandida from 'src/composables/useKanbanVisaoExpandida'
import GLOBAL from 'src/utils/GLOBAL'
import draggable from 'vuedraggable'

import { useChamadoStore } from 'src/stores/chamados/chamados.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import { useTagStore } from 'src/stores/tags/tags.store'
import { useUsuarioStore } from 'src/stores/usuarios/usuarios.store'
import { deepUnref } from 'vue-deepunref'

import emitter from 'src/boot/emitter'
import KanbanFilters from 'src/components/Kanban/KanbanFilters.vue'
import KanbanHeader from 'src/components/Kanban/KanbanHeader.vue'
import KanbanModalRight from 'src/components/Kanban/KanbanModalRight.vue'
import KanbanNewCard from 'src/components/Kanban/KanbanNewCard.vue'
import PageKanbanList from './PageKanbanList.vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap/dist/gsap'

const { setHeightInCol } = GLOBAL
const { kanbanBG } = useKanbanBG()
const { visaoExpandida } = useKanbanVisaoExpandida()
// const { getUsuariosFoto } = useUsuarioStore()
// const { usuariosFoto } = storeToRefs(useUsuarioStore())

const router = useRouter()
const route = useRoute()
const tabs = ref(route.meta.tab)
const modal = ref(null)
const modalRight = ref(null)
const chamadoAtivo = ref(null)
// Refact essa function
//
watch(tabs, () => {
  tabs.value === 'board' && setTimeout(() => setHeightInCol(), 200)
  router.push(tabs.value)
})

const novoCard = ref({ id: null })

function beforeEnter(el) {
  gsap.set(el, { x: tabs.value === 'board' ? -300 : 200 })
}

function enter(el, done) {
  gsap
    .timeline()
    .to(el, { x: 0, ease: 'power1.out', duration: 0.5, delay: 0.1 })
    .call(done, '')
}

const {
  colunasWithCards,
  cardAlterado,
  drag,
  chamados,
  logAlt,
  commitAlt,
  returnCardPerID,
  startAndEndDrag,
  updateDados,
  applyFilters,
  atualizarOrdem,
  getLogAlt,
} = useChamadosComposable()

// Store to refs
const { getTags } = useTagStore()
const { tags } = storeToRefs(useTagStore())

const { createChamado } = useChamadoStore()

const removeEventsWrapper = ref(false)
const enableDragScroll = GLOBAL.enableDragScroll(removeEventsWrapper)

watch(drag, () => setHeightInCol())
watch(visaoExpandida, () => setTimeout(() => setHeightInCol(), 300))
watch(colunasWithCards, () => setTimeout(() => setHeightInCol(), 300))

// Callbacks evento
function handleCardClick(element) {
  chamadoAtivo.value = returnCardPerID(element.id)
  cardAlterado.value = chamadoAtivo.value
  modal.value.dialogRef.show()
}

function handleColClick(e) {
  e.stopImmediatePropagation()
  removeEventsWrapper.value = true
}

async function clickNewCard(colData) {
  if (novoCard.value.id === colData.id) {
    novoCard.value.id = ''
    setTimeout(() => setHeightInCol(), 50)
  } else {
    novoCard.value.id = colData.id
    setTimeout(() => setHeightInCol(), 50)
  }
}

function closeNewCard() {
  novoCard.value.id = null
  setTimeout(() => setHeightInCol(), 180)
}

async function handleCreateChamado(v) {
  novoCard.value.id = null
  const newCard = await createChamado(v)
  emitter.emit('reloadDataKanban')
}

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

const oldValue = ref([])

async function handleApplyFilters(filters) {
  // salva o estado se nao tiver
  if (!oldValue.value?.length) {
    colunasWithCards.value.map((i) => oldValue.value.push(toRaw(i)))
  }

  if (filters.semFiltros) {
    // se nao tiver filtro false e return
    applyFilters(false, oldValue.value)
    await nextTick()
    oldValue.value = []
    return
  }

  // console.log(oldValue, 'oldValue')

  const IDProjeto = filters.projeto?.model?.id
  const IDUsuario = filters.usuario?.model?.id
  const search = filters.search
  const IDcol = filters.coluna

  const newValue = deepUnref(oldValue.value).map((item) => {
    if (IDProjeto)
      item.cards = item.cards.filter((card) => card.projeto.id === IDProjeto)
    if (IDUsuario)
      item.cards = item.cards.filter(
        (card) => card.responsaveis.filter((i) => i.id === IDUsuario)?.length
      )
    if (search)
      item.cards = item.cards.filter(
        (card) =>
          card.titulo.toLowerCase().includes(search.toLowerCase()) ||
          `${card.id}`.includes(search.toLowerCase())
      )
    if (IDcol) item.cards = item.cards.filter((card) => card.fase.id === IDcol)
    return item
  })

  // console.log(newValue, 'newValue')
  applyFilters(newValue)
  await nextTick()
  setHeightInCol()
}

emitter.on('searchKanban', (value) => {
  handleApplyFilters({ search: value })
})

onMounted(() => {
  setHeightInCol()
  document
    .querySelector('.kanban-col--wrapper')
    ?.dispatchEvent(new Event('mousedown'))
  // getProjetos()
  // getSubProjetos()
  // getUsuariosFoto()
  getTags()
})

emitter.on('reloadDataKanban', async () => {
  await updateDados()
  await atualizarOrdem()
  // getProjetos()
  // getSubProjetos()
  // getUsuariosFoto()
  getTags()
})

// provide('usuarios', usuariosFoto)
// provide('projetos', projetos)
// provide('subProjetos', subProjetos)
provide('chamado', chamadoAtivo)
provide('tagsList', tags)
provide('tabs', tabs)
provide('colunasWithCards', colunasWithCards)
provide('visaoExpandida', visaoExpandida)
provide('kanbanBG', kanbanBG)
provide('chamados', chamados)
provide('logAlt', logAlt)
provide('getLogAlt', getLogAlt)
</script>

<style lang="sass">
:root
  --kanban-col-bg: rgba(var(--neutral-20), 1)
  --kanban-col-width: 18rem


.image-bg
  position: fixed
  object-fit: cover
  top: 0
  left: 0
  z-index: -1
  width: 100vw
  height: 100vh
  pointer-events: none
  user-select: none


.kanban
  &-container
    width: 100%
    height: inherit
    user-select: none

  &-col
    background: var(--kanban-col-bg)
    width: var(--kanban-col-width)
    max-height: 100%
    min-height: 330px
    height: max-content
    border-radius: 6px
    display: flex
    flex-direction: column
    flex-shrink: 0


  &-col--wrapper
    height: 100%
    display: flex
    gap: 1rem
    width: 100%
    overflow-x: auto

    &::-webkit-scrollbar
      width: 10px

    &::-webkit-scrollbar-track
      background: rgba(0, 0, 0, 0)
      border-radius: 3px

    &::-webkit-scrollbar-thumb
      background: rgba(255, 255, 255, 0.2)
      border-radius: 3px

    &::-webkit-scrollbar-thumb:hover
      background: rgba(255, 255, 255, 0.4)


.cards-wrapper
  display: flex
  flex-direction: column
  // flex: 1 0 auto
  flex: initial
  height: 100%
  min-height: 270px

  .transition-div
    display: flex
    flex-direction: column
    gap: .5rem
    flex: 1
    height: 100%
    padding: 8px 8px 0
    min-height: 260px
    margin-bottom: .5rem


//qscrollbar dentro da coluna
.q-scrollarea
  display: flex
  flex-direction: column
  height: 100%
  flex: 1


.q-scrollarea__container
  display: flex
  flex-direction: column
  height: 100%
  flex: 1


.q-scrollarea__bar--v, .q-scrollarea__thumb--v
  right: 0
  width: 6px


//Dark & Light Mode
.body--light
  .kanban-col--wrapper
    &::-webkit-scrollbar-thumb
      background: rgba(255, 255, 255, 0.5)

    &::-webkit-scrollbar-thumb:hover
      background: rgba(255, 255, 255, 0.65)


.body--dark
  --kanban-col-bg: rgb(var(--d-neutral-10))
</style>
