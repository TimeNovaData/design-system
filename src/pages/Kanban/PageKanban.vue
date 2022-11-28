<template>
  <section class="kanban-container">
    <div
      class="kanban-col--wrapper p-16"
      @mousedown="(e) => enableDragScroll(e)"
    >
      <KanbanCol
        v-for="(list, index) in lists"
        :data="list"
        @mouseup="handleColClick"
        @mousedown="handleColClick"
        :key="index"
      >
        <draggable
          v-bind="dragOptions"
          :list="list"
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
              @cardClick="handleCardClick"
            ></KanbanCard>
          </template>

          <!--  -->
        </draggable>
      </KanbanCol>
    </div>
  </section>

  <KanbanModal ref="modal"></KanbanModal>

  <img class="image-bg" :src="kanbanBG" aria-hidden="true" />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useKanbanBG } from 'src/stores/kanbanBG'
import { useVisaoExpandida } from 'src/stores/visaoExpandida'
import draggable from 'vuedraggable'
import GLOBAL from 'src/utils/GLOBAL'
import KanbanCol from 'src/components/Kanban/KanbanCol.vue'
import KanbanCard from 'src/components/Kanban/KanbanCard.vue'
import KanbanModal from 'src/components/Kanban/KanbanModal.vue'

const { generateRange, modelo1, setHeightInCol } = GLOBAL

const visao = useVisaoExpandida()
const bg = useKanbanBG()

const { kanbanBG } = storeToRefs(bg)
const { visaoExpandida } = storeToRefs(visao)

const removeEventsWrapper = ref(false)

const modal = ref(null)

function handleColClick(e) {
  e.stopImmediatePropagation()
  removeEventsWrapper.value = true
}

const lists = ref([
  generateRange(1, modelo1),
  generateRange(2, modelo1),
  generateRange(3, modelo1),
  generateRange(4, modelo1),
  generateRange(5, modelo1),
  generateRange(6, modelo1),
  generateRange(7, modelo1),
])

// Drag
const drag = ref(false)
const enableDragScroll = GLOBAL.enableDragScroll(removeEventsWrapper)

watch(drag, () => setHeightInCol())
watch(visaoExpandida, () => setTimeout(() => setHeightInCol(), 300))

const handleStartEndDrag = (e, value) => {
  e.stopImmediatePropagation()
  e.stopPropagation()
  drag.value = value
}

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

function handleCardClick(v) {
  modal.value.dialogRef.show()
}

onMounted(() => {
  setHeightInCol()
  document
    .querySelector('.kanban-col--wrapper')
    .dispatchEvent(new Event('mousedown'))
})
</script>

<style lang="sass">
:root
  --kanban-col-bg: rgba(var(--neutral-10), 1)
  --kanban-col-width:18rem


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
    width:100%
    overflow-x: auto


      /* width */
    &::-webkit-scrollbar
      width: 10px


    /* Track */
    &::-webkit-scrollbar-track
      background: rgba(0,0,0,0)
      border-radius:3px

    /* Handle */
    &::-webkit-scrollbar-thumb
      background: rgba(255,255,255,0.2)
      border-radius:3px


    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover
      background: rgba(255,255,255,0.4)


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
      padding: 8px
      padding-bottom: 0
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
     background: rgba(255,255,255,0.5)
    &::-webkit-scrollbar-thumb:hover
      background: rgba(255,255,255,0.65)

.body--dark
  --kanban-col-bg: rgb(var(--d-neutral-10))
</style>
