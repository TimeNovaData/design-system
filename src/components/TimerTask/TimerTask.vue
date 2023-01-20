<template>
  <div
    class="border border-neutral-100/10 rounded-[3px] p-6 flex items-center transition timer-task w-120"
    :class="{ idle: idle, is_playing: is_playing, hasStarted: hasStarted }"
    @click="handlePlay"
  >
    <q-icon
      class="mr-6 cursor-pointer dark:[--cor-bg:_rgba(18,18,18,1)]"
      :name="playPausebtn"
      :size="size"
    >
    </q-icon>
    <div class="text-timer text-headline-3 mx-auto">
      {{ GLOBAL.FTime(taskState.tempo_ao_vivo_formatado_hora_minuto_segundo) }}
    </div>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import { reactive, computed, watch, inject, ref } from 'vue'

const emit = defineEmits(['click:timer'])

const taskActive = inject('taskActive')

const props = defineProps({
  task: Object,
  size: {
    type: String,
    default: '28px',
  },
})

watch(
  () => props.task,
  () => (taskState.value = { ...props.task }),
  {
    deep: true,
  }
)

// STATE
const taskState = ref({
  tempo_ao_vivo_formatado_hora_minuto_segundo:
    props.task.tempo_ao_vivo_formatado_hora_minuto_segundo,
  is_playing: props.task.is_playing,
})

// COMPUTED
const is_playing = computed(() => {
  return taskActive.value.id === props.task.id
})

const hasStarted = computed(
  () =>
    GLOBAL.zeroPad(
      props.task.tempo_ao_vivo_formatado_hora_minuto_segundo,
      8
    ) !== '00:00:00'
)
// const hasStarted = computed(() => taskState.value.is_playing)

const idle = computed(() => {
  return !hasStarted.value && !is_playing.value
})

const playPausebtn = computed(() => {
  return is_playing.value
    ? 'svguse:/icons.svg#icon_pause'
    : 'svguse:/icons.svg#icon_play'
})

const idleText = computed(() => {
  return !hasStarted.value && !taskState.value.is_playing ? '' : ''
})

// METHODS
const handlePlay = (v) => {
  let taskMod
  window._big(is_playing.value)
  if (is_playing.value) {
    taskMod = {}
    taskActive.value = {}
  } else {
    taskMod = { ...props.task }
  }

  emit('click:timer', taskMod)
}

// const formatDay = (v) => {
//   const firstIndex = v.indexOf(':')
//   const lastIndex = v.lastIndexOf(':')

//   const timeFinal = v
//     .slice(0, firstIndex)
// }
</script>

<style scoped lang="sass">

.idle
  background: rgba(var(--neutral-100), 0.05)
  color: rgba(var(--neutral-100), 1)
  border: 1px solid  rgba(var(--neutral-100), 0.05)
.is_playing
  background: rgba(var(--alert-error), 0.1) !important
  color: rgba(var(--alert-error)) !important
  border: 1px solid rgba(var(--alert-error), 0.1) !important
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


.body--dark
  .timer-task.is_playing
    background-image: conic-gradient( from var(--border-angle), #2e1b1b, #2e1b1b 50%, #2e1b1b ), conic-gradient(from var(--border-angle), transparent 20%, transparent, rgb(var(--alert-error))) !important
</style>
