<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>

    <BaseHeader></BaseHeader>
    <q-page-container class="home-page-container bg-neutral-10">
      <!--  -->
      <router-view />
      <!--  -->
    </q-page-container>
    <ButtonFloat></ButtonFloat>
  </q-layout>

  <TaskCreateModal />

  <TaskViewModal />
  <KanbanModal
    ref="modalChamado"
    @changed="commitAlt(colunasWithCards)"
  ></KanbanModal>
</template>

<script setup>
import ButtonFloat from 'src/components/Button/ButtonFloat.vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from 'src/utils/menuList.js'
import TaskViewModal from 'src/components/Task/TaskView/TaskViewModal.vue'
import TaskCreateModal from 'src/components/Task/TaskCreate/TaskCreateModal.vue'
import { useModalStore } from 'src/stores/modal/modal.store'
import { provide, ref, onMounted } from 'vue'
import KanbanModal from 'src/components/Kanban/KanbanModal.vue'
import useChamadosComposable from 'src/composables/useChamadosComposable'
import { useTagStore } from 'src/stores/tags/tags.store'
import { storeToRefs } from 'pinia'

const { openTaskViewModal, openTaskEditModal } = useModalStore()

const modalChamado = ref(null)

const chamadoAtivo = ref({})

const { getTags } = useTagStore()
const { tags } = storeToRefs(useTagStore())

const {
  colunasWithCards,
  cardAlterado,
  logAlt,
  commitAlt,
  returnCardPerID,
  startAndEndDrag,
  getLogAlt,
} = useChamadosComposable()

function handleClickChamado(id) {
  chamadoAtivo.value = returnCardPerID(id)
  cardAlterado.value = chamadoAtivo.value
  modalChamado.value.dialogRef.show()
}

onMounted(() => {
  getTags()
})

provide('openTaskViewModal', openTaskViewModal)
provide('openTaskEditModal', openTaskEditModal)
provide('chamado', chamadoAtivo)
provide('tagsList', tags)
provide('colunasWithCards', colunasWithCards)
provide('logAlt', logAlt)
provide('getLogAlt', getLogAlt)
provide('handleClickChamado', handleClickChamado)
</script>

<style lang="sass">

.home-page-container
  --header-bg: white
  --top-size: var(--header-base-height)
  margin-left: var(--Nv0-sidebar-width)
  // margin-top: var(--top-size)
  height:100vh

  .body--dark &
    background: rgb(var(--d-neutral-10))
</style>

<style lang="sass" scoped>
.base-header
 background: rgba(var(--white), 0.04) !important
</style>
