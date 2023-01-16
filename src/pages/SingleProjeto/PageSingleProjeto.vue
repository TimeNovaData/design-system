<template>
  <q-scroll-area>
    <q-img class="w-full h-[10rem]" :src="bg"></q-img>
    <div class="container relative">
      <SingleProjetoHeader
        :projeto="projeto"
        ref="header"
        @updateSelect="handleChangeProjeto"
        @anexoClick="modalAnexo.dialogRef.show()"
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
            <div class="w-full min-h-[280px] flex flex-col">
              <apexchart
                ref="chart"
                v-show="optionsChart?.length && !isLoadingTempoProjeto"
                width="100%"
                height="250px"
                type="bar"
                :options="optionsChart"
                :series="seriesChart"
                :class="{ 'opacity-0': !seriesChart?.length }"
              ></apexchart>
              <SkeletonChart
                v-if="isLoadingTempoProjeto"
                class="h-[250px] mx-24 mb-24"
              />
              <div
                class="text-paragraph-2 text-center m-auto !h-full flex-1 flex flex-col justify-center"
                v-else
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
                  <p class="text-center mx-auto opacity-40 text-paragraph-3">
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
            <ChamadoListTable
              @click:list-item="(id) => handleClickChamado(id)"
              :chamados-list="chamadosList"
            />
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
  {{ acessos }}

  <!-- Modal Anexos -->
  <ModalSide ref="modalAnexo" text="Anexos" icon="svguse:/icons.svg#icon_chat">
    <section class="flex flex-col p-24 gap-8">
      <AnexoItem ext="ai" />
    </section>
  </ModalSide>

  <!-- Modal Acessos -->
  <ModalSide
    ref="modalAcessos"
    text="Acessos"
    icon="svguse:/icons.svg#icon_lock"
  >
    <section class="flex flex-col p-24 gap-8">
      <AcessoItem
        name="Google Drive"
        type="acess"
        login="Instagram@novadata.com.br"
        senha="google"
      />
      <AcessoItem
        name="Instagram"
        link="https://drive.google.com/drive/u/0/my-drives"
        type="link"
      />
    </section>
  </ModalSide>

  <ModalSide
    ref="modalContatos"
    text="Contatos"
    icon="svguse:/icons.svg#icon_users"
  >
    <section class="flex flex-col p-24 gap-8">
      <q-list class="-mx-16" :padding="false">
        <q-item class="flex gap-8 items-center" clickable
          ><q-icon
            class="text-primary-pure h-24 w-24"
            name="svguse:/icons.svg#icon_users"
          ></q-icon>
          <p class="text-paragraph-1">Andrei Muniz</p>
        </q-item>
        <q-item class="flex gap-8 items-center" clickable
          ><q-icon
            class="text-primary-pure h-24 w-24"
            name="svguse:/icons.svg#icon_mala"
          ></q-icon>
          <p class="text-paragraph-1">Gerente de Projetos</p>
        </q-item>
        <q-item class="flex gap-8 items-center" clickable
          ><q-icon
            class="text-primary-pure h-24 w-24"
            name="svguse:/icons.svg#ico_tel"
          ></q-icon>
          <p class="text-paragraph-1">(00) 99882 8029</p>
        </q-item>

        <q-item class="flex gap-8 items-center" clickable
          ><q-icon class="text-primary-pure h-24 w-24" name="mail"></q-icon>
          <p class="text-paragraph-1">andrei.muniz@novadata.com.br</p>
        </q-item>
      </q-list>
    </section>
  </ModalSide>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import bg from 'src/assets/image/bg-single-projeto.png'
import TextIcon from 'src/components/Text/TextIcon.vue'
import draggable from 'vuedraggable'
import OButton from 'src/components/Button/OButton.vue'
import ModalSide from 'src/components/Modal/ModalSide.vue'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import { useAcessoStore } from 'src/stores/acessos/acessos.store'

