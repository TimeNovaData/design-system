<template>
  <q-chip
    v-bind="attrs"
    :style="styleChip()"
    :data-size="attrs.size"
    :size="null"
  >
    <q-badge class="shrink-0 w-8 h-8" v-if="attrs.badge" rounded :style="styleBadge"></q-badge>

    <slot name="content"></slot>
  </q-chip>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs, watch, ref } from 'vue'
import { useQuasar } from 'quasar'

const slots = useSlots()
const attrs = useAttrs()
const $q = useQuasar()

const styleChip = () => ({
  color: `${
    attrs.color
      ? `${
          $q.dark.isActive
            ? 'rgba(var(--white), 0.9)'
            : `rgba(var(${attrs.color}), 1)`
        }`
      : `rgba(var(${attrs.bg}), 1)`
  }`,
  background: `rgba(var(${attrs.bg}), 0.1)`
  
})

const styleBadge = {
  background: `rgba(var(${attrs.bg}), 1)`
}
</script>

<style lang="scss" scoped></style>
