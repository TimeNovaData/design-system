<template>
  <img
    class="image-bg"
    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
    alt=""
  />

  <div class="kanban-container p-16">
    <!--   <q-scroll-area class="fit"> -->
    <div
      id="kanban-wrapper"
      ref="wrapper"
      class="kanban-col--wrapper"
      v-touch-pan.prevent.horizontal.mouse="handlePan"
    >
      <KanbanCol v-for="(list, index) in lists" :key="index">
        <draggable
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null,
            class: 'transition-div',
          }"
          :list="list.value"
          group="a"
          @start="drag = true"
          @end="drag = false"
          itemKey="name"
          v-bind="dragOptions"
        >
          <template #item="{ element }">
            <KanbanCard>
              {{ element.name }}
            </KanbanCard>
          </template>
        </draggable>
      </KanbanCol>

      <div
        class="teste absolute bottom-0 left-0 h-8 bg-neutral-pure"
      ></div>
    </div>
    <!--     </q-scroll-area> -->
  </div>
</template>

<script setup>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

import KanbanCol from 'src/components/KanbanCol.vue'
import KanbanCard from 'src/components/KanbanCard.vue'
import gsap from 'gsap/dist/gsap'
import draggable from 'vuedraggable'

const drag = ref(false)
const teste = ref([])

const list1 = ref([
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 },
])

const list2 = ref([
  { name: 'Juan', id: 5 },
  { name: 'Edgard', id: 6 },
  { name: 'Johnson', id: 7 },
  { name: 'Juan', id: 11 },
  { name: 'Edgard', id: 26 },
  { name: 'Johnson', id: 27 },
  { name: 'Johnson', id: 57 },
  { name: 'Johnson', id: 67 },
  { name: 'Johnson', id: 97 },
  { name: 'Johnson', id: 107 },
  { name: 'Johnson', id: 207 },
  { name: 'Johnson', id: 307 },
  { name: 'Johnson', id: 407 },
  { name: 'Johnson', id: 507 },
])

const list3 = ref([
  { name: 'Alberto', id: 8 },
  { name: 'Fernando', id: 9 },
  { name: 'Michael', id: 10 },
])

const dragOptions = computed(() => ({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

const lists = [list1, list2, list3, list3, list1,list3, list1]

watch(drag, () => {
  setHeightInCol()
})

function setHeightInCol() {
  document.querySelectorAll('.cards-wrapper').forEach((i) => {
    const filhos = [...i.querySelectorAll('.kanban-card')]
    const gap = filhos.length * 7
    const height = filhos.reduce((acc, children) => {
      acc += children.getBoundingClientRect().height
      return acc
    }, 0)

    const heightWithGap = (height + gap + 16).toFixed(0)
    gsap.to(i, { height: heightWithGap, duration: 0.2 })

  })
}
// Scroll
const wrapper = ref(null)
const valueTransform = ref(0)
let xTo

onMounted(() => {
  xTo = gsap.quickTo('#kanban-wrapper', 'x', {
    duration: 0.3,
    ease: 'power1.out',
    overwrite: true,
  })
  setHeightInCol()
})

const handlePan = ({ evt, ...newInfo }) => {
  watch(valueTransform, () => xTo(valueTransform.value.toFixed()))
  if (draggable.value) return

  const right = newInfo.direction === 'right'
  const x = newInfo.offset.x
  const modificador = 20

  const colunasWidth = [
    ...document.querySelectorAll('.kanban-col'),
  ].reduce(
    (acc, i) => (acc += i.getBoundingClientRect().width + 16) && acc,
    0
  )

  // let gap = right ? valueTransform.value + x : valueTransform.value + x
  let gap = valueTransform.value + x / modificador

  if (gap <= colunasWidth * -1 + 900) return

  // se scroll for voltando reseto
  if (gap > 1) {
    gap = 0
  }

  valueTransform.value = gap
}
</script>

<style lang="sass">
:root
  --kanban-col-bg: rgba(var(--neutral-10), 1)

.image-bg
  position: fixed
  object-fit: cover
  top: 0
  left: 0
  z-index: -1
  width: 100vw
  height: 100vh

.kanban
  &-container
    width: 100%
    height: inherit
    user-select: none
  &-col
    background: var(--kanban-col-bg)
    width: 18rem
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
      min-height: 270px
      margin-bottom: .5rem



.ghost
  &::after
    content: ""
    position: absolute
    width: 100%
    height: 100%
    left: 0
    top: 0
    display: block
    background: rgb(var(--neutral-30))


.flip-list-move
  transition: transform 0.5s

.no-move
  transition: transform 0s

.list-group
  min-height: 20px
  &-item
    cursor: move
  &-item i
    cursor: pointer

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
</style>
