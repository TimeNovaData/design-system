<template>
  <div>
    <OButton @click="openModal"> Abrir modal </OButton>
    <TaskModal ref="modal" :data="task" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskModal from 'src/components/Task/TaskModal.vue'
import OButton from 'src/components/Button/OButton.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { storeToRefs } from 'pinia'

const modal = ref(null)

const { getTasks } = useTaskStore()
const { tasks: task } = storeToRefs(useTaskStore())

getTasks('166/')

function openModal() {
  modal.value.dialogRef.show()
}
</script>

<style lang="scss" scoped></style>
