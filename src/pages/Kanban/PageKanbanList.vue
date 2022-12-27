<template>
  <q-card class="m-16">
    <div class="flex gap-8 items-center">
      <OButton size="md" v-for="item in colunasWithCards" :key="item.coluna.id">
        {{ item.coluna.nome }} <q-badge> {{ item.cards.length }} </q-badge>
      </OButton>
    </div>
    <OTable class="mx-6 mt-6"></OTable>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OTable from 'src/components/Table/OTable.vue'
import { inject } from 'vue'

const colunasWithCards = inject('colunasWithCards')
</script>

<style lang="scss" scoped></style>
