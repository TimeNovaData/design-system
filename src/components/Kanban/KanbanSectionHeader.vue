<template>
  <div class="flex flex-col text-neutral-70 dark:text-white/80" :class="fonte">
    <div class="inline-flex gap-4 items-center">
      <q-icon size="20px" :name="icon" class="opacity-40"></q-icon>
      <p class="">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  text: String,
  fonte: {
    type: String,
    default: 'text-paragraph-2 ',
  },
})
</script>

<style lang="sass" scoped></style>
