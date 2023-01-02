<template>
  <q-card class="p-16 dark:bg-d-neutral-10">
    <FilePond
      name="attachments"
      ref="pond"
      label-idle="Arraste e jogue os arquivos aqui..."
      accepted-file-types="image/jpeg, image/png"
      :files="myFiles"
      :allow-multiple="true"
      @init="handleFilePondInit"
    />
  </q-card>
</template>

<script setup>
const myFiles = []

function handleFilePondInit() {
  console.log('FilePond has initialized')
}
</script>
