<template>
  <div class="flex items-center gap-10">
    <OButton
      size="sm"
      icon-size="1rem"
      secondary
      @click="$emit('today')"
      icon="calendar_today"
      >Hoje</OButton
    >
    <OButton
      size="sm"
      secondary
      icon="chevron_left"
      @click="$emit('prev')"
      icon-size="1rem"
      class="!h-32 !w-32 !p-0"
    ></OButton>
    <OButton
      size="sm"
      secondary
      icon-right="chevron_right"
      @click="$emit('next')"
      icon-size="1rem"
      class="!h-32 !w-32 !p-0"
    ></OButton>
  </div>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'

const emit = defineEmits(['today', 'prev', 'next'])
</script>

<style lang="scss" scoped></style>
