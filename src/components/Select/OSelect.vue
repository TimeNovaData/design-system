<template>
  <q-select
    ref="componentRef"
    :class="'size-' + attrs.size"
    v-bind="attrs"
    :size="null"
    popup-content-class="select-menu"
    options-selected-class="option-selecionada"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </q-select>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs, ref, onMounted } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
const componentRef = ref(null)

defineExpose({ componentRef })
</script>

<style lang="sass">
.q-item
  &.option-selecionada
    color: inherit
    position: relative
    padding-right: 2rem
    &:after
      content: ''
      display: block
      position: absolute
      top: 0
      bottom: 0
      right: .3125rem
      margin: auto 0
      width: 1.5rem
      height: 1.5rem
      background-position: center
      background-size: 1.5rem
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjkwMDEgMzUuMDk5OEMxOC43MDAxIDM1LjA5OTggMTguNTE2OCAzNS4wNjY1IDE4LjM1MDEgMzQuOTk5OEMxOC4xODM0IDM0LjkzMzEgMTguMDE2OCAzNC44MTY1IDE3Ljg1MDEgMzQuNjQ5OEw4LjgwMDEgMjUuNTk5OEM4LjUwMDEgMjUuMjk5OCA4LjM1MDEgMjQuOTMzMSA4LjM1MDEgMjQuNDk5OEM4LjM1MDEgMjQuMDY2NSA4LjUwMDEgMjMuNjk5OCA4LjgwMDEgMjMuMzk5OEM5LjEwMDEgMjMuMDk5OCA5LjQ1MDEgMjIuOTQ5OCA5Ljg1MDEgMjIuOTQ5OEMxMC4yNTAxIDIyLjk0OTggMTAuNjAwMSAyMy4wOTk4IDEwLjkwMDEgMjMuMzk5OEwxOC45MDAxIDMxLjM5OThMMzcuMDUwMSAxMy4yNDk4QzM3LjM1MDEgMTIuOTQ5OCAzNy43MDg0IDEyLjc5OTggMzguMTI1MSAxMi43OTk4QzM4LjU0MTggMTIuNzk5OCAzOC45MDAxIDEyLjk0OTggMzkuMjAwMSAxMy4yNDk4QzM5LjUwMDEgMTMuNTQ5OCAzOS42NTAxIDEzLjkwODEgMzkuNjUwMSAxNC4zMjQ4QzM5LjY1MDEgMTQuNzQxNSAzOS41MDAxIDE1LjA5OTggMzkuMjAwMSAxNS4zOTk4TDE5Ljk1MDEgMzQuNjQ5OEMxOS43ODM0IDM0LjgxNjUgMTkuNjE2OCAzNC45MzMxIDE5LjQ1MDEgMzQuOTk5OEMxOS4yODM0IDM1LjA2NjUgMTkuMTAwMSAzNS4wOTk4IDE4LjkwMDEgMzUuMDk5OFoiIGZpbGw9IiMwNkY3ODQiLz4KPC9zdmc+Cg==)

.q-select--multiple
  .q-field__native
    gap: 2px
    padding: 4px 2px 2px
</style>
