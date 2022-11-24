<template>
  <section class="kanban-container">
    <!-- <Swiper
      @swiper="getRef"
      slides-per-view="auto"
      :space-between="6"
      :modules="modules"
      
      :prevent-clicks-propagation="false"
      :touch-move-stop-propagation="false"
      :free-mode="{
        momentumBounceRatio: 0.3,
        momentumRatio: 0.3,
        momentumVelocityRatio: 1,
      }"
      :scrollbar="{
        el: '.swiper-scrollbar',
        draggable: true,
      }"
      :touch-release-on-edges="true"
      :resize-observer="true"
      :keyboard="{
        enabled: true,
      }"
    >
      <SwiperSlide v-for="(list, index) in lists" :key="index"> -->
    <div
      class="kanban-col--wrapper p-16"
      @mousedown="(e) => enableDragScroll(e)"
    >
      <KanbanCol
        :data="list"
        v-for="(list, index) in lists"
        :key="index"
        @mouseup="handleColClick"
        @mousedown="handleColClick"
      >
        <draggable
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null,
            class: 'transition-div',
          }"
          :list="list"
          group="a"
          @start="handleStart"
          @end="handleEnd"
          itemKey="name"
          v-bind="dragOptions"
        >
          <template #item="{ element }">
            <KanbanCard
              :visaoExpandida="visaoExpandida"
              :item="element"
              @cardClick="handleCardClick"
            ></KanbanCard>
          </template>
        </draggable>
      </KanbanCol>
    </div>
    <!-- </SwiperSlide> -->
    <!-- <div class="swiper-scrollbar"></div> -->
    <!-- </Swiper> -->
  </section>
  <KanbanModal ref="modal"></KanbanModal>
  <img class="image-bg" :src="kanbanBG" aria-hidden="true" />
</template>

<script setup>
// import gsap from 'gsap/dist/gsap'
import KanbanCol from 'src/components/KanbanCol.vue'
import KanbanCard from 'src/components/KanbanCard.vue'
import GLOBAL from 'src/utils/GLOBAL'
import draggable from 'vuedraggable'
import { useKanbanBG } from 'src/stores/kanbanBG'
import { useVisaoExpandida } from 'src/stores/visaoExpandida'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import KanbanModal from '../../components/KanbanModal.vue'

const { generateRange, modelo1, setHeightInCol } = GLOBAL

const removeEvents = ref(false)
const enableDragScroll = GLOBAL.enableDragScroll(removeEvents)

const bg = useKanbanBG()
const visao = useVisaoExpandida()
const { kanbanBG } = storeToRefs(bg)
const { visaoExpandida } = storeToRefs(visao)
const modal = ref(null)
function handleColClick(e) {
  e.stopImmediatePropagation()
  removeEvents.value = true
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
watch(drag, () => setHeightInCol())
watch(visaoExpandida, () => setTimeout(() => setHeightInCol(), 300))
const handleEnd = (e) => {
  e.stopImmediatePropagation()
  e.stopPropagation()
  drag.value = false
}
const handleStart = (e) => {
  e.stopPropagation()
  e.stopImmediatePropagation()
  drag.value = true
}

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

function handleCardClick(v) {
  console.log(modal.value.dialogRef)
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
