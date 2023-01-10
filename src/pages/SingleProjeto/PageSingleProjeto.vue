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

      <q-card class="p-16 mt-32">
        <TextIcon
          class="text-title-4"
          icon="svguse:/icons.svg#icon_file_add"
          text="Chamados"
        ></TextIcon>

        <div
          class="table-container border border-neutral-100/10 rounded-generic mt-16"
        >
          <header class="grid grid-chamados border-neutral-100/10 border-b">
            <div></div>
            <div class="p-16 text-headline-3 flex items-center">Task</div>
            <div class="p-16 text-headline-3 flex items-center">
              Data de Criação
            </div>
            <div class="p-16 text-headline-3 flex items-center">
              Data Desejada
            </div>
            <div class="p-16 text-headline-3 flex items-center">
              Última Atualização
            </div>
            <div class="p-16 text-headline-3 flex items-center">Anexos</div>
          </header>
          <article>
            <q-scroll-area class="!h-[400px]">
              <draggable
                v-bind="dragOptions"
                :list="chamadosList"
                :component-data="{
                  tag: 'div',
                  type: 'transition-group',
                  name: !drag ? 'flip-list' : null,
                  class: `transition-div `,
                }"
                group="a"
                itemKey="name"
                @end="(e) => startAndEndDrag(e, false)"
                @start="(e) => startAndEndDrag(e, true)"
              >
                <template #item="{ element: i }">
                  <div
                    @click="() => handleClickChamado(i.id)"
                    class="grid-chamados h-52 cursor-pointer hover:bg-neutral-10 relative"
                  >
                    <div></div>
                    <div
                      class="flex items-center gap-4 px-16 py-6 border-neutral-100/10 border-b"
                    >
                      <OAvatar
                        size="32px"
                        :foto="i.user_criacao.foto"
                      ></OAvatar>
                      <div class="flex flex-col">
                        <p class="text-paragraph-2 one-line">
                          {{ i.titulo }}
                        </p>
                        <span class="text-neutral-60 text-paragraph-3">{{
                          i.user_criacao.nome
                        }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- 
{
  id: 70,
  projeto: {
    id: 4,
    nome: '#aquipneus#',
    cliente: 4,
    nome_cliente: 'wqwdqwdqw',
    logo: 'http://localhost:8000/media/defaults/logo_cliente.png',
    cor: '#11D276',
    fim_contrato: null,
    status: 'Recorrente',
    escopo: '',
    briefing_text: null,
    responsaveis: [
      {
        id: 2,
        nome: 'emanuel morais',
        foto: 'http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg',
      },
      {
        id: 1,
        nome: 'Cola Borador',
        foto: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e/?s=100',
      },
      {
        id: 5,
        nome: 'daniel silva',
        foto: 'https://www.gravatar.com/avatar/24e1c6184c96437ebce240c62f21834c/?s=100',
      },
      {
        id: 3,
        nome: 'Bernardo Moraes',
        foto: 'http://localhost:8000/media/avatars/emanuel3/resized/100/nyan2.gif',
      },
    ],
    atendimento: [
      {
        id: 2,
        nome: 'emanuel morais',
        foto: 'http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg',
      },
    ],
    usuarios_com_acesso: [],
    tem_subprojetos: true,
  },
  tag: [
    { id: 3, nome: 'tag tu', cor_letra: '#D2821B', cor_fundo: '#F6FEFA' },
    { id: 6, nome: 'sdfds', cor_letra: '#8f0000', cor_fundo: '#F6FEFA' },
  ],
  titulo:
    'novo Chamado sadasdasdas dasd das das das  asd asd ads dasda sd as ads dda sdas das adasd',
  descricao: '',
  descricao_chamado: null,
  prioridade: null,
  fase: {
    id: 9,
    ultima_atualizacao: '2021-06-17T18:17:04.816826Z',
    nome: 'Standby',
    ordem: 10,
    fase_conclusao: false,
  },
  link: null,
  anexo: null,
  data_prevista: '2023-12-15',
  data_desejada: '2023-12-12',
  tempo_estimado: '00:00:00',
  data_conclusao: null,
  aprovado: false,
  prazo_aprovacao: null,
  data_aprovacao: null,
  responsaveis: [
    {
      id: 2,
      nome: 'emanuel morais',
      foto: 'http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg',
    },
  ],
  data_criacao: '2022-12-21T14:55:31.093909-03:00',
  data_atualizacao: '2022-12-21T14:55:31.093995-03:00',
  user_criacao: {
    id: 2,
    nome: 'emanuel morais',
    foto: 'http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg',
  },
  arquivado: false,
  sub_projeto: {
    id: 1,
    logo: 'http://localhost:8000/media/defaults/logo_cliente.png',
    nome: 'Subprojeto 1',
    cor: '#11D276',
    data_desejada: '2022-12-26',
    caso_pai: 4,
  },
  coluna_sub_projeto: null,
  ordem: 2,
  descricao_quill_html: '',
  tempo_total: '0.0',
  tempo_decorrido: '00:00:00',
  quantidade_tasks: 0,
  quantidade_tasks_concluidas: 0,
  quantidade_tasks_pendentes: 0,
  quantidade_anexos: 0,
}


               -->

                <!--  -->
              </draggable>
            </q-scroll-area>
          </article>
        </div>
      </q-card>

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
