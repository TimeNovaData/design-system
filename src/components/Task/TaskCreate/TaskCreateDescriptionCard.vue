<template>
  <q-editor
    ref="editor"
    v-model="descriptionModel"
    height="90%"
    max-height="none"
    :toolbar="editorToobar()"
    class="editor h-full dark:bg-d-neutral-10"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import emitter from 'src/boot/emitter'
import editorToobar from 'src/utils/editorToolbar'

const emit = defineEmits(['update'])

const props = defineProps({
  description: String,
})

const editor = ref(null)
const descriptionModel = ref(props.description || '')

watch(descriptionModel, () => {
  emit('update', descriptionModel.value)
})

watch(
  () => props.description,
  (v) => {
    if (v) descriptionModel.value = v
  }
)

emitter.on(`modal:tasktype:create`, (tasktype) => {
  descriptionModel.value = tasktype.descricao
})
</script>

<style lang="sass" scoped>
.editor :deep(.q-editor__content *)
  white-space: break-spaces !important
</style>
