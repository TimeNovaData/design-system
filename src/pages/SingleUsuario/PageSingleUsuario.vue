<template>
  <q-scroll-area>
    <header class="foto-capa" :class="{ haveProjeto: !isLoading }">
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
                @keydown="clearInputProfile"
                :selectProps="{
                  fotoKey: 'foto',
                  nomeKey: 'get_full_name',
                  clearable: false,
                }"
                option-label="get_full_name"
                :clearActive="false"
              />
              <!-- :selected="
                  profileActive !== {}
                    ? usuarios.filter((i) => i.id === profileActive.user)[0]
                    : null
                " -->
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
                <div
                  v-else-if="profileProjects"
                  class="text-headline-4 text-white flex"
                >
                  <span>
                    {{ profileProjects.firstThree }}
                  </span>
                  <div
                    v-if="profileProjects.remaining.length"
                    class="ml-8 cursor-pointer"
                  >
                    <span class="tracking-widest">...</span>
                    <q-tooltip>
                      <ul class="flex flex-col gap-4 p-4">
                        <li
                          v-for="(item, i) in profileProjects.remaining"
                          :key="i"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </q-tooltip>
                  </div>
                </div>
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

      <div
        class="header-wrapper flex items-center p-16 bg-neutral-10 dark:bg-d-neutral-10"
      >
        <div class="item-1 flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_menu_tasks"
            class="text-primary-pure mr-6"
            size="1.5rem"
          ></q-icon>
          <p class="text-title-4" v-if="user.id === profileActive.user">
            Minhas Tasks
          </p>
          <p class="text-title-4" v-else>Tasks</p>
        </div>

        <q-tabs v-model="tabs" class="flex gap-16 ml-24">
          <!--  class="flex gap-16 absolute left-0 right-0 mx-auto" -->
          <q-tab name="list">
            <OButton
              secondary
              icon="svguse:/icons.svg#icon_checklist"
              class="w-full text-neutral-70"
              size="md"
              >Lista
            </OButton>
          </q-tab>

          <q-tab name="calendar" class="ml-6">
            <OButton
              secondary
              icon="svguse:/icons.svg#icon_calendar"
              class="w-full text-neutral-70"
              size="md"
              >Calendário
            </OButton>
          </q-tab>
        </q-tabs>
        <q-space />

        <div class="item-2 flex gap-8">
          <OButton
            size="md"
            secondary
            @click="() => handleGetTasksPendentes(userActiveID)"
          >
            <q-icon size="1.5rem" name="replay"></q-icon>
          </OButton>

          <OButton size="md" primary @click="openTaskEditModal">
            <q-icon
              name="svguse:/icons.svg#icon_add_task"
              size="1.5rem"
              color="text-neutral-100"
            ></q-icon>
            Nova Task
          </OButton>

          <OButton disable size="md" secondary>
            <q-icon name="svguse:/icons.svg#icon_filtros"></q-icon>
            Filtrar
          </OButton>

          <OButton size="md" secondary v-if="user.id === profileActive.user">
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_tree_points"
            ></q-icon>

            <q-menu
              class="min-w-[190px]"
              :persistent="false"
              :auto-close="true"
              padding
            >
              <q-list>
                <q-item
                  clickable
                  @click="openModalChangeBGRef"
                  class="flex flex-nowrap items-center gap-8"
                >
                  <q-icon name="badge"></q-icon>
                  <p class="whitespace-nowrap">Alterar foto da capa</p>
                </q-item>
                <q-item
                  clickable
                  @click="openModalChangeAvatarRef"
                  class="flex flex-nowrap items-center gap-8"
                >
                  <q-icon name="account_box"></q-icon>
                  <p class="whitespace-nowrap">Alterar avatar</p>
                </q-item>
              </q-list>
            </q-menu>
          </OButton>
        </div>
      </div>

      <q-tab-panels v-model="tabs" animated class="bg-transparent">
        <div name="list">
          <!-- 🟡 TASK PENDENTES -->
          <section id="tasks" class="bg-neutral-10 dark:bg-d-neutral-10 mb-16">
            <div class="tasks-grid">
              <div class="flex w-full">
                <div class="flex items-center w-full">
                  <div class="mx-auto w-full">
                    <div class="grid grid-cols-1 gap-2 py-4">
                      <div class="">
                        <div class="base-grid px-16">
                          <p class="empty-col"></p>
                          <p class="text-headline-3">Task</p>
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
                                @click:task:delete="handleTaskDelete"
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
          <section
            id="tasks-finalizadas"
            class="bg-white dark:!bg-d-neutral-20"
          >
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

              <div v-if="tasks.concluidas.length">
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

        <div name="calendar">
          <div class="bg-white dark:!bg-d-neutral-30 mb-80">
            <BaseCalendar
              :events="events"
              ref="baseCalendar"
              :loadingProp="calendarLoader"
            />
          </div>
        </div>
      </q-tab-panels>
    </div>
  </q-scroll-area>

  <ModalAddPhoto
    title="Alterar foto da capa"
    ref="modalChangeBGRef"
    uploadFieldName="capa"
    :saveUploadedFile="saveProfileBackground"
    :loading="loadingPhoto"
  />

  <ModalAddPhoto
    title="Alterar avatar"
    ref="modalChangeAvatarRef"
    uploadFieldName="avatar"
    :saveUploadedFile="saveProfileAvatar"
    :loading="loadingPhoto"
  />
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
import ModalAddPhoto from 'src/components/Modal/ModalAddPhoto.vue'

