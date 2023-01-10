<template>
  <OTable :rows="rows" :columns="columns" primary class="px-16 py-8">
    <template v-slot:top-left>
      <OInput
        size="md"
        debounce="300"
        v-model="filter"
        placeholder="Pesquise por nome, tipo..."
        class="no-label mb-4 w-[22rem]"
      />
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="projeto" :auto-width="false" class="!border-r">
          {{ props.row.projeto }}
        </q-td>

        <q-td key="projeto" :auto-width="false" class="!border-r">
          <div class="inline-flex items-center h-full gap-6">
            <AvatarSingle
              class="!w-32 !h-32 overflow-hidden ajuste-img"
              :estatic="true"
              :item="props.row.responsavel"
            ></AvatarSingle>
            <p class="">{{ props.row.responsavel?.nome }}</p>
          </div>
        </q-td>

        <q-td key="projeto" :auto-width="false" class="!border-r">
          <div class="inline-flex items-center h-full gap-6">
            <AvatarSingle
              class="!w-32 !h-32 overflow-hidden ajuste-img"
              :estatic="true"
              :item="props.row.responsavel_atendimento"
            ></AvatarSingle>
            <p class="">{{ props.row.responsavel_atendimento?.nome }}</p>
          </div>
        </q-td>
      </q-tr>
    </template>
  </OTable>
</template>

<script setup>
import { ref } from 'vue'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'

const filter = ref('')

const columns = [
  {
    name: 'projeto',
    field: 'projeto',
    label: 'Projeto',
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
  {
    name: 'acoes',
    field: 'acoes',
    label: 'Ações',
    align: 'center',
  },
]

const rows = [
  {
    projeto: 'Setup do sistema - Front',
    responsavel: {
      nome: 'Marlon',
      foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    },
    responsavel_atendimento: {
      nome: 'Marlon Victor',
      foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    },
    ultimo_acompanhamento: '10/10/2022 - 17h 21m',
    status: 87,
    chamado_pendentes: '14%',
    tasks_pendentes: '1%',
    acoes: '1%',
  },
  {
    projeto: 'Setup do sistema - Front',
    responsavel: {
      nome: 'Marlon',
      foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    },
    responsavel_atendimento: {
      nome: 'Marlon Victor',
      foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    },
    ultimo_acompanhamento: '10/10/2022 - 17h 21m',
    status: 87,
    chamado_pendentes: '14%',
    tasks_pendentes: '1%',
    acoes: '1%',
  },
]
</script>

<style lang="sass" scoped></style>
