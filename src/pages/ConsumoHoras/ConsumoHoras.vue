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
              class="!px-6 !bg-neutral-30 dark:!bg-white/5 text-neutral-70 border border-neutral-100/5"
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
            v-model="popupValue"
            :model-value="popupValue"
          >
            <q-form ref="form">
              <q-list class="min-w-[23.5rem]">
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
                <q-item class="px-0">
                  <OSelect
                    v-model="filtros.cliente.model"
                    use-input
                    label="Cliente"
                    size="md"
                    class="w-full"
                    :options="filtros.cliente.options"
                    clearable
                    option-value="id"
                    option-label="nome"
                  >
                  </OSelect>
                </q-item>
                <q-item class="px-0">
                  <OSelect
                    use-input
                    label="Projeto"
                    size="md"
                    class="w-full"
                    :options="filtros.projeto.options"
                    v-model="filtros.projeto.model"
                    clearable
                    option-value="id"
                    option-label="nome"
                  >
                  </OSelect>
                </q-item>

                <q-item class="px-0 flex gap-4">
                  <OSelect
                    use-input
                    label="Usuário"
                    size="md"
                    class="w-full"
                    :options="filtros.usuario.options"
                    v-model="filtros.usuario.model"
                    clearable
                    option-value="id"
                    option-label="nome"
                  >
                  </OSelect>
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
                    @click="getTempoTask"
                    :loading="isLoading"
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

          <div class="flex items-center gap-6 pointer-events-none opacity-30">
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
        class="p-16 mt-16 dark:border-white/10 dark:border overflow-hidden"
      >
        <div class="flex items-center justify-between w-full">
          <TextIcon
            class="text-title-4"
            text="Tempo por atividade"
            icon="svguse:/icons.svg#icon_tempo_atividade"
          />
          <div class="flex items-center gap-6 pointer-events-none opacity-30">
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
                <o-button size="md" tertiary>
                  <q-icon name="search"
                /></o-button>
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
                  ><template #content>{{
                    props.row.calcium
                  }}</template></o-badge
                >
              </q-td>
              <q-td key="iron" :props="props">
                <q-icon name="search"></q-icon>
              </q-td>
            </q-tr>
          </template>
        </OTable>
      </q-card>
    </div>
    <!-- <span class="block h-48"></span> -->
  </q-scroll-area>
</template>

<script setup>
import TextIcon from 'src/components/Text/TextIcon.vue'
import OButton from 'src/components/Button/OButton.vue'
import { ref, watch, computed, onMounted } from 'vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OTable from 'src/components/Table/OTable.vue'
import UseConsumoHoras from 'src/composables/useConsumoHoras'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { date } from 'quasar'
import GLOBAL from 'src/utils/GLOBAL'
// import { useGetStore } from 'src/stores/get.store.js'
import { storeToRefs } from 'pinia'
import { useClientesStore } from 'src/stores/clientes/clientes.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import { useUsuarioStore } from 'src/stores/usuarios/usuarios.store'
import { nextTick } from 'process'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

const { FData, generateStringFilterFromObject, secondsToHours } = GLOBAL
const por = ref('projeto')

const { columns, rows, filter } = UseConsumoHoras()

const form = ref(null)
const chart = ref(null)
const menu = ref(null)
const { getClientes } = useClientesStore()
const { getProjetos } = useProjetoStore()
const { getUsuariosFoto } = useUsuarioStore()

const { usuariosFoto } = storeToRefs(useUsuarioStore())
const { clientes } = storeToRefs(useClientesStore())
const { projetos } = storeToRefs(useProjetoStore())

const isLoading = ref(false)
onMounted(async () => {
  await getClientes()
  await getProjetos()
  await getUsuariosFoto()
  filtros.value.cliente.options = clientes.value
  filtros.value.projeto.options = projetos.value
  filtros.value.usuario.options = usuariosFoto.value
})

let filtrosAplicados = {}

const options = {
  colors: [
    '#5a5568',
    '#febf44',
    '#6892ff',
    '#30e8aa',
    '#a82ac8',
    '#fff9c6',
    '#95ff8c',
    '#ffb388',
    '#99c5dd',
    '#ff6565',
    '#917bd9',
    '#d91540',
    '#800080',
    '#FF871E',
    '#77001A',
    '#18B25D',
  ],
  chart: {
    id: 'chart1',
    type: 'bar',
    height: 450,
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
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  yaxis: {
    floating: true,
    labels: {
      formatter: function (val, opt) {
        return secondsToHours(val, false)
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
    },
    formatter: function (val, opt) {
      return secondsToHours(val, false)
    },
  },
  tooltip: {
    y: {
      show: true,
      format: 'dd MMM',
      formatter: function (val, opt) {
        return secondsToHours(val, false)
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      // borderRadius: 5,
    },
  },
}

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
]

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
const filtros = ref(filtrosDefault)
const popupValue = ref(filtros.value)

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

async function getTempoTask() {
  isLoading.value = true
  menu.value.hide()

  const { data, error } = await useAxios(
    URLS.tempoProjeto + '/' + generateStringFilterFromObject(filtroOBJ.value),
    { method: 'GET' },
    api
  )

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

const projectName = (id) => projetos.value.reduce(getProjectName(id), '')

function populateChart(tempoProjetos) {
  const getDuracoes = (tempoProjeto) =>
    Object.values(tempoProjeto).map((i) => i.duracao)
  // projetos
  const duracoes = Object.values(tempoProjetos).map(getDuracoes)

  const labels = Object.keys(tempoProjetos).map((projeto) =>
    projectName(projeto)
  )

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
  // }
}
async function handleRemoveFilters() {
  filtros.value = filtrosDefault
  await nextTick()
  getTempoTask()
}
onMounted(() => {
  getTempoTask()
})
</script>

<style lang="sass" scoped>
.scroll-area-48
  .q-scrollarea__container
    padding: 0 3rem
</style>
