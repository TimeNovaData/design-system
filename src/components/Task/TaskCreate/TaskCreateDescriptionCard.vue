<template>
  <q-editor
    ref="editor"
    v-model="descriptionModel"
    height="90%"
    max-height="none"
    :toolbar="editorToobar()"
    class="dark:bg-d-neutral-10"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
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
</script>

<style lang="sass" scoped></style>
