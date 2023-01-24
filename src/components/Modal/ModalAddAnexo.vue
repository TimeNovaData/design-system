<template>
  <ModalCenter
    ref="modalAddAnexo"
    text="Adicionar Anexos"
    icon="svguse:/icons.svg#icon_attachment"
    @hide="handleCloseAnexoModal"
  >
    <AttachmentFilepond :server="{ url, key: keyProp, id }" />
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'
import AttachmentFilepond from 'src/components/Attachment/AttachmentFilepond.vue'
import ModalCenter from './ModalCenter.vue'

import { useAnexoStore } from 'src/stores/anexos/anexos.store'

const { setFilaAnexos } = useAnexoStore()

defineProps({
  url: String,
  keyProp: String,
  id: [String, Number],
})

const modalAddAnexo = ref(null)

function handleCloseAnexoModal() {
  setFilaAnexos([])
}

defineExpose({ modalAddAnexo })
</script>

<style lang="scss" scoped></style>
