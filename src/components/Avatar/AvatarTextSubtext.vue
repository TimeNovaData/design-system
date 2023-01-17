<template>
  <div class="flex items-center gap-4 px-16 py-6 flex-nowrap">
    <OAvatar size="32px" :foto="foto"></OAvatar>
    <div class="flex flex-col">
      <p class="text-paragraph-2 one-line">
        {{ titulo }}
      </p>
      <span
        v-if="subtitle"
        class="text-neutral-60 text-paragraph-3 dark:text-white/60"
        >{{ subtitle }}</span
      >
    </div>
  </div>
</template>

<script setup>
import OAvatar from './OAvatar.vue'

defineProps({
  titulo: String,
  subtitle: String,
  foto: String,
})
</script>

<style lang="sass" scoped></style>
