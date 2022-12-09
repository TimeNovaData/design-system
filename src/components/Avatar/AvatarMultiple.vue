<template>
  <div class="h-32">
    <q-avatar
      v-for="n in items"
      :key="n"
      size="32px"
      class="overlapping w-32 h-32 absolute border-white border-2 dark:border-d-neutral-10 overflow-hidden"
      :style="`left: ${n * 25 - 25}px`"
    >
      <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
    </q-avatar>
  </div>
</template>

<script setup>
defineProps({
  items: [Array, Number],
})
</script>

<style lang="scss" scoped></style>
