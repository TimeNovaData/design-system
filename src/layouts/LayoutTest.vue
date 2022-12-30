<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <div>
      <OButton @click="openTaskModal"> Ver task </OButton>
      <OButton @click="openAddTaskModal"> Adicionar Task </OButton>

      <TaskViewModal ref="modalTask" :data="task" :anexos="anexos" />

      <TaskCreateModal ref="modalAddTask" />
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'
import OButton from 'src/components/Button/OButton.vue'
import TaskViewModal from 'src/components/Task/TaskView/TaskViewModal.vue'
import TaskCreateModal from 'src/components/Task/TaskCreate/TaskCreateModal.vue'

const modalTask = ref(null)
const modalAddTask = ref(null)

const { getTask } = useTaskStore()
const { getAnexos } = useAnexoStore()

const { task } = storeToRefs(useTaskStore())
const { anexos } = storeToRefs(useAnexoStore())

const taskId = '167'

getTask(`${taskId}/`)
getAnexos(`?task__id=${taskId}`)

function openTaskModal() {
  modalTask.value.dialogRef.show()
}

function openAddTaskModal() {
  modalAddTask.value.dialogRef.show()
}
</script>

<style lang="scss" scoped></style>
