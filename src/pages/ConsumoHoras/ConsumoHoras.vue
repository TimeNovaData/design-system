<template>
  <q-scroll-area
    class="fit"
    style="height: calc(100vh - var(--top-size))"
    delay="0"
  >
    <div class="mx-48 mb-48">
      <div class="flex items-center mt-24">
        <TextIcon text="Horas Consumidas" icon="svguse:/icons.svg#icon_horas" />

        <div class="flex gap-8 justify-end ml-auto mr-8">
          <div v-for="item in filtrosAplicados" :key="item">
            <OBadge
              v-show="item.length"
              size="md"
              :badge="false"
              class="!px-6 !bg-neutral-30 dark:!bg-white/10 text-neutral-70 border border-neutral-100/5 dark:!text-white/70"
            >
              <template #content> {{ item }} </template>
            </OBadge>
          </div>
        </div>

        <OButton primary size="md" icon="svguse:/icons.svg#icon_filtros"
          >Filtros
          <q-menu
            ref="menu"
            class="p-12"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-form ref="form">
              <q-list class="w-[23.5rem]">
                <q-item
                  class="px-0 text-headline-3 text-neutral-60 dark:text-white/60 justify-between flex items-center w-full"
                  dense
                >
                  Filtros
                  <q-icon
                    size="20px"
                    name="svguse:/icons.svg#icon_filtros"
                  ></q-icon>
                </q-item>
                <q-item class="px-0" v-show="filtros.cliente.options.length">
                  <OSelectAvatar
                    use-input
                    label="Cliente"
                    size="md"
                    class="w-full"
                    :modelValue="filtros.cliente.model"
                    :options="clientes"
                    :loading="!clientes"
                    clearable
                    @updateValue="(v) => (filtros.cliente.model = v)"
                    fotoKey="logo"
                  >
                  </OSelectAvatar>
                </q-item>
                <q-item class="px-0">
                  <OSelectAvatar
                    use-input
                    label="Projeto"
                    size="md"
                    class="w-full"
                    :modelValue="filtros.projeto.model"
                    :options="projetos"
                    :loading="!projetos"
                    fotoKey="logo"
                    clearable
                    @updateValue="(v) => (filtros.projeto.model = v)"
                  >
                  </OSelectAvatar>
                </q-item>

                <q-item class="px-0 flex gap-4">
                  <OSelectAvatar
                    use-input
                    label="Usuário"
                    size="md"
                    class="w-full"
                    :modelValue="filtros.usuario.model"
                    :options="usuariosFoto"
                    :loading="!usuariosFoto"
                    clearable
                    @updateValue="(v) => (filtros.usuario.model = v)"
                  >
                  </OSelectAvatar>
                </q-item>
                <q-item class="px-0">
                  <OInput
                    size="md"
                    class="w-full cursor-pointer"
                    label="Data"
                    :model-value="filtros.data.days.from && dataRangeFiltro"
                    clearable
                    @clear="filtros.data.days = { from: '', to: '' }"
                    @keydown.prevent
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      class="!w-max !min-w-0"
                    >
                      <q-date v-model="filtros.data.days" range />
                    </q-popup-proxy>

                    <template v-slot:append>
                      <q-icon name="calendar_today" class="cursor-pointer">
                      </q-icon>
                    </template>
                  </OInput>
                </q-item>

                <q-item class="px-0 flex gap-4 justify-end w-full">
                  <OButton
                    size="md"
                    icon="close"
                    tertiary
                    @click="handleRemoveFilters"
                  >
                    Remover Filtros</OButton
                  >
                  <OButton
                    size="md"
                    icon="check"
                    primary
                    :loading="isLoading"
                    @click="getTempoTask"
                    >Aplicar</OButton
                  >
                </q-item>
              </q-list>
            </q-form>
          </q-menu>
        </OButton>
      </div>

      <q-card
        class="p-16 mt-24 dark:border-white/10 dark:border overflow-hidden"
      >
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
              :class="{ active: FiltroInvestimentoPor === 'projeto' }"
              size="md"
              secondary
              @click="handleChangeFiltroInvestimento('projeto')"
              >Projeto</OButton
            >
            <OButton
              class="text-neutral-70"
              :class="{ active: FiltroInvestimentoPor === 'sub_projeto' }"
              size="md"
              secondary
              @click="handleChangeFiltroInvestimento('sub_projeto')"
              >Subprojeto</OButton
            >
            <OButton
              class="text-neutral-70"
              :class="{ active: FiltroInvestimentoPor === 'usuario' }"
              size="md"
              secondary
              @click="handleChangeFiltroInvestimento('usuario')"
              >Usuário</OButton
            >
          </div>
        </div>
        <div class="w-full px-16">
          <div class="h-[450px] grid place-items-center" v-show="isLoading">
            <div class="flex items-center gap-12">
              <q-spinner color="primary" class="shrink-0" size="48px" />
              <p class="text-paragraph-1 text-neutral-70 dark:text-white/70">
                Carregando
              </p>
            </div>
          </div>
          <apexchart
            v-show="!isLoading"
            ref="chart"
            width="100%"
            height="450px"
            type="bar"
            :options="options"
            :series="series"
          ></apexchart>
        </div>
      </q-card>

      <q-card
        class="p-16 mt-16 dark:border-white/10 dark:border overflow-hidden relative"
      >
        <div class="flex items-center justify-between w-full">
          <TextIcon
            class="text-title-4"
            text="Tempo por atividade"
            icon="svguse:/icons.svg#icon_tempo_atividade"
          />
          <div class="flex items-center gap-6">
            <p class="mr-6 text-caps-3">visualizando por:</p>
            <OButton
              class="text-neutral-70"
              :class="{ active: FiltroTempoAtividade === 'projeto' }"
              size="md"
              secondary
              @click="handleChangeFiltroTempoAtividade('projeto')"
              >Projeto</OButton
            >
            <OButton
              class="text-neutral-70"
              :class="{ active: FiltroTempoAtividade === 'subprojeto' }"
              size="md"
              secondary
              @click="handleChangeFiltroTempoAtividade('subprojeto')"
              >Subprojeto</OButton
            >
            <OButton
              class="text-neutral-70"
              :class="{ active: FiltroTempoAtividade === 'usuario' }"
              size="md"
              secondary
              @click="handleChangeFiltroTempoAtividade('usuario')"
              >Usuário</OButton
            >
          </div>
        </div>

        <OTable
          :loading="chamadoLoading"
          :filter="filter"
          :rows="rows"
          :columns="columns"
          primary
          :pagination="{
            rowsPerPage: 10,
          }"
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
                <o-button size="md" tertiary>
                  <q-icon name="search"
                /></o-button>
              </template>
            </OInput>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="cursor-pointer">
              <q-td
                @click="() => handleClickChamado(props.row.id)"
                key="titulo"
                :auto-width="false"
              >
                {{ props.row.titulo }}
              </q-td>

              <q-td
                @click="() => handleClickChamado(props.row.id)"
                :auto-width="false"
                key="user_criacao"
              >
                <div class="inline-flex items-center">
                  <AvatarSingle
                    class="!w-32 !h-32 overflow-hidden mr-2 ajuste-img"
                    :estatic="true"
                    :item="props.row.user_criacao"
                  ></AvatarSingle>
                  <p class="">{{ props.row.user_criacao?.nome }}</p>
                </div>
              </q-td>

              <q-td
                @click="() => handleClickChamado(props.row.id)"
                :auto-width="false"
                key="projeto"
              >
                <div class="projeto-td">
                  <q-badge
                    rounded
                    class="shrink-0 w-8 h-8"
                    :style="{ background: props.row.projeto.cor }"
                  ></q-badge>
                  {{ props.row.projeto.nome }}
                </div>
              </q-td>

              <q-td
                @click="() => handleClickChamado(props.row.id)"
                :auto-width="false"
                key="tempo_estimado"
              >
                <p class="whitespace-nowrap text-paragraph-2">
                  {{ GLOBAL.FTime(props.row.tempo_estimado) }}
                </p>
                <p
                  class="whitespace-nowrap text-paragraph-3 text-neutral-70 dark:text-white/70"
                >
                  <!-- {{ props.row.tempo_total }} -->
                  00h 00m
                </p>
              </q-td>

              <q-td
                @click="() => handleClickChamado(props.row.id)"
                :auto-width="true"
                key="tag"
              >
                <div
                  class="whitespace-nowrap text-paragraph-2 flex flex-nowrap gap-4"
                >
                  <TagBase
                    v-for="tag in props.row.tag.filter((i) => i.nome)"
                    :key="tag.id"
                    :cor="tag.cor_letra"
                    :nome="tag.nome"
                  ></TagBase>
                  <!-- <OBadge
                    v-for="tag in props.row.tag.filter((i) => i.nome)"
                    size="sm"
                    :badge="true"
                    :key="tag?.id"
                    :color="returnRGB(tag?.cor_letra)"
                    :small="true"
                    class="rounded-generic h-32 dark:!text-white/90"
                  >
                    <template #content>
                      <p class="text-center mx-auto" square>
                        {{ tag?.nome }}
                      </p>
                    </template>
                  </OBadge> -->
                </div>
              </q-td>
            </q-tr>
          </template>
        </OTable>

        <q-btn
          secondary
          icon-right="svguse:/icons.svg#icon_excel"
          label="Exportar para Excel"
          @click="() => exportTable(columns, rows)"
          class="absolute bottom-16 sm:relative sm:w-full sm:bottom-0"
          v-show="rows"
          no-caps
        >
        </q-btn>
      </q-card>
    </div>
    <!-- <span class="block h-48"></span> -->
  </q-scroll-area>
