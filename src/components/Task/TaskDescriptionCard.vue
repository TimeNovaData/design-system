<template>
  <q-card class="flex-1 p-24 dark:bg-d-neutral-10">
    <p
      v-if="description"
      class="text-paragraph-2 text-neutral-70 dark:text-white/70"
    >
      {{ description }}
    </p>

    <div v-else class="flex place-content-center h-full">
      <p>Sem Descrição</p>
    </div>
  </q-card>
</template>

<script setup>
defineProps({
  description: String,
})
</script>

<style lang="sass" scoped></style>
