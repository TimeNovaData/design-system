<template>
  <div class="h-full">
    <div
      class="flex border-b border-l border-neutral-100/10 dark:border-white/10 flex-1"
    >
      <div
        class="flex flex-[1_1_auto] w-full h-full px-16 items-end justify-evenly flex-nowrap gap-8"
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
    <div class="flex justify-center gap-6 mt-24 flex-[0]">
      <q-skeleton v-for="n in 4" :key="n" v-once width="90px" height="20px" />
    </div>
  </div>
</template>

<script setup>
import { onUpdated } from 'vue'
</script>

<style lang="scss" scoped></style>
