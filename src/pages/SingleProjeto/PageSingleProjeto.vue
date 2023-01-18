<template>
  <q-scroll-area>
    <q-img class="w-full h-[10rem]" :src="bg"></q-img>
    <div class="container relative">
      <SingleProjetoHeader
        :projeto="projeto"
        ref="header"
        @updateSelect="handleChangeProjeto"
        @anexoClick="handleShowAnexos"
        @contatosClick="handleShowContatos"
        @acessosClick="handleShowAcessos"
        @briefingClick="handleShowBriefing"
        @escopoClick="handleShowEscopo"
      />

      <Transition name="fade" mode="out-in">
        <div v-if="projeto.id">
          <q-card class="mt-32 flex flex-col">
            <div class="flex items-center justify-between w-full">
              <TextIcon
                class="pt-24 mx-16 mb-24 text-title-4"
                icon="svguse:/icons.svg#icon_date_time"
                text="Investimento Diário"
              ></TextIcon>

              <div>
                <TagBase
                  class="mr-16 bg-alert-success/10 text-alert-success dark:text-white/90 dark:!bg-alert-success/30"
                  :nome="`Filtrando por ⠂<span class='font-semibold'>${tempoProjetoPor.label}</span>`"
                  type="projeto"
                />

                <OButton
                  secondary
                  size="md"
                  icon="svguse:/icons.svg#icon_filtros"
                  class="mr-16"
                >
                  Definições do gráfico
                  <q-menu class="p-12 pb-0">
                    <q-form ref="form">
                      <q-list class="w-[23.5rem]">
                        <q-item
                          class="px-0 text-headline-3 text-neutral-60 dark:text-white/60 justify-between flex items-center w-full mb-8"
                          dense
                        >
                          Filtrando por
                        </q-item>

                        <q-item class="px-0 w-full mb-8" dense>
                          <OSelect
                            size="md"
                            class="w-full"
                            :options="tempoProjetoOptions"
                            v-model="tempoProjetoPor"
                            @update:model-value="changeTempoProjetoPor"
                          />
                        </q-item>
                      </q-list>
                    </q-form>
                  </q-menu>
                </OButton>
              </div>
            </div>
            <div class="w-full min-h-[280px] flex flex-col">
              <apexchart
                ref="chart"
                width="100%"
                height="250px"
                type="bar"
                :options="optionsChart"
                :series="seriesChart"
                v-show="!isLoadingTempoProjeto && seriesChart.length > 0"
              ></apexchart>

              <SkeletonChart
                v-if="isLoadingTempoProjeto"
                class="h-[250px] mx-24 mb-24 flex flex-col"
              />
              <div
                class="text-paragraph-2 text-center m-auto !h-full flex-1 flex flex-col justify-center"
                v-else-if="!isLoadingTempoProjeto && seriesChart.length === 0"
              >
                <q-icon
                  class="block mx-auto opacity-30"
                  name="fluorescent"
                  size="2.5rem"
                ></q-icon>
                <p class="opacity-40">Sem Dados para exibir o grafico.</p>
              </div>
            </div>
          </q-card>

          <div class="grid grid-cols-2 gap-32 mt-32">
            <q-card class="p-16">
              <div class="flex items-center gap-8">
                <TextIcon
                  class="text-title-4"
                  icon="svguse:/icons.svg#icon_tasks"
                  text="Checkpoints"
                ></TextIcon>
                <p class="text-neutral-100/60 dark:text-white/60 text-caps-2">
                  ( Em Breve )
                </p>
              </div>
              <div class="grid grid-cols-[repeat(2,_minmax(auto,_1fr))] gap-16">
                <div class="mt-16 grid gap-2">
                  <q-date
                    minimal
                    :years-in-month-view="false"
                    class="projeto-date"
                    v-model="dataAtual"
                    today-btn
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <p
                    class="text-headline-5 text-neutral-100/70 dark:text-white/70 mt-16"
                  >
                    Sáb, 24 Dez
                  </p>
                  <div
                    class="text-paragraph-2 rounded-generic p-8 two-lines bg-neutral-20 dark:bg-white/10"
                  >
                    Véspera de Natal
                  </div>
                  <div
                    class="text-paragraph-2 rounded-generic p-8 two-lines bg-neutral-20 dark:bg-white/10"
                  >
                    Reunião às 14h
                  </div>
                  <p
                    class="text-headline-5 text-neutral-100/70 dark:text-white/70 mt-16"
                  >
                    Sáb, 25 Dez
                  </p>
                  <div
                    class="text-paragraph-2 rounded-generic p-8 two-lines bg-neutral-20 dark:bg-white/10"
                  >
                    Natal
                  </div>
                </div>
              </div>
            </q-card>

            <q-card class="p-16 flex flex-col">
              <div class="flex justify-between gap-32 mb-16 items-center">
                <TextIcon
                  class="text-title-4"
                  icon="svguse:/icons.svg#icon_chat"
                  text="Atualização dos acompanhamentos"
                ></TextIcon>
                <OButton type="sm" secondary @click="modalChat.dialogRef.show()"
                  >Ver todos</OButton
                >
                <!--  -->
              </div>
              <OChatBox
                class="h-full w-full flex-1 mb-16"
                style="box-shadow: initial"
                :comments="comments"
                :sendComment="sendComment"
                :getComments="getComments"
                :isLoading="isLoading"
                tipo="projeto"
                :showInput="false"
                filters="&page=1&page_size=10"
                :canUpdate="!modalChat.dialogState"
              >
                <template #top>
                  <p
                    class="text-center mx-auto opacity-40 text-paragraph-3"
                    v-if="comments?.results?.length"
                  >
                    Mostrando ultimas 10 mensagens
                  </p>
                </template>
              </OChatBox>
              <p class="text-paragraph-2">
                Você tem
                <span class="text-primary-pure">{{ comments.count }}</span>
                acompanhamentos registrados.
              </p>
            </q-card>
          </div>

          <q-card class="p-16 mt-32">
            <TextIcon
              class="text-title-4"
              icon="svguse:/icons.svg#icon_file_add"
              text="Chamados"
            ></TextIcon>
            <!-- 🟢 CHAMADO LIST  -->
            <!-- <ChamadoListTable
              @click:list-item="(id) => handleClickChamado(id)"
              :chamados-list="chamadosList"
            /> -->
            <OTableBase
              :columns="columnsChamado"
              :rows="chamadosList"
              :footer="false"
              :header="false"
              f
            >
              <template #body="props">
                <q-tr
                  class="cursor-pointer"
                  :props="props"
                  @click="handleClickChamado(props.row.id)"
                >
                  <!--  -->
                  <q-td key="chamado" class="w-1/2">
                    <AvatarTextSubtext
                      :titulo="props.row.titulo"
                      :subtitle="props.row.user_criacao.nome"
                      :foto="props.row.user_criacao.foto"
                    />
                  </q-td>

                  <q-td key="data_criacao">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FData(props.row.data_criacao) }}
                    </div>
                  </q-td>

                  <q-td key="data_desejada">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FData(props.row.data_desejada) }}
                    </div>
                  </q-td>

                  <q-td key="data_atualizacao">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FData(props.row.data_atualizacao) }}
                    </div>
                  </q-td>

                  <q-td key="anexo" class="!p-10">
                    <div
                      class="bg-neutral-100/10 w-full h-full justify-center flex text-center items-center rounded-generic dark:bg-white/10"
                    >
                      {{ props.row?.quantidade_anexos || '-' }}
                    </div>
                  </q-td>
                  <!-- 

                   -->
                </q-tr>
              </template>
            </OTableBase>
          </q-card>

          <!--⚡ TASKS -->
          <q-card class="p-16 mt-32">
            <TextIcon
              class="text-title-4"
              icon="svguse:/icons.svg#icon_tasks"
              text="Tasks"
            ></TextIcon>

            <OTableBase
              :columns="columnsTask"
              :rows="tasks"
              :footer="false"
              :header="false"
            >
              <template #body="props">
                <q-tr
                  class="cursor-pointer"
                  :props="props"
                  @click="openTaskViewModal(props.row.id)"
                >
                  <q-td key="titulo" :auto-width="true" class="w-1/2">
                    <AvatarTextSubtext
                      :titulo="props.row.titulo"
                      :subtitle="props.row.usuario_criacao.get_full_name"
                      :foto="props.row.usuario_criacao.profile.foto"
                    />
                  </q-td>

                  <q-td key="responsavel_task" :auto-width="false">
                    <OAvatar
                      :nome="props.row.responsavel_task?.get_full_name"
                      :foto="props.row.responsavel_task.profile?.foto"
                    />
                  </q-td>

                  <q-td key="chamado" :auto-width="false" class="!p-10">
                    <div class="h-full">
                      <div
                        class="bg-neutral-100/10 h-full w-[150px] rounded-generic dark:bg-white/10 align-middle p-4 py-6"
                      >
                        <p class="one-line">
                          {{ props.row?.chamado?.titulo || '-' }}
                        </p>
                      </div>
                    </div>
                  </q-td>

                  <q-td key="data_criacao" :auto-width="false">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FData(props.row.data_criacao) }}
                    </div>
                  </q-td>

                  <q-td key="data_desejada" :auto-width="false">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FData(props.row.entrega_data_desejada) }}
                    </div>
                  </q-td>

                  <q-td key="data_prevista" :auto-width="false">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FData(props.row.data_final_previsto) }}
                    </div>
                  </q-td>

                  <q-td key="tempo_decorrido" :auto-width="false">
                    <div class="text-paragraph-2 text-end">
                      {{ GLOBAL.FTime(props.row.tempo_total) }}
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </OTableBase>
          </q-card>
        </div>
        <div v-else>
          <div class="text-paragraph-2 text-center mt-12">
            <div>
              <q-icon
                class="block mx-auto opacity-30"
                name="fluorescent"
                size="2.5rem"
              ></q-icon>
              <p class="opacity-40">Sem Dados para exibir.</p>
            </div>
          </div>
        </div></Transition
      >
    </div>
    <q-space class="h-48" />
  </q-scroll-area>

  <!-- Modal Acompnhamentos -->
  <ModalSide
    ref="modalChat"
    text="Todos os acompanhamentos"
    icon="svguse:/icons.svg#icon_chat"
  >
    <!-- v-if="modalChat.dialogState" -->
    <OChatBox
      v-if="comments.length !== 0"
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
    <div v-else>
      <EmptyItem text="Sem acompanhamentos para exibir" />
    </div>
  </ModalSide>

  <!-- Modal Anexos -->
  <ModalSide ref="modalAnexo" text="Anexos" icon="svguse:/icons.svg#icon_chat">
    <section class="flex flex-col p-24 gap-8">
      <div class="w-full flex justify-end">
        <OButton secondary size="md" icon="add_circle" @click="openNovoAnexo"
          >Novo anexo</OButton
        >
      </div>

      <div v-if="anexosListReverse.length">
        <AnexoItem
          v-for="i in anexosListReverse"
          :key="i.id"
          :ext="i.anexo_thumb?.extensao?.replace('.', '')"
          :thumb="i.anexo_thumb?.url || ''"
          :link="i.attachments"
          :size="i.anexo_tamanho"
          :nome="i.anexo_nome"
        />
      </div>
      <div v-else>
        <EmptyItem text="Sem Anexos para exibir" />
      </div>
    </section>
  </ModalSide>

  <!-- Modal Acessos -->
  <ModalSide
    ref="modalAcessos"
    text="Acessos"
    icon="svguse:/icons.svg#icon_lock"
  >
    <section class="flex flex-col p-24 gap-8" v-if="acessosList.length !== 0">
      <div class="flex justify-between mb-8">
        <!--    <OButton secondary size="md" icon="add_circle" @click="openNovoAnexo"
          >Novo anexo</OButton
        > -->
      </div>
      <AcessoItem
        v-for="item in acessosList"
        :key="item.id"
        :name="item.ferramenta"
        type="acess"
        :acesso="item.acesso"
      />
    </section>
    <section v-else class="flex flex-col p-24 gap-8">
      <EmptyItem text="Sem Acessos para exibir" />
    </section>
  </ModalSide>

  <!-- 

    
