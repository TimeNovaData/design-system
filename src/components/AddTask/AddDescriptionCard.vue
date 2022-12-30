<template>
  <q-editor
    ref="editor"
    v-model="descriptionModel"
    height="90%"
    max-height="none"
    :toolbar="editorToobar()"
  />
</template>

<script setup>
import editorToobar from 'src/utils/editorToolbar'
import { ref } from 'vue'

const editor = ref(null)
const descriptionModel = ref('')
</script>

<style lang="sass" scoped></style>
