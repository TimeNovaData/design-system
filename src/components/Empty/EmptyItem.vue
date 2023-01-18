<template>
  <div
    class="text-paragraph-2 text-center m-auto !h-full flex-1 flex flex-col justify-center"
  >
    <q-icon
      class="block mx-auto opacity-30"
      name="fluorescent"
      size="2.5rem"
    ></q-icon>
    <p class="opacity-40">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Nada aqui.',
  },
})
</script>

<style lang="scss" scoped></style>
