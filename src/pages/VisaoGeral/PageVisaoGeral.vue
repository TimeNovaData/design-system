<template>
  <q-scroll-area>
    <div class="m-48">
      <q-card class="dark:border-white/10 dark:border overflow-hidden">
        <div class="flex justify-between p-16">
          <TextIcon
            class="text-title-4"
            text="Meus Projetos"
            icon="svguse:/icons.svg#icon_file_cursor"
          />

          <div class="flex items-center gap-6">
            <p class="mr-6 text-caps-3">visualizando por:</p>
            <OButton
              class="text-neutral-70"
              :class="{ active: projectFilter === 'recorrente' }"
              size="md"
              secondary
              @click="handleChangeprojectFilter('recorrente')"
              >Recorrente</OButton
            >
            <OButton
              class="text-neutral-70"
              :class="{ active: projectFilter === 'one_shot' }"
              size="md"
              secondary
              @click="handleChangeprojectFilter('one_shot')"
              >One Shot</OButton
            >
          </div>
        </div>

        <div
          class="grid grid-cols-4 gap-16 p-16 pt-0 border-b border-neutral-100/10"
        >
          <VisaoGeralCard
            cardTitle="Total de projetos abertos"
            cardValue="120"
          />
          <VisaoGeralCard cardTitle="Meus Projetos Abertos" cardValue="25" />
          <VisaoGeralCard
            cardTitle="Meus projetos atrasados"
            cardValue="30"
            cardType="error"
          />
          <VisaoGeralCard
            cardTitle="Meus projetos desuatualizados"
            cardValue="30"
            cardType="error"
          />
        </div>

        <VisaoGeralTable />
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import VisaoGeralCard from 'src/components/VisaoGeral/VisaoGeralCard.vue'
import VisaoGeralTable from 'src/components/VisaoGeral/VisaoGeralTable.vue'

const projectFilter = ref('recorrente')

function handleChangeprojectFilter(type) {
  projectFilter.value = type
}
</script>

<style lang="sass" scoped></style>
