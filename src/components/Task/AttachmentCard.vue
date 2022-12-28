<template>
  <q-card class="attachment-card flex-1 p-16 pb-0">
    <header class="flex justify-between">
      <span class="text-caps-3 dark:text-white/40">ANEXOS</span>

      <OButton
        class="font-normal dark:text-white bg-white/10 dark:!border-transparent"
        size="sm"
        height="sm"
        secondary
        @click="downloadAllFiles"
      >
        Baixar tudo
      </OButton>
    </header>

    <q-scroll-area class="mt-16 !h-[6.5rem]">
      <div class="!flex !flex-col gap-8">
        <AttachmentFile
          v-for="anexo in anexos"
          :key="anexo.id"
          :data="anexo"
          :hasImage="true"
        />
      </div>
    </q-scroll-area>
  </q-card>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'
import AttachmentFile from './AttachmentFile.vue'

const props = defineProps({
  anexos: Array,
})

function downloadAllFiles() {
  props.anexos.forEach((i) => {
    GLOBAL.blobDownloadFile(i.anexo, i.anexo_nome)
  })
}
</script>

<style lang="sass" scoped></style>
