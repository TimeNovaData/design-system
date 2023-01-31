<template>
  <q-card class="dark:bg-d-neutral-10">
    <div class="p-16">
      <FilePond
        name="attachments"
        ref="pond"
        :files="filePondFiles"
        :allow-multiple="true"
        @init="handleFilePondInit"
        v-bind="{ ...filePondConfig, ...attrs }"
        :server="server"
        @updatefiles="handleFilePondUpdatefile"
        :instantUpload="openTask || instantUpload ? true : false"
      />
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
import { ref, unref, nextTick, useAttrs, onMounted } from 'vue'
import { filePondConfig } from 'src/boot/filepond'
import emitter from 'src/boot/emitter'
import 'src/css/vendor/filePond.sass'

import AnexoItem from 'src/components/Anexo/AnexoItem.vue'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'
import { useTaskStore } from 'src/stores/tasks/tasks.store'

const { setFilaAnexos } = useAnexoStore()
const { openTask, setNewTaskFiles } = useTaskStore()

const attrs = useAttrs()
const emit = defineEmits(['update:files'])

const pond = ref(null)

const props = defineProps({
  server: Object,
  anexos: Array,

  instantUpload: {
    type: Boolean,
    default: false,
  },
  preventEv: {
    type: Boolean,
    default: false,
  },
  openModal: {
    type: Boolean,
    default: true,
  },
  filePondFiles: Array,
})

function handleFilePondInit() {
  // console.log('FilePond has initialized', filePondConfig)
}

async function handleFilePondUpdatefile(ev) {
  // setNewTaskFiles([])
  await nextTick()
  const files = pond.value.getFiles()

  emit('update:files', files)
  window._blue('TaskCreateAttachmentCard:UPDATE')

  setNewTaskFiles(files)

  console.log(files)
}

defineExpose({ pond })
</script>

<style lang="scss" scoped>
// :deep(.filepond--list) {
//   display: none !important;
// }
</style>
