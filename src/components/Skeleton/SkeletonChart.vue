<template>
  <div
    class="flex border-b border-l border-neutral-100/10 dark:border-white/10"
  >
    <div
      class="flex flex-1 w-full h-full px-16 items-end justify-evenly flex-nowrap gap-8"
    >
      <q-skeleton
        v-once
        v-for="n in 18"
        :key="n"
        width="48px"
        :height="Math.random() * 100 + 'px'"
        class="!rounded-[3px_3px_0_0] transition-[height] duration-300"
        :duration="2000"
      />
    </div>
  </div>
</template>

<script setup>
import { onUpdated } from 'vue'

onUpdated(() => {
  window._red('update')
})
</script>

<style lang="scss" scoped></style>
