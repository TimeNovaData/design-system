<template>
  <span v-bind="attrs" class="o-counter" :style="styleObj">
    <slot></slot>
  </span>
</template>

<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  bg: String,
  color: String,
})

const styleObj = {
  background: `rgba(${props.bg}, 1)`,
  color: `rgba(${props.color}, 1)`,
}

const attrs = useAttrs()
</script>

<style lang="sass" scoped>
.o-counter
  display: grid
  place-items: center
  text-align: center
  width: 1rem
  height: 1rem
  border-radius: 50%
  line-height: 1
  border: border 1px solid rgba(var(--neutral-100), 0.3)
  font-size: 10px
  font-weight: 600
  user-select: none
</style>
