<template>
  <div
    class="border border-neutral-100/10 rounded-[3px] p-6 flex items-center transition"
    :class="{ idle: idle, isPlaying: isPlaying, hasStarted: hasStarted }"
  >
    <q-icon
      @click="handlePlay"
      class="mr-6 cursor-pointer dark:[--cor-bg:_rgba(18,18,18,1)]"
      :name="playPausebtn"
      size="28px"
    >
    </q-icon>
    <div class="text-timer text-headline-3">{{ taskStaste.timer }}</div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

// STATE
const taskStaste = reactive({
  timer: '00h 12m',
  hasStarted: false,
  isPlaying: false,
})

// COMPUTED
const isPlaying = computed(() => {
  return taskStaste.isPlaying
})
const hasStarted = computed(() => {
  return taskStaste.hasStarted && !taskStaste.isPlaying
})

const idle = computed(() => {
  return !taskStaste.hasStarted && !taskStaste.isPlaying
})

const playPausebtn = computed(() => {
  return taskStaste.isPlaying
    ? 'svguse:/icons.svg#icon_pause'
    : 'svguse:/icons.svg#icon_play'
})

const idleText = computed(() => {
  return !taskStaste.hasStarted && !taskStaste.isPlaying ? '' : ''
})

// METHODS
const handlePlay = () => {
  if (!taskStaste.hasStarted && !taskStaste.isPlaying) {
    taskStaste.hasStarted = true
    taskStaste.isPlaying = true
  } else if (taskStaste.hasStarted && !taskStaste.isPlaying) {
    taskStaste.isPlaying = true
  } else {
    taskStaste.isPlaying = false
  }
}
</script>

<style scoped lang="sass">

.idle
  background: rgba(var(--neutral-100), 0.05)
  color: rgba(var(--neutral-100), 1)
  border: 1px solid  rgba(var(--neutral-100), 0.05)
.isPlaying
  background: rgba(var(--alert-error), 0.1)
  color: rgba(var(--alert-error))
  border: 1px solid rgba(var(--alert-error), 0.1)
.hasStarted
  background: rgba(var(--primary-pure), 0.1)
  color: rgba(var(--primary-pure), 1)
  border: 1px solid rgba(var(--primary-pure), 0.1)


.body--dark
  .idle
    background: rgba(var(--white), 0.05)
    color: rgb(var(--white))
    border: 1px solid  rgba(var(--white), 0.1)
</style>
