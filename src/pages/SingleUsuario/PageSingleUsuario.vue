<template>
  <q-scroll-area>
    <header class="h-[404px]">
      <div class="h-full">
        <img
          class="h-full object-cover w-full object-right"
          v-show="!isLoading"
          :src="profileBackground"
        />
      </div>
    </header>
    <div class="container relative">
      <div class="flex items-end mt-[-255px] mb-32">
        <div class="mr-24">
          <q-skeleton v-if="isLoading" type="circle" size="160px" />
          <OAvatar
            v-else
            :foto="profileActive.foto"
            size="160px"
            class-avatar="border-2 border-white"
            style="box-sizing: initial"
          ></OAvatar>
        </div>
        <div class="usuarios">
          <div class="user-name">
            <p class="text-caps-2 text-primary-pure">Usuário</p>

            <div class="colaborador flex">
              <div class="item-editavel text-title-3 w-full h-40 text-white">
                <template v-if="profileActive.nome">
                  <span>{{ profileActive.nome }}</span>
                  <q-icon name="expand_more"></q-icon>
                </template>
                <q-skeleton v-else type="rect" height="2.5rem" width="100%" />
              </div>

              <KanbanItemEditableSelect
                text="Selecione um Usuário"
                selectLabel="Usuário"
                :options="usuarios.filter((i) => i.profile)"
                ref="itemEditableSelect"
                @updateValue="handleChangeSelect"
                :selected="
                  profileActive !== {}
                    ? usuarios.filter((i) => i.id === profileActive.user)[0]
                    : null
                "
                :selectProps="{
                  fotoKey: 'foto',
                  nomeKey: 'get_full_name',
                  clearable: false,
                }"
                option-label="get_full_name"
                :clearActive="false"
              />
            </div>
          </div>
          <div class="user-infos mt-16 flex gap-32">
            <div class="flex flex-col">
              <p class="text-caps-3 text-white/70 mb-2">TRABALHANDO EM</p>

              <div class="flex items-center flex-nowrap h-32">
                <q-icon
                  name="svguse:/icons.svg#icon_suitcase"
                  class="text-primary-pure mr-8"
                  size="1.5rem"
                >
                </q-icon>
                <q-skeleton
                  v-if="isLoading"
                  type="rect"
                  height="1.5rem"
                  width="170px"
                />
                <p
                  v-else-if="profileProjects"
                  class="text-headline-4 text-white"
                >
                  <span>
                    {{ profileProjects }}
                  </span>
                </p>
                <p v-else class="text-headline-4 text-white">-</p>
              </div>
            </div>

            <div class="flex flex-col">
              <p class="text-caps-3 text-white/70 mb-2">Data de aniversário</p>
              <div class="flex items-center h-32">
                <q-icon
                  name="svguse:/icons.svg#icon_calendar_check"
                  class="text-primary-pure mr-8"
                  size="1.5rem"
                >
                </q-icon>
                <q-skeleton
                  v-if="isLoading"
                  type="rect"
                  height="1.5rem"
                  width="90px"
                />
                <p
                  v-else-if="profileActive.data_nascimento"
                  class="text-headline-4 text-white"
                >
                  {{ profileActive.data_nascimento }}
                </p>
                <p v-else class="text-headline-4 text-white">-</p>
              </div>
            </div>

            <div class="flex flex-col">
              <p class="text-caps-3 text-white/70 mb-2">Equipe</p>
              <q-skeleton v-if="isLoading" type="circle" size="32px" />
              <div v-else-if="profileTeam.length" class="relative h-[30px]">
                <AvatarMultiple
                  :list="profileTeam"
                  :avatarAttrs="{
                    class: '!bg-d-neutral-30 !border-d-neutral-10',
                  }"
                ></AvatarMultiple>
              </div>
              <p v-else class="text-headline-4 text-white my-auto">-</p>
            </div>
          </div>
        </div>
      </div>

      <section id="tasks" class="bg-neutral-10 dark:bg-d-neutral-10 mb-16">
        <div class="header-wrapper flex items-center justify-between p-16">
          <div class="item-1 flex items-center">
            <q-icon
              name="svguse:/icons.svg#icon_menu_tasks"
              class="text-primary-pure mr-6"
              size="1.5rem"
            ></q-icon>
            <p class="text-title-4">Minhas Tasks</p>
          </div>

          <div class="item-2">
            <OButton
              size="md"
              secondary
              @click="() => handleGetTasksPendentes(userActiveID)"
            >
              <q-icon
                id="icon-reload-kanban"
                size="1.5rem"
                name="replay"
              ></q-icon>
            </OButton>

            <OButton class="ml-8" size="md" primary @click="openTaskEditModal">
              <q-icon
                name="svguse:/icons.svg#icon_add_task"
                size="1.5rem"
                color="text-neutral-100"
              ></q-icon>
              Nova Task
            </OButton>
            <OButton class="ml-8" disable size="md" secondary>
              <q-icon name="svguse:/icons.svg#icon_filtros"></q-icon>

              Filtrar
            </OButton>
          </div>
        </div>

        <!-- 🟡 TASK PENDENTES -->

        <div class="tasks-grid">
          <div class="flex w-full">
            <div class="flex items-center w-full">
              <div class="mx-auto w-full">
                <div class="grid grid-cols-1 gap-2 py-4">
                  <div class="">
                    <div class="base-grid px-16">
                      <p class="empty-col"></p>
                      <p class="text-headline-3 pl-16">Task</p>
                      <p class="text-headline-3 pl-16">Solicitante</p>
                      <!-- <p class="text-headline-3 pl-16">Urgência</p> -->
                      <!-- <p class="text-headline-3 pl-16">Data de Criação</p> -->
                      <p class="text-headline-3 pl-16">Desejada</p>
                      <p class="text-headline-3 pl-16">Prevista</p>
                    </div>
                    <div
                      v-if="!tasks.pendentes.length & loading"
                      class="flex flex-col gap-4 mt-10"
                    >
                      <q-skeleton
                        :key="n"
                        v-for="n in GLOBAL.getRandomInt(3, 6)"
                        v-once
                        type="rect"
                        class="h-[3.25rem]"
                      />
                    </div>
                    <div
                      class="overflow-hidden relative mt-6"
                      v-else-if="tasks.pendentes.length"
                    >
                      <!-- <template v-for="(task, index) in tasks" :key="task.id"> -->
                      <draggable
                        v-bind="dragOptions"
                        :list="tasks.pendentes"
                        item-key="id"
                        :handle="'#drag-id'"
                        :component-data="{
                          tag: 'div',
                          type: 'transition-group',
                          name: 'flip-list',
                          class: `transition-div `,
                        }"
                        @end="endDrag"
                      >
                        <template #item="{ element }">
                          <TaskColaborador
                            :task="element"
                            @click:timer="handleClickTimer"
                            @click:task:finished="handleTaskFinished"
                          />
                        </template>
                      </draggable>
                    </div>
                    <div v-else class="h-[150px]">
                      <EmptyItem text="Lista de tasks vazia." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ✅ TASK FINALIZADAS -->
      <section id="tasks-finalizadas" class="bg-white dark:!bg-d-neutral-20">
        <OAccordion
          ref="accordionConcluidas"
          class="border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden"
        >
          <!-- @before-show="() => handleGetTasksConcluidas(userActiveID)" -->
          <template v-slot:header>
            <div class="flex items-center flex-1">
              <q-item-section avatar class="w-32">
                <q-icon
                  name="svguse:/icons.svg#icon_concluido"
                  size="sm"
                  class="text-primary-pure mr-6"
                />
              </q-item-section>
              <p class="text-title-4">Tasks Finalizadas</p>
            </div>
          </template>

          <div v-if="finishedTasks?.length">
            <q-virtual-scroll
              style="max-height: 450px"
              :items="tasks.concluidas"
              separator
              v-slot="{ item }"
              class="relative"
            >
              <TaskColaborador
                :task="item"
                :hideDragIcon="true"
                :completed="true"
                @click:timer="handleClickTimer"
                @click:task:restored="handleTaskRestored"
              />
            </q-virtual-scroll>
          </div>

          <div v-else class="h-[250px]">
            <EmptyItem text="Nenhuma task finalizada." />
          </div>
        </OAccordion>
      </section>

      <section id="consumo-horas">
        <q-card class="mt-16 mb-48 flex flex-col">
          <div class="flex items-center justify-between w-full">
            <TextIcon
              class="pt-24 mx-16 mb-24 text-title-4"
              icon="svguse:/icons.svg#icon_date_time"
              text="Consumo de Horas"
            ></TextIcon>

            <div>
              <TagBase
                class="mr-16 bg-alert-success/10 text-alert-success dark:text-white/90 dark:!bg-alert-success/30"
                :nome="`Filtrando por ⠂<span class='font-semibold'>${filtroHoraConsumo.label}</span>`"
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
                          :options="filtroHoraConsumoOptions"
                          v-model="filtroHoraConsumo"
                          @update:model-value="handleChangeHoraConsumo"
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
              v-show="!isLoadingHoraConsumo && seriesChart.length"
            ></apexchart>
            <SkeletonChart
              class="h-[250px] flex flex-col"
              v-show="isLoadingHoraConsumo && seriesChart.length === 0"
            />
            <div
              class="h-[250px]"
              v-show="!isLoadingHoraConsumo && seriesChart.length === 0"
            >
              <EmptyItem text="Sem dados para visualizar o grafico." />
            </div>
          </div>
        </q-card>
      </section>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, inject, computed, nextTick, watch } from 'vue'
