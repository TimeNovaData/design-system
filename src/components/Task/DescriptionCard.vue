<template>
  <q-card class="flex-1 p-24">
    <p class="text-paragraph-2 text-neutral-70">
      {{ description || 'Sem descrição' }}
    </p>
  </q-card>
</template>

<script setup>
defineProps({
  description: String,
})
</script>

<style lang="sass" scoped></style>
