<template>
  <q-card
    class="attachment-file flex items-center justify-between px-8 py-10 bg-white/5"
  >
    <div class="flex gap-8">
      <q-avatar class="w-40 h-40 rounded-sm" color="primary">
        <img v-if="hasImage" :src="file.src" />
        <span v-else class="absolute uppercase text-caps-3 text-neutral-100">
          Jpg
        </span>
      </q-avatar>

      <div class="flex flex-col">
        <span class="text-headline-3">{{ file.name }}</span>
        <p class="text-paragraph-3 text-neutral-60 dark:text-white/40">
          {{ file.size }}
        </p>
      </div>
    </div>

    <div class="flex gap-6 pr-6">
      <OButton
        class="font-normal w-32 h-32 grid place-content-center bg-white/10 dark:!border-transparent"
        size="sm"
        height="sm"
        secondary
        icon="svguse:/icons.svg#icon_view"
        v-if="hasImage"
      ></OButton>

      <OButton
        class="font-normal w-32 h-32 grid place-content-center bg-white/10 dark:!border-transparent"
        size="sm"
        height="sm"
        secondary
        icon="svguse:/icons.svg#icon_donwload"
      ></OButton>
    </div>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'

defineProps({
  file: Object,
  hasImage: Boolean,
})
</script>

<style lang="sass">
.attachment-card
  .q-card
    border: 1px solid rgba(1, 7, 27, 0.1)
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06)

  .q-icon > svg
    width: 1.25rem
    height: 1.25rem
</style>