import { date, LoadingBar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import draggable from 'vuedraggable'

import GLOBAL from 'src/utils/GLOBAL'
import stackedChartBar from 'src/utils/chart/stackedChartBar'
import { NotifyError, NotifySucess } from 'src/boot/Notify'
import emitter from 'src/boot/emitter'
import { api } from 'src/boot/axios'

import bg from 'src/assets/image/bg-single-usuario.png'
import avatar from 'src/assets/image/gravatar.jpg'

import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import TaskColaborador from 'src/components/TaskColaborador/TaskColaborador.vue'
import TagBase from 'src/components/Tag/TagBase.vue'
import KanbanItemEditableSelect from 'src/components/Kanban/KanbanItemEditableSelect.vue'
import SkeletonChart from 'src/components/Skeleton/SkeletonChart.vue'
import EmptyItem from 'src/components/Empty/EmptyItem.vue'

import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useProfileStore } from 'src/stores/profile/profile.store'

// ==========================================================================================

const { URLS } = api.defaults

const route = useRoute()
const router = useRouter()

const user = inject('user')
const usuarios = inject('usuarios')
const userProfile = inject('userProfile')
const openTaskEditModal = inject('openTaskEditModal')
const taskActive = inject('taskActive')

const loading = ref(true)
const userActiveID = ref(null)