import {
  onMounted,
  ref,
  nextTick,
  computed,
  watch,
  onUnmounted,
  inject,
} from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import SingleProjetoHeader from './SingleProjetoHeader.vue'
import stackedChartBar from 'src/utils/chart/stackedChartBar'
import { date } from 'quasar'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import { api } from 'src/boot/axios'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import useComments from 'src/composables/useComments'
import AnexoIcon from 'src/components/Anexo/AnexoIcon.vue'
import AnexoItem from 'src/components/Anexo/AnexoItem.vue'
import AcessoItem from 'src/components/Acesso/AcessoItem.vue'
import GLOBAL from 'src/utils/GLOBAL'
import emitter from 'src/boot/emitter'
import OSelect from 'src/components/Select/OSelect.vue'
import ChamadoListTable from 'src/components/Chamado/ChamadoListTable.vue'
import SkeletonChart from 'src/components/Skeleton/SkeletonChart.vue'
const { URLS } = api.defaults

const { getProjeto, getTempoProjeto } = useProjetoStore()
const { projeto, tempoProjeto, isLoadingTempoProjeto } = storeToRefs(
  useProjetoStore()
)

const { getAcessos } = useAcessoStore()
const { acessos } = storeToRefs(useAcessoStore())
const dataAtual = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))
const modalChat = ref(null)
const modalAnexo = ref(null)
const modalAcessos = ref(null)
const modalContatos = ref(null)

const {
  commentsReverse,
  getComments,
  sendComment,
  setID: setIDComments,
  isLoading,
  comments,
} = useComments()

const pageID = ref(null)
const header = ref(null)
const seriesChart = ref([])
const chart = ref(null)
const route = useRoute()
const router = useRouter()
const drag = ref(false)
const chamadosList = ref([])
const handleClickChamado = inject('handleClickChamado')

const getChamados = async (id) => api.get(`${URLS.chamado}?projeto__id=${id}`)

const routeIsZero = Number(route.params.id) === 0

watch(
  () => projeto,
  (v) => {
    setIDComments(v.value.id)
  },
  { deep: true }
)
/* dois */
const filtros = computed(() => `&agrupamento=${tempoProjetoPor.value.value}`)

async function changeTempoProjetoPor() {
  tempoProjeto.value = []
  await getTempoProjeto(pageID.value, filtros.value)
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

function startAndEndDrag() {
  console.log('arrastou')
}

async function handleGetChamado(id) {
  const req = await getChamados(id)
  chamadosList.value = req.data
}

async function handleChangeProjeto(p) {
  pageID.value = p.id
  projeto.value = {}
  await nextTick()
  await requests(pageID.value)
  router.push({ params: { id: pageID.value } })
}

function populateChart(tempoProjetos) {
  const data = tempoProjetos.map((i) => {
    const data = i.datas.map((i) => i.duracao)
    return {
      name: i.item,
      data,
    }
  })

  const categorias = tempoProjetos[0]?.datas.map((i) => i.data)

  chart.value.updateOptions({
    series: data,
    xaxis: {
      categories: categorias || [],
    },
  })

  seriesChart.value = data
}

async function requests() {
  await getProjeto(pageID.value)
  await getTempoProjeto(pageID.value, filtros.value)
  await nextTick()
  await handleGetChamado(pageID.value)
  await getAcessos('&projeto__id=' + pageID.value)
  populateChart(tempoProjeto.value, chart)
}

// Atualiza chamados ao alterar algo no modal
emitter.on('chamadoAlterado', () => {
  handleGetChamado(projeto.value.id)
})

if (!routeIsZero) {
  pageID.value = route.params.id
  requests()
}

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

onMounted(() => {
  modalAcessos.value.dialogRef.show()
  modalContatos.value.dialogRef.show()
  if (routeIsZero) {
    header.value.show()
  }
})

onUnmounted(() => {
  projeto.value = {}
  tempoProjeto.value = {}
})

const optionsChart = {
  ...stackedChartBar,
  dataLabels: { enabled: false },
  xaxis: {
    labels: {
      rotateAlways: false,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter',
      },
      formatter: function (value, timestamp, opts) {
        return value.slice(0, -5)
      },
    },
  },
}
</script>

<style lang="sass" scoped>
.container
  max-width: 1448px
  margin: 0 auto
  padding: 0 32px

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
