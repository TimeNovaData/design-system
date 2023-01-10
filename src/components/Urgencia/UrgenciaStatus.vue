<template>
  <div
    class="item text-headline-4 rounded-[3px] py-[2.5px]"
    :class="bgDynamically"
  >
    {{ text }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
    validator(value) {
      // The value must match one of these strings
      return ['Urgente', 'Tranquila', 'Moderada'].includes(value)
    },
    default: 'Tranquila',
  },
})

const bgDynamically = computed(() => {
  let bg = ''
  if (props.text === 'Urgente') {
    bg = 'text-alert-error bg-alert-error/10'
  } else if (props.text === 'Moderada') {
    bg = 'custom-warning-color bg-alert-warning-10'
  } else {
    bg = 'text-alert-success bg-alert-success/10'
  }
  return bg
})
</script>

<style lang="sass">
.item
  max-width: 128px
  width: 100%
  text-align: center

.custom-warning-color
 color: rgba(133, 111, 0, 1)
</style>
