<template>
  <q-card
    class="attachment-file flex items-center justify-between px-8 py-10 bg-white/5"
  >
    <div class="flex gap-8">
      <q-avatar class="w-40 h-40 rounded-sm">
        <img v-if="hasImage" :src="data.anexo" />

        <q-icon
          v-else
          name="svguse:/icons.svg#icon_file"
          class="w-full h-full absolute"
          size="90px"
        >
          <span class="absolute uppercase text-caps-3 text-neutral-100">
            {{ attachType }}
          </span>
        </q-icon>
      </q-avatar>

      <div class="flex flex-col">
        <span class="text-headline-3">{{ data.anexo_nome }}</span>
        <p class="text-paragraph-3 text-neutral-60 dark:text-white/40">
          {{ data.anexo_tamanho }}
        </p>
      </div>
    </div>

    <div class="flex gap-6 pr-6">
      <OButton
        class="font-normal w-32 h-32 grid place-content-center bg-white/10 dark:!border-transparent text-neutral-100/40"
        secondary
        icon="svguse:/icons.svg#icon_view"
        icon-size="1.25rem"
        :href="data.anexo"
        target="_blank"
        v-if="hasImage"
      ></OButton>

      <OButton
        class="font-normal w-32 h-32 grid place-content-center bg-white/10 dark:!border-transparent text-neutral-100/40"
        secondary
        icon="svguse:/icons.svg#icon_download"
        icon-size="1.25rem"
        @click="GLOBAL.blobDownloadFile(data.anexo, data.anexo_nome)"
      ></OButton>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'

const props = defineProps({
  data: Object,
  hasImage: Boolean,
})

// Separando o formato do arquivo
const attachName = ref(props.data.anexo_nome)
const attachType = attachName.value?.split('.').at(-1)
</script>

<style lang="sass">
.attachment-card
  .q-card
    border: 1px solid rgba(1, 7, 27, 0.1)
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06)
</style>
