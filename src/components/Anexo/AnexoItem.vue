<template>
  <article
    class="p-8 border border-neutral-100/10 dark:border-white/10 rounded-generic flex gap-8 dark:hover:bg-white/5 hover:bg-neutral-20 transition bg-white shadow-sm dark:!bg-d-neutral-20 relative group"
  >
    <AnexoIcon :ext="ext" :thumb="thumb" />

    <div class="flex flex-gap flex-col flex-1">
      <p class="text-headline-3 one-line">{{ nome }}</p>
      <div class="mt-auto">
        <p class="text-headline-4 text-neutral-70 dark:text-white/70">
          {{ ext }}
        </p>
        <p class="text-headline-4 text-neutral-60 dark:text-white/60">
          {{ size }}
        </p>
      </div>
    </div>

    <div class="flex gap-8 h-full items-center self-center">
      <OButton
        secondary
        class="!p-0 w-40 h-40"
        :href="link"
        target="_blank"
        disabled
      >
        <q-icon name="svguse:/icons.svg#icon_eye"></q-icon>
      </OButton>

      <OButton
        secondary
        class="!p-0 w-40 h-40"
        @click="GLOBAL.blobDownloadFile(anexo, nome)"
      >
        <q-icon name="svguse:/icons.svg#icon_download"></q-icon>
      </OButton>

      <q-icon
        name="svguse:/icons.svg#icon_plus_circle"
        class="text-alert-error rotate-45 w-24 h-24 rounded-full absolute left-0 -top-12 transition-all cursor-pointer bg-neutral-10 dark:bg-d-neutral-40 opacity-0 group-hover:opacity-100"
        v-if="deleteFn"
        @click="deleteFn"
      ></q-icon>
    </div>
  </article>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'
import AnexoIcon from './AnexoIcon.vue'

defineProps({
  ext: String,
  link: String,
  thumb: String,
  size: String,
  nome: String,
  deleteFn: Function,
})
</script>

<style lang="scss" scoped></style>
