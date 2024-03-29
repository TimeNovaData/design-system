<template>
  <div
    class="relative task-group"
    :class="{ 'show-restore': completed }"
    @click="handleView($event, task.id)"
  >
    <li
      class="task-item list-none cursor-pointer bg-white border border-neutral-100/10 rounded-[3px] dark:border-white/5 dark:!bg-d-neutral-20 overflow-hidden mb-2 pr-12 hover:!bg-neutral-10 transition-colors"
      :class="{
        'border-l-0 , border-r-0 , rounded-none': hideDragIcon,
      }"
    >
      <div class="base-grid">
        <div class="icons-wrapper flex justify-between items-center">
          <div
            id="drag-id"
            class="move_task cursor-grab w-[50px] h-56 grid place-content-center"
          >
            <q-icon
              :class="{ 'opacity-0 , cursor-auto': hideDragIcon }"
              name="svguse:/icons.svg#icon_drag"
              size="22px"
            ></q-icon>
          </div>

          <div
            class="concluir_task group"
            @click="() => (!completed ? showFinishTaskModal() : '')"
          >
            <q-icon
              class="[--cor-bg:#F5F5F5] dark:[--cor-bg:#242424] group-hover:!text-primary-pure transition"
              name="svguse:/icons.svg#icon_check_circle"
              size="22px"
            ></q-icon>
          </div>
        </div>

        <div class="pl-16">
          <p class="text-paragraph-2 one-line">
            {{ task.titulo }}
          </p>
          <p class="text-paragraph-3 text-neutral-70 dark:text-white/70">
            Projeto: {{ task?.projeto?.nome }}
          </p>
        </div>

        <div class="pl-16 relative">
          <div class="flex items-center">
            <div class="relative w-40 h-40 mr-8">
              <AvatarSingle
                class="!w-40 !h-40"
                :index="0"
                side="left"
                :href="
                  task?.usuario_criacao.profile.foto
                    ? task?.usuario_criacao.profile.foto
                    : placeholderImg
                "
              />
            </div>
            <div>
              <p class="text-paragraph-2">
                {{ task?.usuario_criacao.get_full_name }}
              </p>
              <p class="text-paragraph-3 text-neutral-70 dark:text-white/70">
                <!-- Criado por: {{ task?.usuario_criacao?.get_full_name }} -->
              </p>
            </div>
          </div>
        </div>

        <div class="pl-16">
          <div class="flex items-center">
            <q-icon
              name="svguse:/icons.svg#icon_calendar_heart"
              size="24px"
              class="mr-8"
            >
            </q-icon>
            <div>
              <p class="text-paragraph-2">
                {{ dataDesejada }}
              </p>
              <p class="text-paragraph-3 text-neutral-70 dark:text-white/70">
                {{ dataDesejadaDia }}
              </p>
            </div>
          </div>
        </div>

        <div class="pl-16">
          <div class="flex items-center">
            <q-icon
              name="svguse:/icons.svg#icon_date_time"
              size="24px"
              class="mr-8 text-neutral-100/40 dark:text-white/40"
            >
            </q-icon>
            <div>
              <p
                class="text-paragraph-2"
                :class="{ '!text-alert-error': expectedDateLongerThanDesired }"
              >
                {{ dataPrevista }}
              </p>
              <p
                class="text-paragraph-3 text-neutral-70 dark:text-white/70"
                :class="{
                  '!text-alert-error/80': expectedDateLongerThanDesired,
                }"
              >
                {{ dataPrevistadaDia }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="timer-wrapper pl-16"
          :class="{ 'pointer-events-none': completed }"
        >
          <TimerTask @click:timer="handleClickTimer" :task="task" />
        </div>

        <div class="ml-12">
          <OButton
            size="md"
            secondary
            class="dark:!bg-d-neutral-30"
            icon="more_horiz"
            @click.stop
            :class="{ 'dark:!bg-white/20 !bg-neutral-30': showing }"
          >
            <q-menu
              ref="menu"
              padding
              class="min-w-[250px]"
              v-model="showing"
              :persistent="false"
              :auto-close="true"
            >
              <q-list>
                <q-item
                  class="items-center gap-8 text-alert-error"
                  clickable
                  @click="() => (!completed ? showDeleteTaskModal() : '')"
                >
                  <q-icon
                    size="1rem"
                    name="svguse:/icons.svg#icon_trash"
                  ></q-icon>
                  <p>Excluir task</p>
                </q-item>
              </q-list>
            </q-menu>
          </OButton>
        </div>

        <div v-if="completed">
          <OButton
            size="md"
            secondary
            class="btn-restore dark:!bg-d-neutral-30"
            @click="showRestoreTaskModal"
          >
            <q-icon
              name="svguse:/icons.svg#icon_back"
              size="24px"
              color="text-neutral-100"
            ></q-icon>
            Restaurar Task
          </OButton>
        </div>
      </div>
    </li>

    <!-- <div class="restore-wrapper" v-if="completed">
      <div
        class="btn-wrapper flex items-center rounded-[3px] border border-neutral-100/10 absolute right-16 top-2 bottom-2"
      >
        <OButton size="md" class="relative blurzin h-full">
          <q-icon
            name="svguse:/icons.svg#icon_back"
            size="24px"
            color="text-neutral-100 "
          ></q-icon>
          Restaurar Task
        </OButton>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useQuasar } from 'quasar'