const oi = [
  {
    id: 3,
    nome: 'Telefone',
    telefone: '999999999999999',
    email: 'email.example@example.com.br',
    cargo: 'teste',
    cliente: 2,
  },
  {
    id: 4,
    nome: 'qwedqw',
    telefone: '2112112',
    email: 'email.example2@example.com.br',
    cargo: 'teste2',
    cliente: 2,
  },
]
   -->
  <ModalSide
    ref="modalContatos"
    text="Contatos"
    icon="svguse:/icons.svg#icon_users"
  >
    <section
      v-if="contatosList.length"
      class="flex flex-col p-24 gap-18 divide-y divide-neutral-30 dark:divide-white/10"
    >
      <q-list
        class="-mx-16"
        :padding="false"
        v-for="item in contatosList"
        :key="item.id"
      >
        <q-item class="flex gap-8 items-center" clickable
          ><q-icon
            class="text-primary-pure h-24 w-24"
            name="svguse:/icons.svg#icon_users"
          ></q-icon>
          <p class="text-paragraph-1">{{ item.nome }}</p>
        </q-item>
        <q-item class="flex gap-8 items-center" clickable
          ><q-icon
            class="text-primary-pure h-24 w-24"
            name="svguse:/icons.svg#icon_mala"
          ></q-icon>
          <p class="text-paragraph-1">{{ item.cargo }}</p>
        </q-item>
        <q-item class="flex gap-8 items-center" clickable
          ><q-icon
            class="text-primary-pure h-24 w-24"
            name="svguse:/icons.svg#ico_tel"
          ></q-icon>
          <p class="text-paragraph-1">{{ item.telefone }}</p>
        </q-item>

        <q-item class="flex gap-8 items-center" clickable
          ><q-icon class="text-primary-pure h-24 w-24" name="mail"></q-icon>
          <p class="text-paragraph-1">{{ item.email }}</p>
        </q-item>
      </q-list>
    </section>
    <section v-else class="flex flex-col p-24 gap-8">
      <EmptyItem text="Sem contatos cadastrados" />
    </section>
  </ModalSide>

  <!-- MODAL Briefing -->
  <ModalSide
    ref="modalBriefing"
    text="Briefing"
    icon="svguse:/icons.svg#icon_docs"
  >
    <section
      class="flex flex-col p-24 gap-18 divide-y divide-neutral-30"
      v-if="projeto.briefing_text"
    >
      <div
        class="bg-neutral-20 p-16 border border-neutral-100/5 dark:bg-white/5 dark:border-white/10 text-neutral-70 dark:text-white/70 text-paragraph-2 rounded-generic"
      >
        <div
          style="white-space: break-spaces"
          v-html="projeto.briefing_text"
        ></div>
      </div>
    </section>
    <section v-else class="flex flex-col p-24 gap-8">
      <EmptyItem text="Não há briefing cadastrado." />
    </section>
  </ModalSide>

  <!-- MODAL Escopo -->
  <ModalSide
    ref="modalEscopo"
    text="Escopo"
    icon="svguse:/icons.svg#icon_paper"
  >
    <section
      class="flex flex-col p-24 gap-18 divide-y divide-neutral-30"
      v-if="projeto.escopo"
    >
      <div
        class="bg-neutral-20 p-16 border border-neutral-100/5 dark:bg-white/5 dark:border-white/10 text-neutral-70 dark:text-white/70 text-paragraph-2 rounded-generic"
      >
        <div style="white-space: break-spaces" v-html="projeto.escopo"></div>
      </div>
    </section>
    <section v-else class="flex flex-col p-24 gap-8">
      <EmptyItem text="Não há Escopo cadastrado." />
    </section>
  </ModalSide>

  <ModalAddAnexo
    ref="modalAddAnexoRef"
    :url="URLS.anexoprojeto"
    keyProp="projeto"
    :id="pageID"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import bg from 'src/assets/image/bg-single-projeto.png'
