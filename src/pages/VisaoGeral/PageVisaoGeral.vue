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
            :cardValue="bigNumbers.projetos_abertos"
          />
          <VisaoGeralCard
            cardTitle="Meus Projetos Abertos"
            :cardValue="bigNumbers.meus_projetos_abertos"
          />
          <VisaoGeralCard
            cardTitle="Meus projetos atrasados"
            :cardValue="bigNumbers.meus_projetos_atrasados"
            cardType="error"
          />
          <VisaoGeralCard
            cardTitle="Meus projetos desuatualizados"
            :cardValue="bigNumbers.meus_projetos_desatualizados"
            cardType="error"
          />
        </div>

        <VisaoGeralTable
          :rows="projectFilter === 'recorrente' ? rowsRecorrente : rowsOneShot"
          :columns="columns"
          @click:acompanhamento="openModalChat"
        />
      </q-card>
    </div>
  </q-scroll-area>

  <!-- Modal Acompnhamentos -->
  <ModalSide
    ref="modalChat"
    text="Todos os acompanhamentos"
    icon="svguse:/icons.svg#icon_chat"
  >
    <!-- v-if="modalChat.dialogState" -->
    <OChatBox
      class="h-full w-full flex-1 mb-0"
      style="box-shadow: initial"
      :comments="comments"
      :sendComment="sendComment"
      :getComments="getComments"
      :isLoading="isLoading"
      tipo="projeto"
      filters="&page=1&page_size=200"
    >
    </OChatBox>
  </ModalSide>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import VisaoGeralCard from 'src/components/VisaoGeral/VisaoGeralCard.vue'
import VisaoGeralTable from 'src/components/VisaoGeral/VisaoGeralTable.vue'
import { deepUnref } from 'vue-deepunref'
import ModalSide from 'src/components/Modal/ModalSide.vue'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import useComments from 'src/composables/useComments'

const { URLS } = api.defaults
const { FData } = GLOBAL
const projetos = inject('projetos')
const user = inject('user')
const bigNumbers = ref({})
const projectFilter = ref('recorrente')

function handleChangeprojectFilter(type) {
  projectFilter.value = type
}

const {
  getComments,
  sendComment,
  setID: setIDComments,
  isLoading,
  comments,
} = useComments()

const modalChat = ref(null)

function openModalChat(id) {
  if (!user.value.is_staff) return
  comments.value = []
  setIDComments(id)
  modalChat.value.dialogRef.show()
}

async function getBigNumbers() {
  const { data, error } = await useAxios(
    URLS.visao_geral_big_numbers,
    { method: 'GET' },
    api
  )

  try {
    bigNumbers.value = data.value
    return data.value
  } catch (e) {
    return error
  }
}

function setRowData(item) {
  return {
    id: item.id,
    projeto: item.nome,
    cliente: item.nome_cliente || '-',
    responsaveis: item.responsaveis,
    responsaveis_atendimento: item.atendimento,
    data_entrega: FData(item.fim_contrato),
    ultimo_acompanhamento: {
      data: FData(item.ultimo_acompanhamento),
      cor: item.status_acompanhamento.cor,
    },
    status_andamento: item.status_andamento,
    chamado_pendentes: item.chamados_nao_concluidos,
    tasks_pendentes: item.tasks_nao_concluidas,
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
    name: 'responsaveis',
    field: (row) =>
      deepUnref(row.responsaveis)
        .map((resp) => resp.nome)
        .join(', '),
    label: 'Responsáveis',
    align: 'left',
    sortable: true,
  },
  {
    name: 'responsaveis_atendimento',
    field: (row) =>
      deepUnref(row.responsaveis_atendimento)
        .map((resp) => resp.nome)
        .join(', '),
    label: 'Atendimento',
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
    name: 'status_andamento',
    field: (row) => deepUnref(row.status_andamento.status),
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

onMounted(() => {
  getBigNumbers()
})
</script>

<style lang="sass" scoped></style>
