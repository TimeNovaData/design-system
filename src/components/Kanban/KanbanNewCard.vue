<template>
  <q-card
    class="kanban-card shadow-md p-6 dark:bg-d-neutral-40 hover:cursor-pointer overflow-hidden"
  >
    <OInput
      size="md"
      type="textarea"
      primary
      class="!min-h-40"
      v-model="newCardData.nome"
    ></OInput>
    <div class="flex items-center gap-8 mt-8">
      <OButton size="md" tertiary icon="close"> </OButton>
      <OButton class="!min-w-[100px]" size="md" primary>Criar </OButton>
    </div>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { ref } from 'vue'

const newCardData = ref({
  nome: '',
  projeto: '',
})
</script>

<style lang="scss" scoped></style>
