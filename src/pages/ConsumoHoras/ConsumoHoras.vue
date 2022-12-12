<template>
  <q-page class="pt-24 px-48 pb-48">
    <div class="flex items-center justify-between">
      <TextIcon text="Horas Consumidas" icon="svguse:/icons.svg#icon_horas" />
      <OButton primary size="md" icon="svguse:/icons.svg#icon_filtros"
        >Filtros</OButton
      >
    </div>

    <q-card class="p-16 mt-24 dark:border-white/10 dark:border overflow-hidden">
      <div class="flex justify-between">
        <TextIcon
          class="text-title-4"
          text="Investimento Diário"
          icon="svguse:/icons.svg#icon_date_time"
        />

        <div class="flex items-center gap-6">
          <p class="mr-6 text-caps-3">visualizando por:</p>
          <OButton
            class="text-neutral-70"
            :class="{ active: por === 'projeto' }"
            size="md"
            secondary
            @click="por = 'projeto'"
            >Projeto</OButton
          >
          <OButton
            class="text-neutral-70"
            :class="{ active: por === 'subprojeto' }"
            size="md"
            secondary
            @click="por = 'subprojeto'"
            >Subprojeto</OButton
          >
          <OButton
            class="text-neutral-70"
            :class="{ active: por === 'usuario' }"
            size="md"
            secondary
            @click="por = 'usuario'"
            >Usuário</OButton
          >
        </div>
      </div>
      <div class="w-full">
        <apexchart
          width="100%"
          height="200px"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
      <div class="inline-flex mx-auto items-center w-full justify-center">
        <OBadge
          square
          size="md"
          :badge="true"
          class="!px-6 !bg-white border !border-neutral-100/10 dark:!bg-white/5"
          badgeColor="var(--primary-pure)"
        >
          <template #content> Herbarium </template></OBadge
        >
      </div>
    </q-card>

    <q-card class="p-16 mt-16 dark:border-white/10 dark:border overflow-hidden">
      <TextIcon
        class="text-title-4"
        text="Tempo por atividade"
        icon="svguse:/icons.svg#icon_tempo_atividade"
      />

      <OTable
        :filter="filter"
        :rows="rows"
        :columns="columns"
        row-key="name"
        primary
      >
        <template v-slot:top-left>
          <OInput
            size="md"
            debounce="300"
            v-model="filter"
            placeholder="Pesquise por nome, tipo..."
            class="no-label"
          >
            <template v-slot:append>
              <o-button size="md" tertiary> <q-icon name="search" /></o-button>
            </template>
          </OInput>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <div class="flex gap-8 items-center">
                <q-avatar size="2rem">
                  <img
                    src="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/01/272659509_640826040498160_305754906527072885_n-e1643549776803.jpg?w=876&h=484&crop=1"
                    alt=""
                  />
                </q-avatar>
                <div class="flex flex-col">
                  <p class="text-paragraph-2">
                    {{ props.row.name }}
                  </p>
                  <p
                    class="text-paragraph-3 text-neutral-70 dark:text-white/50"
                  >
                    Colaborador
                  </p>
                </div>
              </div>
            </q-td>
            <q-td key="calories" :props="props">
              {{ props.row.calories }}
            </q-td>
            <q-td key="fat" :props="props">
              {{ props.row.fat }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
            </q-td>
            <q-td key="protein" :props="props">
              {{ props.row.protein }}
            </q-td>
            <q-td key="sodium" :props="props" :auto-width="true">
              <o-button class="mx-16" size="sm" primary
                >Adicionar ao carrinho</o-button
              >
            </q-td>
            <q-td key="calcium" :props="props">
              <o-badge size="sm"
                ><template #content>{{ props.row.calcium }}</template></o-badge
              >
            </q-td>
            <q-td key="iron" :props="props">
              <o-button
                size="sm"
                secondary
                icon="search"
                class="shadow-sm !p-0 w-32 h-32"
              >
              </o-button>
            </q-td>
          </q-tr>
        </template>
      </OTable>
    </q-card>
  </q-page>
</template>

<script setup>
import TextIcon from 'src/components/Text/TextIcon.vue'
import OButton from 'src/components/Button/OButton.vue'
import { ref } from 'vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OTable from 'src/components/Table/OTable.vue'
import UseConsumoHoras from 'src/composables/useConsumoHoras'
import OInput from 'src/components/Input/OInput.vue'

const por = ref('projeto')
const { columns, rows, filter } = UseConsumoHoras()

const options = {
  chart: {
    id: 'vuechart-example',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  dataLabels: { enabled: false },
}
const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
]
</script>
