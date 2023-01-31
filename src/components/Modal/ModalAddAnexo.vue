<template>
  <ModalCenter
    ref="modalAddAnexo"
    text="Adicionar Anexos"
    icon="svguse:/icons.svg#icon_attachment"
    @hide="handleCloseAnexoModal"
  >
    <AttachmentFilepond
      :server="{ url, key: keyProp, id }"
      :instantUpload="instantUpload"
      :ref="pond"
      @update:files="(v) => $emit('update:files', v)"
    />
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'
import AttachmentFilepond from 'src/components/Attachment/AttachmentFilepond.vue'
import ModalCenter from 'src/components/Modal/ModalCenter.vue'

import { useAnexoStore } from 'src/stores/anexos/anexos.store'

const pond = ref(null)
const { setFilaAnexos } = useAnexoStore()

const emit = defineEmits(['update:files'])

defineProps({
  url: String,
  keyProp: String,
  id: [String, Number],
  instantUpload: {
    type: Boolean,
    default: false,
  },
})

const modalAddAnexo = ref(null)

function handleCloseAnexoModal() {
  // setFilaAnexos([])
}

defineExpose({ modalAddAnexo, pond })
</script>

<style lang="scss" scoped></style>
