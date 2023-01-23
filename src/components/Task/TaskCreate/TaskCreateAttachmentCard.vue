<template>
  <q-card class="dark:bg-d-neutral-10">
    <div class="p-16" @click="openAttachmentModal" @drop="openAttachmentModal">
      <FilePond
        name="attachments"
        ref="pond"
        :files="myFiles"
        :allow-multiple="true"
        @init="handleFilePondInit"
        v-bind="filePondConfig"
        :server="server"
        @processfile="(obj) => $emit('processfile', obj)"
      />
      de fora
    </div>

    <q-scroll-area class="!h-[calc(100%-9rem)] dark:!bg-d-neutral-10 px-16">
      <div class="!flex !flex-col gap-8">
        <AnexoItem
          v-for="i in anexos"
          :key="i.id"
          :ext="i.anexo_thumb?.extensao?.replace('.', '')"
          :thumb="i.anexo_thumb?.url || ''"
          :link="i.attachments"
          :size="i.anexo_tamanho"
          :nome="i.anexo_nome"
        />
      </div>
    </q-scroll-area>
  </q-card>
</template>

<script setup>
import { ref, unref } from 'vue'
import { filePondConfig } from 'src/boot/filepond'
import emitter from 'src/boot/emitter'
import 'src/css/vendor/filePond.sass'

import AnexoItem from 'src/components/Anexo/AnexoItem.vue'

const pond = ref(null)
const myFiles = ref([])

const props = defineProps({
  server: Object,
  anexos: Array,
  preventEv: {
    type: Boolean,
    default: false,
  },
  openModal: {
    type: Boolean,
    default: true,
  },
})

function handleFilePondInit() {
  console.log('FilePond has initialized', filePondConfig)
}

function openAttachmentModal(ev) {
  console.log('CLICK', pond.value.getFiles())
  myFiles.value = unref(pond.value.getFiles())
  console.log('CLICK 2', myFiles.value)

  if (props.preventEv) {
    ev.preventDefault()
  }

  props.openModal && emitter.emit('modal:anexo:abrir')
}
</script>

<style lang="scss" scoped>
// :deep(.filepond--list) {
//   display: none !important;
// }
</style>
