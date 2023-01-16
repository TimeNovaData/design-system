<template>
  <article
    class="p-8 border border-neutral-100/10 dark:border-white/10 rounded-generic flex gap-8 dark:hover:bg-white/5 hover:bg-neutral-20 transition bg-white shadow-sm dark:!bg-d-neutral-20"
  >
    <AnexoIcon ext="ai" />

    <div class="flex flex-gap flex-col flex-1">
      <p class="text-headline-3 one-line">Foto do Adriano bem meiga</p>
      <div class="mt-auto">
        <p class="text-headline-4 text-neutral-70 dark:text-white/70">
          Manual.jpg
        </p>
        <p class="text-headline-4 text-neutral-60 dark:text-white/60">132KB</p>
      </div>
    </div>

    <div class="flex gap-8 h-full items-center self-center">
      <OButton secondary class="!p-0 w-40 h-40">
        <q-icon name="svguse:/icons.svg#icon_eye"></q-icon>
      </OButton>

      <OButton secondary class="!p-0 w-40 h-40">
        <q-icon name="svguse:/icons.svg#icon_download"></q-icon>
      </OButton>
    </div>
  </article>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import AnexoIcon from './AnexoIcon.vue'

defineProps({
  ext: String,
})
</script>

<style lang="scss" scoped></style>