import TextIcon from 'src/components/Text/TextIcon.vue'
import draggable from 'vuedraggable'
import OButton from 'src/components/Button/OButton.vue'
import ModalSide from 'src/components/Modal/ModalSide.vue'
import ModalCenter from 'src/components/Modal/ModalCenter.vue'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'

import {
  onMounted,
  ref,
  nextTick,
  computed,
  watch,
  onUnmounted,
  inject,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SingleProjetoHeader from './SingleProjetoHeader.vue'
import stackedChartBar from 'src/utils/chart/stackedChartBar'
import { Cookies, date } from 'quasar'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import { api } from 'src/boot/axios'
import useComments from 'src/composables/useComments'
import AnexoItem from 'src/components/Anexo/AnexoItem.vue'
import AcessoItem from 'src/components/Acesso/AcessoItem.vue'
import GLOBAL from 'src/utils/GLOBAL'
import emitter from 'src/boot/emitter'
import OSelect from 'src/components/Select/OSelect.vue'
import SkeletonChart from 'src/components/Skeleton/SkeletonChart.vue'
import TagBase from 'src/components/Tag/TagBase.vue'
import OTableBase from 'src/components/Table/OTableBase.vue'
import AvatarTextSubtext from 'src/components/Avatar/AvatarTextSubtext.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { columnsChamado, columnsTask } from './cols.js'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'
import ModalAddAnexo from 'src/components/Modal/ModalAddAnexo.vue'
import EmptyItem from 'src/components/Empty/EmptyItem.vue'

const { URLS } = api.defaults
// Router
const route = useRoute()
const router = useRouter()

// Stores
const { getProjeto, getTempoProjeto, getContatos, getAcessos } =
  useProjetoStore()

const { projeto, tempoProjeto, isLoadingTempoProjeto } = storeToRefs(
  useProjetoStore()
)
const { getTasks } = useTaskStore()
// const { tasks } = storeToRefs(useTaskStore())
const tasks = ref([])

// ID
const pageID = ref(null)

// Els
const header = ref(null)
// Modais
const modalChat = ref(null)
const modalAnexo = ref(null)
const modalAcessos = ref(null)
const modalContatos = ref(null)
const modalAddAnexoRef = ref(null)
const modalBriefing = ref(null)
const modalEscopo = ref(null)
// Comments
const {
  getComments,
  sendComment,
  setID: setIDComments,
  isLoading,
  comments,
} = useComments()

watch(
  () => projeto,
  (v) => setIDComments(v.value.id),
  { deep: true }
)

// Chamado
const chamadosList = ref([])
const handleClickChamado = inject('handleClickChamado')
const getChamados = async (id, filters = '') =>
  api.get(`${URLS.chamado}?projeto__id=${id}${filters}`)

const routeIsZero = Number(route.params.id) === 0

// Chart Tempo Projeto
const chart = ref(null)
const seriesChart = ref([])
// const categoriasChart = ref([])
const optionsChart = ref({
  ...stackedChartBar,
  dataLabels: { enabled: false },
  chart: {
    id: 'chart1',
    type: 'bar',
    height: 250,
    width: '100%',
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
  },
  xaxis: {
    categories: [],
    labels: {
      rotateAlways: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter',
      },
      formatter: function (value) {
        return value ? String(value).slice(0, -5) : value
      },
    },
  },
})
// Populate Chart
async function populateChart(tempoProjetos) {
  const data = tempoProjetos.map((i) => {
    const data = i.datas.map((i) => i.duracao)
    return {
      name: i.item,
      data,
    }
  })

  const categorias = tempoProjetos[0]?.datas.map((i) => i.data)

  seriesChart.value = data

  await nextTick()
  const chartTempo = chart.value
  // debugger
  if (chartTempo) {
    chartTempo.updateOptions({
      series: data,
      xaxis: { categories: categorias },
    })
  }
}

