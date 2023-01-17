<template>
  <ModalCenter
    ref="modalAddAnexo"
    text="Adicionar Anexos"
    icon="svguse:/icons.svg#icon_attachment"
  >
    <AttachmentFilepond :server="{ url, key: keyProp, id }" />
  </ModalCenter>
</template>

<script setup>
import AttachmentFilepond from 'src/components/Attachment/AttachmentFilepond.vue'
import { ref } from 'vue'
import ModalCenter from './ModalCenter.vue'

const modalAddAnexo = ref(null)
defineProps({
  url: String,
  keyProp: String,
  id: [String, Number],
})

defineExpose({ modalAddAnexo })
</script>

<style lang="scss" scoped></style>