import UrgenciaStatus from 'src/components/Urgencia/UrgenciaStatus.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import TimerTask from 'src/components/TimerTask/TimerTask.vue'
import GLOBAL from 'src/utils/GLOBAL'
import placeholderImg from 'src/assets/image/gravatar.jpg'
import OButton from 'src/components/Button/OButton.vue'
import ModalConfirm from 'src/components/Modal/ModalConfirm.vue'

const $q = useQuasar()
const menu = ref(Element)
const showing = ref(false)
const openTaskViewModal = inject('openTaskViewModal')

const props = defineProps({
  task: Object,
  hideDragIcon: Boolean,
  completed: Boolean,
})

const emit = defineEmits([
  'click:timer',
  'click:task:finished',
  'click:task:delete',
  'click:task:restored',
])

const dataDesejada = computed(() => {
  return GLOBAL.FData(props.task.entrega_data_desejada, 'DD/MM')
})

const dataDesejadaDia = computed(() => {
  return GLOBAL.FData(props.task.entrega_data_desejada, 'dddd')
})

const dataPrevista = computed(() => {
  return GLOBAL.FData(props.task.data_final_previsto, 'DD/MM')
})

const dataPrevistadaDia = computed(() => {
  return GLOBAL.FData(props.task.data_final_previsto, 'dddd')
})

const expectedDateLongerThanDesired = computed(() => {
  const prevista = new Date(props.task.data_final_previsto)
  const desejada = new Date(props.task.entrega_data_desejada)

  if (!prevista || !desejada) return false
  else return prevista > desejada
})

const handleView = (event, id) => {
  const timerWrapper = event.target.closest('.timer-wrapper')
  const iconsWrapper = event.target.closest('.icons-wrapper')

  if (timerWrapper || iconsWrapper) return
  openTaskViewModal(+id)
}

function showFinishTaskModal() {
  $q.dialog({
    component: ModalConfirm,
    componentProps: {
      title: 'Confirmar',
      text: 'Deseja marcar essa task como finalizada?',
      persistent: true,
    },
  }).onOk(() => {
    emit('click:task:finished', props.task)
  })
}

const text = computed(
  () =>
    `Deseja deletar a task <bold class='font-semibold'>${props.task.titulo}</bold> ?`
)

function showDeleteTaskModal() {
  $q.dialog({
    component: ModalConfirm,
    componentProps: {
      title: 'Confirmar',
      text: text.value,
      persistent: true,
    },
  }).onOk(() => {
    emit('click:task:delete', props.task.id)
  })
}

function showRestoreTaskModal(ev) {
  ev.stopPropagation()

  $q.dialog({
    component: ModalConfirm,
    componentProps: {
      title: 'Confirmar',
      text: 'Deseja restaurar essa task?',
      persistent: true,
    },
  }).onOk(() => {
    emit('click:task:restored', props.task)
  })
}

function handleClickTimer(v) {
  emit('click:timer', v)
}
</script>

<style lang="sass" scoped>

.base-grid
  display: grid
  grid-template-columns: minmax(70px, 75px)  minmax(200px, 1fr) minmax(170px, 250px) repeat(2, minmax(120px, 130px)) 8.5rem 3.5rem
  align-items: center

.btn-restore
  height: 100%
  position: absolute
  right: 0
  top: 0
  z-index: 10
  background: rgb(var(--neutral-30))
  opacity: 0
  transition: opacity 150ms
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)

.task-group.show-restore:hover .btn-restore
  opacity: 1

// .task-group.show-restore:hover .task-item
//   opacity: 0.3

// .task-group.show-restore .btn-wrapper
//   opacity: 0
// .task-group:hover .btn-wrapper
//   opacity: 1

// .btn-wrapper
//   position: absolute
//   opacity: 0
//   right: 16px
//   top: 2px
//   bottom: 2px
//   max-width: max-content
//   border-radius: 3px
//   cursor: pointer

  // &::after
  //   content: ''
  //   position: absolute
  //   inset: 0
  //   width: 100%
  //   height: 100%
  //   backdrop-filter: blur(10px)
// .blurzin
//   backdrop-filter: blur(4px)
//   background: rgba(1, 7, 27, 0.05)

.concluir_task
  position: relative
  &::after
    content: ""
    display: block
    width: 18px
    height: 18px
    border-radius: 50%
    background: rgba(var(--primary-pure),0.2)
    transform: scale(1)
    position: absolute
    inset: 0
    margin: auto
    opacity: 0
    transition: .3s ease


  // &:hover::after
  //   transform: scale(2.1)
  //   opacity: 1
</style>
