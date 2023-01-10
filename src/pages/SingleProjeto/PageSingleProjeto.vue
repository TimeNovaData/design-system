<template>
  <q-scroll-area>
    <q-img class="w-full h-[10rem]" :src="bg"></q-img>
    <div class="container relative">
      <SingleProjetoHeader
        @updateSelect="handleChangeProjeto"
        :projeto="projeto"
        ref="header"
      />
      <q-card class="mt-32">
        <TextIcon
          class="pt-24 mx-16 mb-24"
          icon="svguse:/icons.svg#icon_date_time"
          text="Investimento Diário"
          Diário
        ></TextIcon>

        <apexchart
          ref="chart"
          width="100%"
          height="250px"
          type="bar"
          :options="optionsChart"
          :series="seriesChart"
          :class="{ 'opacity-0': !seriesChart.length }"
        ></apexchart>
      </q-card>

      <div class="grid grid-cols-2 gap-32 mt-32">
        <q-card class="p-16">
          <TextIcon
            class=""
            icon="svguse:/icons.svg#icon_tasks"
            text="Atualização dos acompanhamentos"
            Diário
          ></TextIcon>
          <div class="mt-16 grid grid-cols-2">
            <q-date
              minimal
              :years-in-month-view="false"
              class="projeto-date"
              v-model="dataAtual"
              today-btn
            />
          </div>
        </q-card>

        <q-card class="p-16">
          <TextIcon
            class=""
            icon="svguse:/icons.svg#icon_chat"
            text="Checkpoints"
            Diário
          ></TextIcon>
          <div class="mt-16 grid grid-cols-2">
            <!-- <OChatBox></OChatBox> -->
          </div>
        </q-card>
      </div>
      <!--  -->
      <!--  -->
      <!--  -->
    </div>
  </q-scroll-area>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import bg from 'src/assets/image/bg-single-projeto.png'
import TextIcon from 'src/components/Text/TextIcon.vue'

import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import { onMounted, ref, nextTick } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import SingleProjetoHeader from './SingleProjetoHeader.vue'
import stackedChartBar from 'src/utils/chart/stackedChartBar'
import { date } from 'quasar'
import OChatBox from 'src/components/Chat/OChatBox.vue'

const { getProjeto, getTempoProjeto } = useProjetoStore()
const { projeto, tempoProjeto } = storeToRefs(useProjetoStore())
const dataAtual = ref(date.formatDate(new Date(), 'YYYY/MM/DD'))

const header = ref(null)
const seriesChart = ref([])
const chart = ref(null)
const route = useRoute()
const router = useRouter()
const optionsChart = {
  ...stackedChartBar,
  dataLabels: {
    enabled: false,
  },
}

function handleChangeProjeto(projeto) {
  requests(projeto.id)
  console.log(route.params.id, router)
  router.push({ params: { id: projeto.id } })
}
const routeIsZero = Number(route.params.id) === 0

onMounted(() => {
  if (routeIsZero) {
    header.value.show()
  }
})

function populateChart(tempoProjetos) {
  debugger
  const getDuracoes = (tempoProjeto) =>
    Object.values(tempoProjeto).map((i) => i.duracao)
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
}
async function requests(id) {
  await getProjeto(id)
  await getTempoProjeto(id)
  await nextTick()
  populateChart(tempoProjeto.value)
}

if (!routeIsZero) {
  requests(route.params.id)
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
</style>