const { getTasks, pathTask, updateTaskOrder } = useTaskStore()
const { tasksColaborador: tasks } = storeToRefs(useTaskStore())

const { getProfile } = useProfileStore()
const { profileActive, isLoading } = storeToRefs(useProfileStore())

// ==========================================================================================
// DRAG AND DROP DAS TASKS ==================================================================
const listIDSInOrder = ref([])

function endDrag(ev) {
  ev.stopImmediatePropagation()
  ev.stopPropagation()

  const { oldIndex, newIndex } = ev
  const list = listIDSInOrder.value

  const el = list[oldIndex]
  list.splice(oldIndex, 1)
  list.splice(newIndex, 0, el)

  updateTaskOrder(list)
}

// ==========================================================================================
// GRAFICO CONSUMO DE HORAS =================================================================

const chart = ref(null)
const seriesChart = ref([])
const isLoadingHoraConsumo = ref(true)

const optionsChart = ref({
  // Chart config
  ...stackedChartBar,
  dataLabels: { enabled: false },
  chart: {
    id: 'chart1',
    type: 'bar',
    height: 250,
    width: '100%',
    stacked: true,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false },
  },
  xaxis: {
    categories: [],
    labels: {
      // rotateAlways: true,
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

const filtroHoraConsumo = ref({
  label: 'Projeto',
  value: 'projeto',
})

const filtroHoraConsumoOptions = [
  {
    label: 'Projeto',
    value: 'projeto',
  },
  {
    label: 'Subprojeto',
    value: 'sub_projeto',
  },
  {
    label: 'Chamado',
    value: 'chamado',
  },
]

async function handleChangeHoraConsumo(opt) {
  filtroHoraConsumo.value = opt

  await nextTick()
  getTempoTask()
}

async function getTempoTask() {
  isLoadingHoraConsumo.value = true

  try {
    const { data } = await api.get(
      URLS.tempoProjeto +
        `/?x=&userid=${userActiveID.value}&agrupamento=${filtroHoraConsumo.value.value}`
    )

    populateChart(data)
    return data.value
  } catch (err) {
    console.log(err)
  } finally {
    isLoadingHoraConsumo.value = false
  }
}

async function populateChart(tempoTasks) {
  const data = tempoTasks.map((i) => {
    const data = i.datas.map((i) => i.duracao)
    return {
      name: i.item,
      data,
    }
  })

  const categorias = tempoTasks[0]?.datas.map((i) => i.data)
  seriesChart.value = data
  await nextTick()

  if (chart.value) {
    chart.value.updateOptions({
      series: data,
      xaxis: { categories: categorias },
    })
  }
}

// ==========================================================================================
// INFORMAÇÕES DO HEADER ====================================================================

const profileProjects = computed(() => {
  const projects = profileActive.value.projetos.map((p) => p.nome)
  return projects.join(' • ')
})

const profileTeam = computed(() => {
  return profileActive.value.equipe?.map((t) => ({
    foto: t.profile.foto || '',
    nome: t.get_full_name,
  }))
})

const profileBackground = computed(() =>
  profileActive?.capa ? profileActive.capa : bg
)

// ==========================================================================================
// MUDANÇA DO PROFILE (HANDLE CHANDE FUNCTIONS) =============================================

async function handleChangeSelect({ profile, id }) {
  loading.value = true
  userActiveID.value = id

  await handleChangeProfile(profile.id)
  await handleGetTasksPendentes(id)
  await getTempoTask()
  await handleGetTasksConcluidas(id)

  tasks.value.concluidas = []
  accordionConcluidas.value.componentRef.hide()

  loading.value = false
}

async function handleChangeProfile(profileId) {
  profileActive.value = {}
  await getProfile(profileId)
}

// ==========================================================================================
// TASKS PENDENTES (MINHAS TASKS) ===========================================================

const handleGetTasksPendentes = async (userId) => {
  router.push({ params: { id: userId } })
  LoadingBar.start()
  // tasks.value.pendentes = []

  tasks.value.pendentes = await getTasks(
    `&responsavel_task__id=${userId}&page_size=100&status=abertas`,
    false
  )

  listIDSInOrder.value = tasks.value.pendentes.map((i) => i.id)

  LoadingBar.stop()
}

// ==========================================================================================
// TASKS FINALIZADAS ========================================================================

const accordionConcluidas = ref(null)

const finishedTasks = computed(() => {
  const arr = tasks.value.concluidas
  const reversed = [...arr].reverse()
  return reversed
})

const handleGetTasksConcluidas = async (userId) => {
  tasks.value.concluidas = []

  tasks.value.concluidas = await getTasks(
    `&responsavel_task__id=${userId}&page_size=10&status=concluidas`,
    false
  )
}

// ==========================================================================================
// FINALIZAR E RESTAURAR TASK ===============================================================

async function handleTaskFinished(taskObj) {
  const today = Date.now()
  const dateFormated = date.formatDate(today, 'YYYY-MM-DD')

  try {
    await pathTask(taskObj.id, { data_conclusao: dateFormated })

    tasks.value.pendentes = tasks.value.pendentes.filter(
      (i) => i.id !== taskObj.id
    )
    tasks.value.concluidas.push(taskObj)
    NotifySucess('Task concluida com sucesso!')
  } catch (err) {
    console.log(err)
    NotifyError('Erro ao concluir a tarefa')
  }
}

async function handleTaskRestored(taskObj) {
  try {
    await pathTask(taskObj.id, { data_conclusao: null })

    tasks.value.concluidas = tasks.value.concluidas.filter(
      (i) => i.id !== taskObj.id
    )
    tasks.value.pendentes.push(taskObj)
    NotifySucess('Task restaurada com sucesso!')
  } catch (err) {
    console.log(err)
    NotifyError('Erro ao restaurar a tarefa')
  }
}

// ==========================================================================================
// OUTROS ===================================================================================

const handleClickTimer = (v) => (taskActive.value = v)

emitter.on('modal:task:create', () => {
  // Atualizar lista de task ao criar uma nova task no modal
  handleGetTasksPendentes(userActiveID.value)
})

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

async function init() {
  tasks.value = {
    concluidas: [],
    pendentes: [],
  }
  const routeID = route.params.id
  const userRoute = routeID === 'user'

  // USER
  const IDFinal = Number(userRoute ? user.value.id : routeID) // ID DO USUÁRIO OU DA URL

  // PROFILE
  const userProfileID = userProfile.value.id // É O PROFILE DO USUARIO LOGADO
  const profileID = usuarios.value
    .filter((i) => i.id === IDFinal)
    ?.reduce((acc, i) => i, {})?.profile.id // É O PROFILE DO USUÁRIO SELECIONADO

  await nextTick()

  userRoute && router.push({ params: { id: IDFinal } })

  // handleChangeProfile RECEBE O ID DO PROFILE
  await handleChangeProfile(userRoute ? userProfileID : profileID)

  // getTasksPaged RECEBE O ID DO USUARIO
  userActiveID.value = IDFinal

  await nextTick()

  await handleGetTasksPendentes(IDFinal)

  // Grafico Consumo de Horas
  await getTempoTask()
  loading.value = false

  await handleGetTasksConcluidas(IDFinal)
}

let iniciou
watch(
  [userProfile, usuarios],
  () => {
    if (iniciou) return
    if (userProfile.value.id && usuarios.value.length) {
      init()
      iniciou = true
    }
  },
  {
    immediate: true,
  }
)

// Redirecionar usuário caso não tenha o status de staff
if (!user.value.is_staff) router.push({ name: '404' })
</script>

<style lang="sass" scoped>
#tasks
  border-radius: 6px 6px 0 0

.base-grid
  display: grid
  grid-template-columns: minmax(55px, 65px)  minmax(200px, 1fr) minmax(170px, 230px) repeat(2, 100px) minmax(120px, 130px)
  // grid-template-columns: minmax(55px, 65px)  minmax(200px, 1fr) minmax(170px, 230px) minmax(120px, 130px)  repeat(2, 100px) minmax(120px, 130px)
  align-items: center

.item-editavel
  display: flex
  align-items: center
  gap:.5rem
  cursor: pointer
  padding: 2px
  border-radius: 3px
  border: 1px solid transparent
  transition: .3s ease
  &:hover
    border-color: rgba(var(--white),0.2)
</style>
