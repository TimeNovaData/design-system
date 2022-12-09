<template>
  <section class="kanban-container">
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
        @newCards="createNewChamado"
      >
        <draggable
          v-bind="dragOptions"
          :list="col.cards"
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null,
            class: 'transition-div',
          }"
          group="a"
          itemKey="name"
          @end="(e) => handleStartEndDrag(e, false)"
          @start="(e) => handleStartEndDrag(e, true)"
        >
          <template #item="{ element }">
            <KanbanCard
              :item="element"
              :visaoExpandida="visaoExpandida"
              @cardClick="handleCardClick(element)"
              :data-card-id="element.id"
            >
            </KanbanCard>
          </template>

          <!--  -->
        </draggable>
      </KanbanCol>
    </div>
  </section>

  <KanbanModal
    @tagButtonClick="handleGetTags"
    :data="chamadoAtivo"
    :popUpTags="popUpTags"
    :tags="tags"
    ref="modal"
  ></KanbanModal>

  <img :src="kanbanBG" aria-hidden="true" class="image-bg" alt="" />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useKanbanBG } from 'src/stores/kanbanBG'
import { useVisaoExpandida } from 'src/stores/visaoExpandida'
import GLOBAL from 'src/utils/GLOBAL'
import KanbanCol from 'src/components/Kanban/KanbanCol.vue'
import KanbanCard from 'src/components/Kanban/KanbanCard.vue'
import KanbanModal from 'src/components/Kanban/KanbanModal.vue'
import useKanban from 'src/composables/UseKanban'
import draggable from 'vuedraggable'

import { useChamadoStore } from 'src/stores/chamado.store'

const { /*  generateRange, modelo1, */ setHeightInCol } = GLOBAL

const { kanbanBG } = storeToRefs(useKanbanBG())
const { visaoExpandida } = storeToRefs(useVisaoExpandida())

const popUpTags = ref(false)

const modal = ref(null)
const chamadoAtivo = ref(null)
const {
  colunasWithCards,
  cardAlterado,
  commitAlt,
  returnCardPerID,
  /* asas */
} = useKanban()
const { getTags, tags } = useChamadoStore()

// Drag
const drag = ref(false)
const removeEventsWrapper = ref(false)
const enableDragScroll = GLOBAL.enableDragScroll(removeEventsWrapper)

watch(drag, () => setHeightInCol())
watch(visaoExpandida, () => setTimeout(() => setHeightInCol(), 300))
watch(colunasWithCards, () => setTimeout(() => setHeightInCol(), 300))

async function handleStartEndDrag(e, start) {
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
    const v = colunasWithCards.value.map(mudaAFase(data))
    commitAlt(v)
  }
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

function handleCardClick(element) {
  chamadoAtivo.value = returnCardPerID(element.id)
  modal.value.dialogRef.show()
}

function handleColClick(e) {
  e.stopImmediatePropagation()
  removeEventsWrapper.value = true
}

function createNewChamado(fase) {
  console.log(fase)
}

async function handleGetTags() {
  const request = await getTags()
  tags.value = await request
  popUpTags.value = true
}

onMounted(() => {
  setHeightInCol()
  document
    .querySelector('.kanban-col--wrapper')
    .dispatchEvent(new Event('mousedown'))
})

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))
</script>

<style lang="sass">
\:root
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
