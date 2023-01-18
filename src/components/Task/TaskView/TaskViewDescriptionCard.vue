<template>
  <q-card class="flex-1 p-24 dark:bg-d-neutral-10">
    <p
      v-if="description"
      class="text-paragraph-2 text-neutral-70 dark:text-white/70"
      v-html="description"
    ></p>

    <div v-else class="flex place-content-center h-full">
      <div class="flex flex-col gap-6 opacity-30 dark:opacity-40">
        <q-icon class="block mx-auto" name="fluorescent" size="2.5rem"></q-icon>
        <p>Sem Descrição</p>
      </div>
    </div>
  </q-card>
</template>

<script setup>
defineProps({
  description: String,
})
</script>

<style lang="sass" scoped></style>
