<template>
  <q-avatar
    size="32px"
    class="overlapping !w-32 !h-32 absolute border-white border-2 dark:border-d-neutral-10 overflow-hidden avatar bg-neutral-20 dark:bg-d-neutral-40"
    :style="`${side}: ${index * 20}px;  'z-index':-${index}`"
    :class="{ '!static': estatic }"
  >
    <q-img
      :no-spinner="true"
      :src="href ? href : item?.foto"
      class="w-full h-full m-auto absolute inset-0"
      :class="{ '!relative': estatic }"
      :no-transition="true"
    />
    <q-tooltip
      v-if="nome"
      v-bind="{
        anchor: 'top middle',
        self: 'bottom middle',
        offset: [10, 10],
      }"
      >{{ nome }}</q-tooltip
    >
    <slot></slot>
  </q-avatar>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import { onUnmounted } from 'vue'

defineProps({
  item: Object,
  index: Number,
  href: String,
  nome: String,
  estatic: Boolean,
  length: Number,
  side: {
    type: String,
    default: 'right',
  },
})
</script>

<style lang="sass" scoped>
.avatar.ajuste-img :deep(img)
  width: calc(100% - 3px)
  height: calc(100% - 3px)
</style>