import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useProfileStore } from 'src/stores/profile/profile.store'
import BaseCalendar from 'src/components/Calendar/BaseCalendar.vue'

// ==========================================================================================

const { URLS } = api.defaults

const route = useRoute()
const router = useRouter()

const user = inject('user')
const usuarios = inject('usuarios')
const userProfile = inject('userProfile')
const openTaskEditModal = inject('openTaskEditModal')
const taskActive = inject('taskActive')

const tabs = ref('list')
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
        const date = GLOBAL.FDateBRtoEU(value)
        return value ? GLOBAL.FData(date, 'DD/MM') : value
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

  return {
    firstThree: projects.slice(0, 3).join(' • '),
    remaining: projects.slice(3, projects.length),
  }
})

const profileTeam = computed(() => {
  return profileActive.value.equipe?.map((t) => ({
    foto: t.profile.foto || '',
    nome: t.get_full_name,
  }))
})

const profileBackground = computed(() =>
  profileActive.value.capa ? profileActive.value.capa : bg
)

// ==========================================================================================
// MUDANÇA DO PROFILE (HANDLE CHANDE FUNCTIONS) =============================================
const clearInputProfile = () => {
  if (profileActive.value) {
    // profileActive.value = {}
  }
}
async function handleChangeSelect({ profile, id }) {
  loading.value = true
  userActiveID.value = id
  tasks.value.pendentes = []
  tasks.value.concluidas = []
  isLoadingHoraConsumo.value = true

  await handleChangeProfile(profile.id)
  await handleGetTasksPendentes(id)
  await getTempoTask()
  await handleGetTasksConcluidas(id)

  accordionConcluidas.value.componentRef.hide()

  loading.value = false
}

async function handleChangeProfile(profileId) {
  const foto = profileActive.value.foto
  profileActive.value = { foto }
  await getProfile(profileId)
}

// ==========================================================================================
// TASKS PENDENTES (MINHAS TASKS) ===========================================================

const handleGetTasksPendentes = async (userId) => {
  router.push({ params: { id: userId } })
  LoadingBar.start()

  calendarLoader.value = true
  tasks.value.pendentes = await getTasks(
    `&responsavel_task__id=${userId}&page_size=100&status=abertas`,
    false
  )

  calendarLoader.value = false
  listIDSInOrder.value = tasks.value.pendentes.map((i) => i.id)

  LoadingBar.stop()
}

// ==========================================================================================
// TASKS FINALIZADAS ========================================================================

const accordionConcluidas = ref(null)

const handleGetTasksConcluidas = async (userId) => {
  tasks.value.concluidas = await getTasks(
    `&responsavel_task__id=${userId}&page_size=10&status=concluidas`,
    false
  )
}

// ==========================================================================================
// FINALIZAR, DELETAR E RESTAURAR TASK ===============================================================

async function handleTaskFinished(taskObj) {
  const today = Date.now()
  const dateFormated = date.formatDate(today, 'YYYY-MM-DD')
  try {
    await pathTask(taskObj.id, { data_conclusao: dateFormated })

    tasks.value.pendentes = tasks.value.pendentes.filter(
      (i) => i.id !== taskObj.id
    )
    tasks.value.concluidas.push(taskObj)
    taskActive.value = null
    NotifySucess('Task concluida com sucesso!')
  } catch (err) {
    console.log(err)
    NotifyError('Erro ao concluir a tarefa')
  }
}

