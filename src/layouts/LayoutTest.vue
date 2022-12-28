<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <KeepAlive>
      <component :is="MenuMultiLevel" :menu="menuList" />
    </KeepAlive>
    <BaseHeaderMenu></BaseHeaderMenu>
    <q-page-container class="home-page-container bg-neutral-10">
      <router-view />

      <!--  MOVI PARA LAYOUTTEST 
        /testes
      -->
      <div>
        <OButton @click="openModal"> Abrir modal </OButton>
        <TaskModal ref="modal" :data="task" :anexos="anexos" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import TaskModal from 'src/components/Task/TaskModal.vue'
import OButton from 'src/components/Button/OButton.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { storeToRefs } from 'pinia'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'
import BaseHeaderMenu from 'src/components/Header/BaseHeaderMenu.vue'

const modal = ref(null)

const { getTasks } = useTaskStore()
const { getAnexos } = useAnexoStore()

const { tasks: task } = storeToRefs(useTaskStore())
const { anexos } = storeToRefs(useAnexoStore())

const taskId = '339'

getTasks(`${taskId}/`)
getAnexos(`?task__id=${taskId}`)

function openModal() {
  modal.value.dialogRef.show()
}
</script>

<style lang="scss" scoped></style>
