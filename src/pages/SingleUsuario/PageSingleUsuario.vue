<template>
  <q-scroll-area>
    <header class="h-[404px]">
      <div class="h-full">
        <img class="h-full object-cover w-full object-right" :src="bg" alt="" />
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
                      <p class="text-headline-3 pl-16">Urgência</p>
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
                    <div class="overflow-hidden relative mt-6" v-else>
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
          @before-show="() => handleGetTasksConcluidas(userActiveID)"
          class="border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden"
        >
          <template v-slot:header>
            <div class="flex items-center flex-1">
              <q-item-section avatar class="w-32">
                <q-icon
                  name="svguse:/icons.svg#icon_concluido"
                  size="sm"
                  class="text-primary-pure mr-6"
                />
              </q-item-section>
              <q-item-section>Tasks Finalizadas</q-item-section>
            </div>
          </template>

          <div v-if="finishedTasks?.length">
            <q-virtual-scroll
              style="max-height: 450px"
              :items="finishedTasks"
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

          <div v-else class="flex flex-col gap-4 mt-10">
            <q-skeleton
              :key="n"
              v-for="n in GLOBAL.getRandomInt(3, 6)"
              v-once
              type="rect"
              class="h-[3.25rem]"
            />
          </div>
        </OAccordion>
      </section>

      <section class="my-160">
        <div>CONSUMO DE HORAS</div>
      </section>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, inject, onMounted, computed, unref, nextTick, watch } from 'vue'
import { date, LoadingBar } from 'quasar'
import bg from 'src/assets/image/bg-single-usuario.png'
import GLOBAL from 'src/utils/GLOBAL'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import avatar from 'src/assets/image/gravatar.jpg'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OButton from 'src/components/Button/OButton.vue'
import TaskColaborador from 'src/components/TaskColaborador/TaskColaborador.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useProfileStore } from 'src/stores/profile/profile.store'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import emitter from 'src/boot/emitter'
import KanbanItemEditableSelect from 'src/components/Kanban/KanbanItemEditableSelect.vue'

import { useRoute, useRouter } from 'vue-router'
import { NotifyError, NotifySucess } from 'src/boot/Notify'

const route = useRoute()
const router = useRouter()

const user = inject('user')
const usuarios = inject('usuarios')
const userProfile = inject('userProfile')
const openTaskEditModal = inject('openTaskEditModal')
const taskActive = inject('taskActive')

const loading = ref(true)
const userActiveID = ref(null)

const { getTasks, pathTask } = useTaskStore()
const { tasksColaborador: tasks } = storeToRefs(useTaskStore())

const { getProfile } = useProfileStore()
const { profileActive, isLoading } = storeToRefs(useProfileStore())

async function handleChangeSelect({ profile, id }) {
  loading.value = true
  userActiveID.value = id

  await handleChangeProfile(profile.id)
  await handleGetTasksPendentes(id)
  // await handleGetTasksConcluidas(id)

  tasks.value.concluidas = []
  accordionConcluidas.value.componentRef.hide()

  loading.value = false
}

async function handleChangeProfile(profileId) {
  profileActive.value = {}
  await getProfile(profileId)
}

const accordionConcluidas = ref(null)

const finishedTasks = computed(() => {
  const arr = tasks.value.concluidas
  const reversed = [...arr].reverse()
  return reversed
})

const handleGetTasksConcluidas = async (userId) => {
  tasks.value.concluidas = []

  tasks.value.concluidas = await getTasks(
    `&responsavel_task__id=${userId}&page_size=30&status=concluidas`,
    false
  )
}

const handleGetTasksPendentes = async (userId) => {
  router.push({ params: { id: userId } })
  LoadingBar.start()
  // tasks.value.pendentes = []

  tasks.value.pendentes = await getTasks(
    `&responsavel_task__id=${userId}&page_size=100&status=abertas`,
    false
  )

  LoadingBar.stop()
}

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

emitter.on('modal:task:create', () => {
  // atualizar a lista
  console.log('CRIOU')
  handleGetTasksPendentes(userActiveID.value)
})

// const tasksTodo = computed(() =>
//   tasks.value.filter((t) => t.status !== 'Concluído')
// )

// const tasksfinished = computed(() =>
//   tasks.value.filter((t) => t.status === 'Concluído')
// )

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
  loading.value = false
}

let iniciou
watch(
  [userProfile, usuarios],
  (/* [newX, newY] */) => {
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

// if (userProfile.value.id && usuarios.value.length) {
//   init()
//   window._big('oi')
// }

function handleClickTimer(v) {
  // tasks
  taskActive.value = v
}

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

onMounted(async () => {})
if (!user.value.is_staff) router.push({ name: '404' })
</script>

<style lang="sass" scoped>
#tasks
  border-radius: 6px 6px 0 0

.base-grid
  display: grid
  grid-template-columns: minmax(55px, 65px)  minmax(200px, 1fr) minmax(170px, 230px) minmax(120px, 130px)  repeat(2, 100px) minmax(120px, 130px)
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