// Tempo Projeto
const filtros = computed(() => `&agrupamento=${tempoProjetoPor.value.value}`)

async function changeTempoProjetoPor() {
  tempoProjeto.value = []
  await nextTick()
  await getTempoProjeto(pageID.value, filtros.value)
  populateChart(tempoProjeto.value)
}

const tempoProjetoPor = ref({
  label: 'Usúario',
  value: 'usuario',
})

const tempoProjetoOptions = [
  {
    label: 'Projeto',
    value: 'projeto',
  },
  {
    label: 'Subprojeto',
    value: 'sub_projeto',
  },
  {
    label: 'Usuário',
    value: 'usuario',
  },
]

// Tasks
const openTaskViewModal = inject('openTaskViewModal')

// Anexos ------------------------------
const { getAnexos } = useAnexoStore()
const anexosList = ref([])
const anexosListReverse = computed(() => [...anexosList.value].reverse())

async function openNovoAnexo() {
  modalAddAnexoRef.value.modalAddAnexo.dialogRef.show()
}

async function handleShowAnexos() {
  anexosList.value = await getAnexos(
    '&projeto__id=' + pageID.value,
    false,
    'projeto'
  )
  modalAnexo.value.dialogRef.show()
}

const contatosList = ref([])
async function handleShowContatos() {
  contatosList.value = await getContatos(
    `&cliente__id=${projeto.value.cliente}`
  )
  modalContatos.value.dialogRef.show()
}

