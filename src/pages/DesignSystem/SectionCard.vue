<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Card com titulo</h1>
        <OCard />
        <syntax-highlight :code="code"></syntax-highlight>
      </div>
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import OCard from 'src/components/Card/OCard.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'

const code = ``
</script>
