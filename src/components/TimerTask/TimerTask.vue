<template>
  <div
    class="border border-neutral-100/10 rounded-[3px] p-6 flex items-center transition timer-task"
    :class="{ idle: idle, is_playing: is_playing, hasStarted: hasStarted }"
    @click="handlePlay"
  >
    <q-icon
      class="mr-6 cursor-pointer dark:[--cor-bg:_rgba(18,18,18,1)]"
      :name="playPausebtn"
      size="28px"
    >
    </q-icon>
    <div class="text-timer text-headline-3">
      {{ GLOBAL.FTime(taskState.tempo_total) }}
    </div>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import { reactive, computed, watch } from 'vue'

const emit = defineEmits(['click:timer'])

const props = defineProps({
  task: Object,
})

watch(
  () => props,
  () => (taskState.value = { ...props.task })
)

// STATE
const taskState = reactive({
  tempo_total: props.task.tempo_total,
  is_playing: props.task.is_playing,
})

// COMPUTED
const is_playing = computed(() => {
  return taskState.is_playing
})

const hasStarted = computed(() => props.task.tempo_total !== '00:00:00')

const idle = computed(() => {
  return !hasStarted.value && !taskState.is_playing
})

const playPausebtn = computed(() => {
  return taskState.is_playing
    ? 'svguse:/icons.svg#icon_pause'
    : 'svguse:/icons.svg#icon_play'
})

const idleText = computed(() => {
  return !hasStarted.value && !taskState.is_playing ? '' : ''
})

// METHODS
const handlePlay = (v) => {
  if (!hasStarted.value && !taskState.is_playing) {
    hasStarted.value = true
    taskState.is_playing = true
  } else if (hasStarted.value && !taskState.is_playing) {
    taskState.is_playing = true
  } else {
    taskState.is_playing = false
  }
  emit('click:timer', props.task)
}
</script>

<style scoped lang="sass">

.idle
  background: rgba(var(--neutral-100), 0.05)
  color: rgba(var(--neutral-100), 1)
  border: 1px solid  rgba(var(--neutral-100), 0.05)
.is_playing
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



.timer-task.is_playing
  --border-size: 1px
  --border-angle: 0turn
  background-image: conic-gradient( from var(--border-angle), rgba(var(--alert-error-10),1), rgba(var(--alert-error-10),1) 50%, rgba(var(--alert-error-10),1) ), conic-gradient(from var(--border-angle), transparent 20%, transparent, rgb(var(--alert-error))) !important
  background-size: calc(100% - (var(--border-size) * 2)) calc(100% - (var(--border-size) * 2)), cover !important
  background-position: center center !important
  background-repeat: no-repeat !important

  animation: bg-spin 3s linear infinite !important

  &:hover
    animation-play-state: paused

@property --border-angle
  syntax: "<angle>"
  inherits: true
  initial-value: 0turn

@keyframes bg-spin
  to
    --border-angle: 1turn
</style>
