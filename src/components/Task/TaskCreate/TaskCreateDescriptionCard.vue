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
import editorToobar from 'src/utils/editorToolbar'
import { ref } from 'vue'

const props = defineProps({
  description: String,
})

const editor = ref(null)
const descriptionModel = ref(props.description || '')
</script>

<style lang="sass" scoped></style>