</template>

<script setup>
import { useAxios } from '@vueuse/integrations/useAxios'
import { storeToRefs } from 'pinia'
import { date, exportFile, useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OTable from 'src/components/Table/OTable.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import { useChamadoStore } from 'src/stores/chamados/chamados.store'
import GLOBAL from 'src/utils/GLOBAL'
import { computed, onMounted, ref, watch, inject } from 'vue'
import { columns1 } from './columns'
import stackedChartBar from 'src/utils/chart/stackedChartBar'
import TagBase from 'src/components/Tag/TagBase.vue'
import { deepUnref } from 'vue-deepunref'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'
const { URLS } = api.defaults

const {
  FData,
  generateStringFilterFromObject,
  // secondsToHours,
  wrapCsvValue,
  returnRGB,
  exportTable,
  //
} = GLOBAL
//
const FiltroInvestimentoPor = ref('projeto')
const FiltroTempoAtividade = ref('projeto')

function handleChangeFiltroInvestimento(tipo) {
  FiltroInvestimentoPor.value = tipo
  getTempoTask()
}
function handleChangeFiltroTempoAtividade(tipo) {
  FiltroTempoAtividade.value = tipo
  getChamadoTable()
}

// elementos
const form = ref(null)
const chart = ref(null)
const menu = ref(null)
const filter = ref('')
const handleClickChamado = inject('handleClickChamado')

const usuariosFoto = inject('usuarios')
const clientes = inject('clientes')
const projetos = inject('projetos')
// const initialLoad = inject('initialLoad')
const { getUsuariosFoto, getProjetos, getClientes } = inject('get')

const { getChamado } = useChamadoStore()
const { chamados, isLoading: chamadoLoading } = storeToRefs(useChamadoStore())
const isLoading = ref(true)

let filtrosAplicados = {}

watch(
  () => chamados.value,
  () => {
    rows.value = chamados.value
  }
)

const dataAtual = date.formatDate(new Date(), 'YYYY/MM/DD')
const seteDias = date.formatDate(
  date.addToDate(dataAtual, { days: -7 }),
  'YYYY/MM/DD'
)

const filtrosDefault = {
  cliente: {
    options: [],
    model: '',
    name: 'clienteid',
    nameVisivel: 'Cliente',
  },
  projeto: {
    options: [],
    model: '',
    name: 'projetoid',
    nameVisivel: 'Projeto',
  },

  usuario: {
    options: [],
    model: '',
    name: 'userid',
    nameVisivel: 'Usuario',
  },

  data: {
    // model: '',
    optionsFn(date) {
      // return date >= '2019/02/03' && date <= '2019/02/15'
      return true
    },

    days: {
      from: seteDias,
      to: dataAtual,
    },
  },
}
const filtros = ref(deepUnref(filtrosDefault))

const filtroOBJ = computed(() => ({
  [filtros.value.cliente.name]: filtros.value.cliente.model?.id,
  [filtros.value.projeto.name]: filtros.value.projeto.model?.id,
  [filtros.value.usuario.name]: filtros.value.usuario.model?.id,
  datainicial: filtros.value.data.days.from.replaceAll('/', '-'),
  datafinal: filtros.value.data.days.to.replaceAll('/', '-'),
}))

const filtroNameOBJ = computed(() => {
  const haveData =
    filtros.value.data.days.from?.trim() && filtros.value.data.days.to?.trim()
  const dataInicial = FData(filtros.value.data.days.from)
  const dataFinal = FData(filtros.value.data.days.to)
  const dias = date.getDateDiff(
    filtros.value.data.days.to,
    filtros.value.data.days.from
  )
  const clientenome = filtros.value.cliente.model?.nome
  const projetonome = filtros.value.projeto.model?.nome
  const usuarionome = filtros.value.usuario.model?.nome
  const obj = {}
  clientenome && (obj[filtros.value.cliente.name] = clientenome)
  projetonome && (obj[filtros.value.projeto.name] = projetonome)
  usuarionome && (obj[filtros.value.usuario.name] = usuarionome)
  obj.data = haveData ? `${dataInicial} ate ${dataFinal} ` : ''
  obj.dias = haveData ? `${dias > 1 ? `${dias} dias` : `${dias} dia`}` : ''

  return obj
})

const dataRangeFiltro = computed(() => {
  const from = filtros.value.data.days.from
  const to = filtros.value.data.days.to
  return `${from && FData(from)} ${to && '  até  '} ${to && FData(to)}`
})

watch(
  filtros,
  () => {
    console.log(filtros.value.data.days)
  },
  { deep: true }
)

// tempoTask ----------------------------------

const tempoTask = ref([])
isLoading.value = true
async function getTempoTask() {
  menu.value.hide()
  filtroOBJ.value.agrupamento = FiltroInvestimentoPor.value

  const { data, error } = await useAxios(
    URLS.tempoProjeto + '/' + generateStringFilterFromObject(filtroOBJ.value),
    { method: 'GET' },
    api
  )
  debugger

  try {
    setTempoTask(data.value)
    populateChart(data.value)
    filtrosAplicados = filtroNameOBJ.value
    return data.value
  } catch (e) {
    return error
  } finally {
    isLoading.value = false
  }
}

function setTempoTask(v) {
  tempoTask.value = v
}

const getProjectName = (id) => (acc, i) => {
  if (i.id === Number(id)) {
    acc = i.nome
  }
  return acc
}

// const projectName = (id) => projetos.value.reduce(getProjectName(id), '')

function populateChart(tempoProjetos) {
  const getDuracoes = (tempoProjeto) =>
    Object.values(tempoProjeto).map((i) => i.duracao)
  // projetos
  const duracoes = Object.values(tempoProjetos).map(getDuracoes)

  // const labels = Object.keys(tempoProjetos).map((projeto) =>
  //   projectName(projeto)
  // )
  const labels = Object.keys(tempoProjetos)

  const categories = Object.values(tempoProjetos).map((projeto) =>
    Object.keys(projeto)
  )[0]

  const generateSeriesApex = (item, index) => ({
    name: labels[index],
    data: duracoes[index],
  })

  const seriesApex = Object.values(tempoProjetos).map(generateSeriesApex)
  console.log(seriesApex)

  // if (categories && seriesApex !== {}) {
  chart.value.updateOptions({
    series: seriesApex,
    xaxis: {
      categories: categories || [],
    },
    // secondsToHours(i.duracao)
  })
  if (filtros.value.projeto.model.id) getChamadoTable()

  // }
}

function getChamadoTable() {
  const projeto = filtros.value.projeto.model.id
  getChamado(
    `${projeto ? `&projeto__id=${projeto}` : ''}` +
      `&agrupamento=${FiltroInvestimentoPor.value}`
  )
}

async function handleRemoveFilters() {
  filtros.value.cliente.model = ''
  filtros.value.projeto.model = ''
  filtros.value.usuario.model = ''
  filtros.value.data.days = { from: '', to: '' }
  getTempoTask()
}

// CHART
const columns = columns1
const rows = ref([])
const options = { ...stackedChartBar }
const series = [{ name: '', data: [] }]

async function initialRequests() {
  await getChamado()
  await getUsuariosFoto()
  await getTempoTask()
  getProjetos()
  getClientes()
  filtros.value.projeto.options = projetos.value
  filtros.value.cliente.options = clientes.value
  filtros.value.usuario.options = usuariosFoto.value
}

onMounted(async () => {
  initialRequests()
  // if (initialLoad) {
  //   initialRequests()
  //   debugger
  // } else {
  //   const unwatch = watch(initialLoad, async () => {
  //     initialRequests()
  //     debugger

  //     unwatch()
  //   })
  // }
})
</script>

<style lang="sass" scoped>
.scroll-area-48
  .q-scrollarea__container
    padding: 0 3rem

.projeto-td
    max-width: 13.75rem
    word-break: break-word
    white-space: break-spaces
    display: flex
    align-items: center
    gap: 2px
</style>
