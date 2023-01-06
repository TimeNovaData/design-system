<template>
  <div class="border border-neutral-100/10 rounded-[3px] p-6 flex items-center">
    <q-icon class="mr-6" name="svguse:/icons.svg#icon_play" size="28px">
    </q-icon>
    <div>{{ taskStaste.timer }}</div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const taskStaste = reactive({
  timer: '00:00',
  hasStarted: false,
  isPlaying: false,
})
const timerStyle = computed(() => {
  return taskStaste.isPlaying
})
console.log(timerStyle)
console.log(taskStaste)
</script>

<style scoped lang="sass"></style>
