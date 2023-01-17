<template>
  <q-card class="p-16 dark:bg-d-neutral-10">
    <FilePond
      name="attachments"
      ref="pond"
      acceptedFileTypes="image/jpeg, image/png"
      :files="myFiles"
      :allow-multiple="true"
      @init="handleFilePondInit"
      v-bind="filePondConfig"
      :server="server"
    />
  </q-card>
</template>

<script setup>
import { filePondConfig } from 'src/boot/filepond'
import 'src/css/vendor/filePond.sass'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
const { URLS } = api.defaults
const myFiles = ref([])

defineProps({
  server: Object,
})

function handleFilePondInit() {
  console.log('FilePond has initialized', filePondConfig)
}
</script>
