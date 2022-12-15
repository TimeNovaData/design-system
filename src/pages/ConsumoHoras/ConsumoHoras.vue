<template>
  <q-scroll-area
    class="fit"
    style="height: calc(100vh - var(--top-size))"
    delay="0"
  >
    <div class="mx-48 mb-48">
      <div class="flex items-center justify-between mt-24">
        <TextIcon text="Horas Consumidas" icon="svguse:/icons.svg#icon_horas" />
        <OButton primary size="md" icon="svguse:/icons.svg#icon_filtros"
          >Filtros
          <q-menu
            class="p-12"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-form ref="form">
              <q-list class="min-w-[23.5rem]">
                <q-item
                  class="px-0 text-headline-3 text-neutral-60 dark:text-white/60"
                  dense
                >
                  Filtros
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
                  >
                  </OSelect>
                </q-item>

                <q-item class="px-0 flex gap-4">
                  <OSelect
                    use-input
                    label="Subprojeto"
                    size="md"
                    class="w-full"
                    :options="filtros.subprojeto.options"
                    v-model="filtros.subprojeto.model"
                    clearable
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
                  <OButton size="md" icon="close" tertiary>
                    Remover Filtros</OButton
                  >
                  <OButton size="md" icon="check" primary>Aplicar</OButton>
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

      <q-card
        class="p-16 mt-16 dark:border-white/10 dark:border overflow-hidden"
      >
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

const { FData } = GLOBAL
const por = ref('projeto')

const { columns, rows, filter } = UseConsumoHoras()

const form = ref(null)

const { getClientes, clientesOptions } = useClientesStore()

onMounted(() => {
  getClientes()
  console.log(clientesOptions)
})
// const {
//   getClientes,
//   getProjetos,
//   getSubProjetos,
//   getUsuarios,
//   /*  */
// } = useGetStore()

// const {
//   isLoadings,
//   clientes,
//   projetos,
//   subProjetos,
//   usuarios,
//   /*  */
// } = storeToRefs(useGetStore())

// const clienteOpts = computed(() =>
//   clientes.value.map((i) => ({ label: i.nome, value: i.id }))
// )

// const projetosOpts = computed(() =>
//   projetos.value.map((i) => ({ label: i.nome, value: i.id }))
// )

// onMounted(async () => {
//   await getClientes()
//   await getProjetos()
//   await getSubProjetos()
//   await getUsuarios()
// })
// console.log('getProjeto', getProjeto())
// console.log('getSubProjeto', getSubProjeto())
// console.log('getUsuario', getUsuario())

// console.log(getCliente(), 'getCliente')

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

const filtros = ref({
  cliente: {
    options: [
      {
        label: 'Logbit',
        value: 1,
      },
    ],
    model: '',
  },
  projeto: {
    options: [
      {
        label: 'Logbit - Assessment',
        value: 1,
      },
    ],
    model: '',
  },

  subprojeto: {
    options: [
      {
        label: 'Logbit - Assessment',
        value: 1,
      },
    ],
    model: '',
  },

  usuario: {
    options: [
      {
        label: 'Andrei',
        value: 1,
      },
    ],
    model: '',
  },

  data: {
    // model: '',
    optionsFn(date) {
      // return date >= '2019/02/03' && date <= '2019/02/15'
      return true
    },
    days: {
      from: '',
      to: '',
    },
  },
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
</script>

<style lang="sass" scoped>
.scroll-area-48
  .q-scrollarea__container
    padding: 0 3rem
</style>
