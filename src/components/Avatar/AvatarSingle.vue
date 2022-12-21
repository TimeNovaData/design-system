<template>
  <q-avatar
    size="32px"
    class="overlapping !w-32 !h-32 absolute border-white border-2 dark:border-d-neutral-10 overflow-hidden"
    :style="`${side}: ${index * 15}px;  'z-index':-${index}`"
  >
    <q-img
      :no-spinner="true"
      :src="href ? href : imgSrc(item.foto)"
      class="w-full h-full m-auto absolute inset-0"
    />
    <slot></slot>
  </q-avatar>
</template>

<script setup>
defineProps({
  item: Object,
  index: Number,
  href: String,
  side: {
    type: String,
    default: 'right',
  },
})
function imgSrc(url) {
  if (!url) return ''
  const haveMedia = url.includes('/media')
  if (process.env.development && haveMedia) {
    return `${process.env.BACKEND_URL}${url.replace('/', '')}`
  } else {
    return url
  }
}
</script>

<style lang="scss" scoped></style>