const acessosList = ref([])
async function handleShowAcessos() {
  acessosList.value = await getAcessos(`&projeto__id=${projeto.value.id}`)
  modalAcessos.value.dialogRef.show()
}

async function handleShowBriefing() {
  modalBriefing.value.dialogRef.show()
}

async function handleShowEscopo() {
  modalEscopo.value.dialogRef.show()
}

// Handles
async function handleGetChamado(id, filters) {
  const req = await getChamados(id, filters)
  chamadosList.value = req.data
}

async function handleChangeProjeto(p) {
  resetDados()
  pageID.value = p.id
  await nextTick()
  await requests(pageID.value)
  router.push({ params: { id: pageID.value } })
}

// Reset
function resetDados() {
  isLoadingTempoProjeto.value = true
  projeto.value = {}
  tempoProjeto.value = []
  seriesChart.value = []
}

async function requests() {
  resetDados()
  await getProjeto(pageID.value)
  await getTempoProjeto(pageID.value, filtros.value)
  await nextTick()
  populateChart(tempoProjeto.value)
  await handleGetChamado(pageID.value + '&status=abertos')
  tasks.value = await getTasks(
    '&status=abertas&projeto__id=' + pageID.value,
    false
  )
}

/*



*/
// Atualiza chamados ao alterar algo no modal
emitter.on('chamadoAlterado', () =>
  handleGetChamado(projeto.value.id, '&no_loading&status=abertos')
)

