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
          <q-card class="mt-32">
            <TextIcon
              class="pt-24 mx-16 mb-24 text-title-4"
              icon="svguse:/icons.svg#icon_date_time"
              text="Investimento Diário"
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
              <div class="grid grid-cols-2 gap-16">
                <div class="mt-16 grid grid-cols-2 gap-2">
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

            <div
              class="table-container border border-neutral-100/10 rounded-generic mt-16 dark:border-white/10"
            >
              <header
                class="grid grid-chamados border-neutral-100/10 border-b dark:border-white/10"
              >
                <div></div>
                <div class="p-16 text-headline-3 flex items-center">Task</div>
                <div
                  class="p-16 text-headline-3 flex items-center text-end justify-end"
                >
                  Data de Criação
                </div>
                <div
                  class="p-16 text-headline-3 flex items-center text-end justify-end"
                >
                  Data Desejada
                </div>
                <div
                  class="p-16 text-headline-3 flex items-center text-end justify-end"
                >
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
                        class="grid-chamados h-52 cursor-pointer hover:bg-neutral-10 relative dark:hover:bg-white/5 border-neutral-100/10 border-b"
                      >
                        <div>
                          <q-icon name="svguse:/icons.svg#icon_drag"></q-icon>
                        </div>
                        <div class="flex items-center gap-4 px-16 py-6">
                          <OAvatar
                            size="32px"
                            :foto="i.user_criacao.foto"
                          ></OAvatar>
                          <div class="flex flex-col">
                            <p class="text-paragraph-2 one-line">
                              {{ i.titulo }}
                            </p>
                            <span
                              class="text-neutral-60 text-paragraph-3 dark:text-white/60"
                              >{{ i.user_criacao.nome }}</span
                            >
                          </div>
                        </div>

                        <div
                          class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-16 text-end justify-end"
                        >
                          {{ GLOBAL.FData(i.data_criacao) }}
                        </div>

                        <div
                          class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-16 !text-end justify-end"
                        >
                          {{ GLOBAL.FData(i.data_desejada) }}
                        </div>

                        <div
                          class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-16 !text-end justify-end"
                        >
                          {{ GLOBAL.FData(i.data_atualizacao) }}
                        </div>

                        <div
                          class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-10"
                        >
                          <div
                            class="bg-neutral-100/10 w-full h-full justify-center flex text-center items-center rounded-generic"
                          >
                            {{ i.anexo || '-' }}
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- 
{
  "id": 154,
  "projeto": {
    "id": 17,
    "nome": "projeto teste",
    "cor": "#11D276",
    "tem_subprojetos": false
  },
  "tag": [],
  "titulo": "❌asdasd",
  "descricao": "",
  "fase": {
    "id": 9,
    "ultima_atualizacao": "2021-06-17T18:17:04.816826Z",
    "nome": "Standby",
    "ordem": 10,
    "fase_conclusao": false
  },
  "anexo": null,
  "data_prevista": null,
  "data_desejada": null,
  "tempo_estimado": "00:00:00",
  "orcado": "00:00:00",
  "data_conclusao": null,
  "responsaveis": [
    {
      "id": 2,
      "nome": "emanuel morais",
      "foto": "http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg"
    }
  ],
  "data_criacao": "2023-01-12T10:22:26.906468-03:00",
  "data_atualizacao": "2023-01-12T10:22:26.906546-03:00",
  "user_criacao": {
    "id": 2,
    "nome": "emanuel morais",
    "foto": "http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg"
  },
  "arquivado": false,
  "sub_projeto": null,
  "ordem": 22,
  "tempo_decorrido": "00:00:00",
  "quantidade_tasks": 0,
  "quantidade_tasks_concluidas": 0,
  "quantidade_tasks_pendentes": 0,
  "quantidade_anexos": 0
}

                     -->
                  </draggable>
                </q-scroll-area>
              </article>
            </div>
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

const { URLS } = api.defaults

const { getProjeto, getTempoProjeto } = useProjetoStore()
const { projeto, tempoProjeto } = storeToRefs(useProjetoStore())
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

const header = ref(null)
const seriesChart = ref([])
const chart = ref(null)
const route = useRoute()
const router = useRouter()
const drag = ref(false)
const chamadosList = ref([])
const handleClickChamado = inject('handleClickChamado')

const getChamados = async (id) => api.get(`${URLS.chamado}?projeto__id=${id}`)

async function handleChangeProjeto(p) {
  projeto.value = {}
  await requests(p.id)
  router.push({ params: { id: p.id } })
}
const routeIsZero = Number(route.params.id) === 0

onMounted(() => {
  modalAcessos.value.dialogRef.show()
  modalContatos.value.dialogRef.show()
  if (routeIsZero) {
    header.value.show()
  }
})

function startAndEndDrag() {
  console.log('arrastou')
}

watch(
  () => projeto,
  (v) => {
    setIDComments(v.value.id)
  },
  { deep: true }
)

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
// async function requests(id) {
//   await getProjeto(id)
//   await getTempoProjeto(id)
//   await nextTick()
//   // populateChart(tempoProjeto.value)
// }

async function requests(id) {
  await getProjeto(id)
  await getTempoProjeto(id)
  await nextTick()

  const req = await getChamados(id)
  chamadosList.value = req.data
  // 🟢
  // seriesChart.value = populateChart(tempoProjeto.value, chart)
}

if (!routeIsZero) {
  requests(route.params.id)
}

onUnmounted(() => {
  projeto.value = {}
  tempoProjeto.value = {}
})

const optionsChart = {
  ...stackedChartBar,
  dataLabels: {
    enabled: false,
  },
}

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))
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

.grid-chamados
  grid-template-columns: 3.25rem auto 162px 162px 162px 100px
  display: grid
  width: 100%
</style>

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
