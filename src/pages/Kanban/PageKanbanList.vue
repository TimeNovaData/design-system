<template>
  <q-card class="m-16">
    <div class="flex gap-8 items-center px-6 pt-6">
      <OButton
        secondary
        size="md"
        v-for="item in colunasWithCards"
        :key="item.coluna.id"
        :class="`${active === item.coluna.id ? 'active' : ''}`"
        @click="active = item.coluna.id"
        class="text-neutral-100/70"
      >
        {{ item.coluna.nome }}
        <q-badge
          class="bg-neutral-100/10 text-neutral-100 w-20 h-20 shrink-0 dark:bg-white/10 dark:text-white/80 font-semibold"
          :class="`${
            active === item.coluna.id
              ? '!bg-primary-pure/10 !text-primary-pure'
              : ''
          }`"
          rounded
        >
          <p class="block m-auto">{{ item.cards.length }}</p>
        </q-badge>
      </OButton>
    </div>
    <OTable :columns="columns1" class="mx-6 mt-6"></OTable>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OTable from 'src/components/Table/OTable.vue'
import { inject, ref } from 'vue'
import { columns1 } from './columns.js'
const colunasWithCards = inject('colunasWithCards')

const active = ref(1)
</script>

<style lang="scss" scoped></style>
