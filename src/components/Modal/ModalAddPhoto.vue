<template>
  <ModalCenter
    ref="modalAddPhoto"
    :text="title"
    icon="svguse:/icons.svg#icon_attachment"
    @hide="handleClosePhotoModal"
  >
    <h1>Novo modal</h1>
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'
import ModalCenter from 'src/components/Modal/ModalCenter.vue'

defineProps({
  title: String,
})

const modalAddPhoto = ref(null)

function handleClosePhotoModal() {}

defineExpose({ modalAddPhoto })
</script>

<style lang="scss" scoped></style>
