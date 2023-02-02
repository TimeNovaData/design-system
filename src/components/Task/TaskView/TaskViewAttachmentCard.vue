<template>
  <!--** Estava v-if="anexos.length" -->
  <q-card class="attachment-card flex-1 p-16 pb-0 pr-0" v-if="anexos?.[0]">
    <header class="flex justify-between">
      <span class="text-caps-3 dark:text-white/40">ANEXOS</span>

      <OButton
        class="font-normal dark:text-white bg-white/10 dark:!border-transparent mr-16"
        size="sm"
        height="sm"
        secondary
        @click="downloadAllFiles"
      >
        Baixar tudo
      </OButton>
    </header>

    <q-scroll-area class="mt-16 !h-[calc(100%-3rem)] pr-16">
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

  <div v-else class="h-[150px]">
    <EmptyItem text="Sem anexos no momento." />
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'
import AnexoItem from 'src/components/Anexo/AnexoItem.vue'
import EmptyItem from 'src/components/Empty/EmptyItem.vue'

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
