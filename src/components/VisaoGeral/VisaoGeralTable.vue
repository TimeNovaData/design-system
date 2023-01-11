<template>
  <OTable
    :rows="rows"
    :columns="columns"
    primary
    class="px-16 py-8 visao-geral-table"
  >
    <template v-slot:top-left>
      <OInput
        size="md"
        debounce="300"
        v-model="filter"
        placeholder="Pesquise por nome, tipo..."
        class="no-label mb-4 w-[22rem]"
      />
    </template>

    <template v-slot:top-right>
      <div class="flex gap-8 items-center">
        <span class="text-paragraph-2 text-neutral-70">Mostrar</span>
        <OSelect
          class="w-72 h-40"
          size="md"
          v-model="linesPerPage"
          :options="[10, 20, 50]"
        />
        <span class="text-paragraph-2 text-neutral-70">Linhas por página</span>
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="projeto" :auto-width="false" class="!border-r w-full">
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

        <q-td
          key="ultimo_acompanhamento"
          :auto-width="false"
          class="text-right !border-r"
        >
          {{ props.row.ultimo_acompanhamento }}
        </q-td>

        <q-td key="status" :auto-width="false" class="!border-r">
          <o-badge size="lg" color="var(--alert-error)" square class="w-[8rem]">
            <template v-slot:content>Atrasado</template>
          </o-badge>
        </q-td>

        <q-td
          key="chamado_pendentes"
          :auto-width="false"
          class="text-right !border-r w-96"
        >
          {{ props.row.chamado_pendentes }}
        </q-td>

        <q-td
          key="tasks_pendentes"
          :auto-width="false"
          class="text-right !border-r w-96"
        >
          {{ props.row.tasks_pendentes }}
        </q-td>

        <q-td key="tasks_pendentes" class="text-center !px-6">
          <OButton secondary icon="svguse:/icons.svg#icon_config" size="sm" />
          <OButton secondary icon="search" size="sm" class="ml-6" />
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
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'

const filter = ref('')
const linesPerPage = ref(10)

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
    status: 'Finalizado',
    chamado_pendentes: 10,
    tasks_pendentes: 11,
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
    status: 'Atrasado',
    chamado_pendentes: 10,
    tasks_pendentes: 11,
    acoes: '1%',
  },
]
</script>

<style lang="sass" scoped>
.visao-geral-table
  .q-chip :deep(.q-chip__content)
    justify-content: center
</style>
