<template>
  <div class="w-72 h-72 relative grid place-items-center" v-if="!thumb">
    <p
      class="text-caps-1 absolute m-auto text-neutral-100 z-10 inset-0 w-max h-max"
    >
      {{ ext }}
    </p>
    <q-icon
      name="svguse:/icons.svg#icon_file"
      class="w-full h-full text-primary-pure"
    ></q-icon>
  </div>
  <div v-else class="w-72 h-72 relative overflow-hidden rounded-generic">
    <q-img :src="thumb" class="w-full h-full absolute inset-0 m-aut0" />
  </div>
</template>

<script setup>
defineProps({
  ext: String,
  thumb: String,
})
</script>

<style lang="scss" scoped></style>