async function handleTaskDelete(taskId) {
  try {
    api.delete(URLS.task + taskId)

    tasks.value.pendentes = tasks.value?.pendentes?.filter(
      (task) => task.id !== taskId
    )

    NotifySucess('Tarefa deletada com sucesso!')
  } catch (err) {
    console.log(err)
    NotifyError('Erro ao deletar a tarefa')
  }
}

async function handleTaskRestored(taskObj) {
  try {
    await pathTask(taskObj.id, { data_conclusao: null })

    tasks.value.concluidas = tasks.value.concluidas.filter(
      (i) => i.id !== taskObj.id
    )
    tasks.value.pendentes.push(taskObj)
    NotifySucess('Tarefa restaurada com sucesso!')
  } catch (err) {
    console.log(err)
    NotifyError('Erro ao restaurar a tarefa')
  }
}

// ==========================================================================================
// ALTERAR CAPA E FOTO DO USUARIO ===========================================================

const modalChangeBGRef = ref(null)
const modalChangeAvatarRef = ref(null)
const loadingPhoto = ref(false)

function openModalChangeBGRef() {
  modalChangeBGRef.value.modalAddPhoto.dialogRef.show()
}

function openModalChangeAvatarRef() {
  modalChangeAvatarRef.value.modalAddPhoto.dialogRef.show()
}

async function saveProfileBackground(formData) {
  const reqUrl = URLS.profile + `${profileActive.value.id}/`
  loadingPhoto.value = true

  try {
    await api.patch(reqUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    modalChangeBGRef.value.modalAddPhoto.dialogRef.hide()
    handleChangeProfile(profileActive.value.id)
    NotifySucess('Capa alterada com sucesso')
  } catch (err) {
    NotifyError('Erro ao salvar! Certifique-se que o arquivo é uma imagem')
  } finally {
    loadingPhoto.value = false
  }
}

async function saveProfileAvatar(formData) {
  const reqUrl = URLS.avatar
  loadingPhoto.value = true

  formData.append('user', profileActive.value.user)
  formData.append('primary', true)

  try {
    await api.post(reqUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    modalChangeAvatarRef.value.modalAddPhoto.dialogRef.hide()
    handleChangeProfile(profileActive.value.id)
    NotifySucess('Avatar alterado com sucesso')
  } catch (err) {
    NotifyError('Erro ao salvar! Certifique-se que o arquivo é uma imagem')
  } finally {
    loadingPhoto.value = false
  }
}

// ==========================================================================================
// OUTROS ===================================================================================

const handleClickTimer = (v) => (taskActive.value = v)

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

// Atualiza as tasks ao criar ou editar
emitter.on('modal:task:edit', async () => {
  handleGetTasksPendentes(userActiveID.value)
})

emitter.on('modal:task:create', () => {
  // Atualizar lista de task ao criar uma nova task no modal
  handleGetTasksPendentes(userActiveID.value)
})

// Redirecionar usuário caso não tenha o status de staff
if (!user.value.is_staff) router.push({ name: '404' })

// CALENDARIO ----------------------
const events = ref([])
const baseCalendar = ref(Element)
const calendarLoader = ref(true)

watch(
  () => tasks.value.pendentes,
  (v) => {
    if (!v.length) return
    const formato = 'YYYY-MM-DD[T]HH:mm:ss' /* '2023-02-09T12:30:00' */
    events.value = GLOBAL.formatToCalendar(v, formato)
    calendarLoader.value = false
  },
  { deep: true }
)
</script>

<style lang="sass" scoped>

.foto-capa
  height: clamp(330px,50vh,404px)
  position: relative
  &:after
    content:""
    position: absolute
    width:100%
    height:100%
    top: 0
    left: 0
    transition: background .3s ease
    background: transparent

  &.haveProjeto
    &::after
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 81.46%, #000000 100%)


#tasks
  border-radius: 6px 6px 0 0

.base-grid
  display: grid
  grid-template-columns: minmax(70px, 80px)  minmax(200px, 1fr) minmax(170px, 250px) repeat(3, minmax(120px, 130px)) 56px
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

.header-wrapper
  border-radius: 6px 6px 0 0

.q-tab
  color: transparent
  padding: 0

  &.q-tab--active .q-btn
    color: rgb(var(--primary-pure))
    border-color: rgb(var(--primary-pure))
    background: rgba(var(--primary-pure-10))


  :deep(.q-tab__content)
    padding: 0 !important

.body--dark
  .q-tab--active .q-btn
    background: rgba(var(--primary-pure), 0.1)
</style>
