<template>
  <div>
    <OButton @click="openModal"> Abrir modal </OButton>
    <TaskModal ref="modal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskModal from 'src/components/Task/TaskModal.vue'
import OButton from 'src/components/Button/OButton.vue'

const modal = ref(null)

function openModal() {
  modal.value.dialogRef.show()
}
</script>

<style lang="scss" scoped></style>
