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

  <KanbanModal ref="modal" @changed="commitAlt(colunasWithCards)"></KanbanModal>

  <img :src="kanbanBG" aria-hidden="true" class="image-bg" alt="" />
</template>

<script setup>
import { computed, onMounted, provide, ref, watch, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useKanbanBG } from 'src/stores/kanbanBG'
import { useVisaoExpandida } from 'src/stores/visaoExpandida'
import GLOBAL from 'src/utils/GLOBAL'
import KanbanCol from 'src/components/Kanban/KanbanCol.vue'
import KanbanCard from 'src/components/Kanban/KanbanCard.vue'
import KanbanModal from 'src/components/Kanban/KanbanModal.vue'
import useKanban from 'src/composables/UseKanban'
import draggable from 'vuedraggable'

import { useChamadoStore } from 'src/stores/chamados/chamados.store'
import { useTagStore } from 'src/stores/tags/tags.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import { useUsuarioStore } from 'src/stores/usuarios/usuarios.store'
import emitter from 'src/boot/emitter'
import KanbanNewCard from 'src/components/Kanban/KanbanNewCard.vue'

const { /*  generateRange, modelo1, */ setHeightInCol } = GLOBAL

const { kanbanBG } = storeToRefs(useKanbanBG())
const { visaoExpandida } = storeToRefs(useVisaoExpandida())
const { getUsuariosFoto } = useUsuarioStore()
const { usuariosFoto } = storeToRefs(useUsuarioStore())

const modal = ref(null)
const chamadoAtivo = ref(null)

const novoCard = ref({ id: null })

const {
  colunasWithCards,
  cardAlterado,
  commitAlt,
  returnCardPerID,
  // getDadosAndDeclare,
  startAndEndDrag,
  updateDados,
  drag,
} = useKanban()

// Store to refs
const { getTags } = useTagStore()
const { tags } = storeToRefs(useTagStore())

const { createChamado } = useChamadoStore()
const { getProjetos, getSubProjetos } = useProjetoStore()
const { projetoAndSubProjetoOptions } = storeToRefs(useProjetoStore())

// Drag
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
  novoCard.value.id = colData.id
  setTimeout(() => setHeightInCol(), 50)
}
function closeNewCard() {
  novoCard.value.id = null
  setTimeout(() => setHeightInCol(), 180)
}
async function handleCreateChamado(v) {
  await createChamado(v)
  novoCard.value.id = null
  emitter.emit('reloadDataKanban')
}

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

onMounted(() => {
  setHeightInCol()
  document
    .querySelector('.kanban-col--wrapper')
    .dispatchEvent(new Event('mousedown'))

  getProjetos()
  getSubProjetos()
  getUsuariosFoto()
  getTags()
})

emitter.on('reloadDataKanban', async () => {
  await updateDados()
  getProjetos()
  getSubProjetos()
  getUsuariosFoto()
  getTags()
})

provide('chamado', chamadoAtivo)
provide('tagsList', tags)
provide('usuarios', usuariosFoto)
provide('projetoAndSubProjetoOptions', projetoAndSubProjetoOptions)
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
