<template>
  <q-card class="attachment-card flex-1 p-16">
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

    <div
      class="!flex !flex-col gap-8 mt-16 overflow-y-auto max-h-[7.5rem] xl:max-h-[10.5rem] md:max-h-[15rem]"
    >
      <AttachmentFile
        v-for="anexo in anexos"
        :key="anexo.id"
        :data="anexo"
        :hasImage="true"
      />
    </div>
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
