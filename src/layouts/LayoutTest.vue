<template>
  <div>
    <OButton @click="openModal"> Abrir modal </OButton>
    <TaskModal ref="modal" :data="task" :anexos="anexos" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskModal from 'src/components/Task/TaskModal.vue'
import OButton from 'src/components/Button/OButton.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { storeToRefs } from 'pinia'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'

const modal = ref(null)

const { getTasks } = useTaskStore()
const { getAnexos } = useAnexoStore()

const { tasks: task } = storeToRefs(useTaskStore())
const { anexos } = storeToRefs(useAnexoStore())

const taskId = '167'

getTasks(`${taskId}/`)
getAnexos(`?task__id=${taskId}`)

function openModal() {
  modal.value.dialogRef.show()
}
</script>

<style lang="scss" scoped></style>