// Atualiza as tasks ao criar ou editar
emitter.on('taskEdit', async () => {
  tasks.value = await getTasks(
    `&projeto__id=${pageID.value}&status=abertas`,
    false
  )
})
emitter.on('taskCreate', async () => {
  tasks.value = await getTasks(
    `&projeto__id=${pageID.value}&status=abertas`,
    false
  )
})

// atualiza os anexos ao enviar e reverter
emitter.on(`filepond:projeto`, async () => {
  anexosList.value = await getAnexos(
    '&projeto__id=' + pageID.value,
    false,
    'projeto'
  )
})
emitter.on(`filepond:revert:projeto`, async () => {
  anexosList.value = await getAnexos(
    '&projeto__id=' + pageID.value,
    false,
    'projeto'
  )
})

// Date
const dataAtual = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))

// Draggable
const drag = ref(false)
const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))
function startAndEndDrag() {
  console.log('arrastou')
}
// Init
async function created() {
  if (!routeIsZero) {
    pageID.value = route.params.id
    await nextTick()
    requests()
  }
}
created()

onMounted(() => {
  // modalAcessos.value.dialogRef.show()
  // modalContatos.value.dialogRef.show()
  if (routeIsZero) {
    header.value.show()
  }
})

onUnmounted(() => {
  projeto.value = {}
  tempoProjeto.value = {}
})
</script>

<style lang="sass" scoped>
.container
  max-width: calc(1448px + 128px)
  margin: 0 auto
  padding: 0 64px

.projeto-date
  box-shadow: initial
  border: 1px solid rgba(var(--neutral-100),0.1)


  :deep(.q-date__navigation)

    div:nth-of-type(4),
    div:nth-of-type(5),
    div:nth-of-type(6)
      display: none

  :deep(.q-date__view)
    width: 100%
    min-height: 282px
    .q-date__calendar-days-container
      min-height: initial

  .body--dark &
    border: 1px solid rgba(var(--white),0.1)
</style>

<!-- treis -->
