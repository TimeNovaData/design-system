<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <div>
      <OButton @click="openTaskModal"> Ver task </OButton>
      <OButton @click="openAddTaskModal"> Adicionar Task </OButton>

      <TaskModal ref="modalTask" :data="task" :anexos="anexos" />

      <AddTaskModal ref="modalAddTask" />
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'
import OButton from 'src/components/Button/OButton.vue'
import TaskModal from 'src/components/Task/TaskModal.vue'
import AddTaskModal from 'src/components/AddTask/AddTaskModal.vue'

const modalTask = ref(null)
const modalAddTask = ref(null)

const { getTasks } = useTaskStore()
const { getAnexos } = useAnexoStore()

const { tasks: task } = storeToRefs(useTaskStore())
const { anexos } = storeToRefs(useAnexoStore())

const taskId = '167'

getTasks(`${taskId}/`)
getAnexos(`?task__id=${taskId}`)

function openTaskModal() {
  modalTask.value.dialogRef.show()
}

function openAddTaskModal() {
  modalAddTask.value.dialogRef.show()
}
</script>

<style lang="scss" scoped></style>
