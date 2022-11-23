<template>
  <q-card class="kanban-card shadow-md p-6 dark:bg-d-neutral-40">

    <div class="flex flex-wrap gap-4 mb-6">
      <OBadge size="sm" :badge="true" bg="--alert-warning" label="Front End" square></OBadge>

    </div>
    <p class="text-paragraph-2">Nome do chamado com um nome maior do que o normal</p>

    <slot></slot>
  </q-card>
</template>

<script setup>
import OBadge from 'src/components/OBadge.vue';

</script>

<style lang="sass" scoped>

</style>
