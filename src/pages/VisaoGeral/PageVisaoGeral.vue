<template>
  <q-scroll-area>
    <div class="m-48">
      <q-card class="dark:bg-d-neutral-20 overflow-hidden">
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
          class="grid grid-cols-4 gap-16 p-16 pt-0 border-b border-neutral-100/10 dark:border-white/10"
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

        <VisaoGeralTable
          :rows="projectFilter === 'recorrente' ? rowsRecorrente : rowsOneShot"
          :columns="columns"
        />
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import VisaoGeralCard from 'src/components/VisaoGeral/VisaoGeralCard.vue'
import VisaoGeralTable from 'src/components/VisaoGeral/VisaoGeralTable.vue'

const projetos = inject('projetos')

const projectFilter = ref('recorrente')

function handleChangeprojectFilter(type) {
  projectFilter.value = type
}

console.log(projetos)

function setRowData(item) {
  return {
    id: item.id,
    projeto: item.nome,
    cliente: item.nome_cliente,
    responsavel: {
      nome: 'Marlon',
      foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    },
    responsavel_atendimento: {
      nome: 'Marlon Victor',
      foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    },
    data_entrega: '10/10/2022 - 17h 21m',
    ultimo_acompanhamento: '10/10/2022 - 17h 21m',
    status: 'Atrasado',
    chamado_pendentes: 10,
    tasks_pendentes: 11,
  }
}

const rowsRecorrente = computed(() => {
  const filtered = projetos.value.filter((item) => item.status === 'Recorrente')
  return filtered.map(setRowData)
})

const rowsOneShot = computed(() => {
  const filtered = projetos.value.filter((item) => item.status === 'Em Aberto')
  return filtered.map(setRowData)
})

const columns = [
  {
    name: 'projeto',
    field: 'projeto',
    label: 'Projeto',
    align: 'left',
    sortable: true,
  },
  {
    name: 'cliente',
    field: 'cliente',
    label: 'Cliente',
    align: 'left',
    sortable: true,
  },
  {
    name: 'responsavel',
    field: 'responsavel',
    label: 'Responsável',
    align: 'left',
    sortable: true,
  },
  {
    name: 'responsavel_atendimento',
    field: 'responsavel_atendimento',
    label: 'Responsável Atendimento',
    align: 'left',
    sortable: true,
  },
  {
    name: 'data_entrega',
    field: 'data_entrega',
    label: 'Data de Entrega',
    align: 'right',
    sortable: true,
  },
  {
    name: 'ultimo_acompanhamento',
    field: 'ultimo_acompanhamento',
    label: 'Último Acompanhamento',
    align: 'right',
    sortable: true,
  },
  {
    name: 'status',
    field: 'status',
    label: 'Status',
    align: 'left',
    sortable: true,
  },
  {
    name: 'chamado_pendentes',
    field: 'chamado_pendentes',
    label: 'Chamado Pendentes',
    align: 'right',
    sortable: true,
  },
  {
    name: 'tasks_pendentes',
    field: 'tasks_pendentes',
    label: 'Tasks Pendentes',
    align: 'right',
    sortable: true,
  },
  { name: 'acoes', field: 'acoes', label: 'Ações', align: 'center' },
]
</script>

<style lang="sass" scoped></style>
