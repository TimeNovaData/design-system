<template>
  <div class="fullcalendar">
    <FullCalendar
      :events="events"
      ref="fullCalendar"
      :options="calendarOptions"
    >
      <template v-slot:eventContent="arg">
        <div class="flex items-center gap-4 cursor-pointer">
          <OAvatar
            size="1.5rem"
            :foto="arg.event.extendedProps.usuario_criacao.profile.foto"
          />
          <div class="flex flex-col gap-4">
            <p class="text-paragraph-2">{{ arg.event.title }}</p>
            <p class="text-paragraph-3 text-opacity-70">
              {{ arg.event.extendedProps.projeto?.nome }}
            </p>
          </div>
        </div>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup>
/*  {
    id: 166,
    chamado: null,
    tag: [],
    projeto: {
      id: 1,
      nome: '#dicasolar#',
      nome_completo: 'Adriano O cliente - #dicasolar#',
      cor: '#0D0FD2',
      tem_subprojetos: false,
    },
    sub_projeto: null,
    tipo_task: null,
    ordem: 1,
    ordem_caso: 2,
    titulo: 'teste 123',
    observacoes: null,
    tempo_estimado: '00:00:00',
    link: null,
    entrega_data_desejada: null,
    data_inicial_previsto: null,
    data_conclusao: '2021-08-27',
    responsavel_task: {
      id: 2,
      username: 'emanuel2',
      get_full_name: 'emanuel morais',
      profile: {
        id: 7,
        foto: 'http://localhost:8000/media/avatars/emanuel2/resized/500/arara-azul.jpg',
      },
    },
    data_criacao: '2021-08-19T13:49:19.304865-03:00',
    is_playing: false,
    ultima_contagem: null,
    data_atualizacao: '2021-08-27T08:30:22.486585-03:00',
    quantidade: 1,
    usuario_criacao: {
      id: 2,
      username: 'emanuel2',
      get_full_name: 'emanuel morais',
      profile: {
        id: 7,
        foto: 'http://localhost:8000/media/avatars/emanuel2/resized/500/arara-azul.jpg',
      },
    },
    usuario_atualizacao: 2,
    status: 'Concluído',
    tempo_total: '00:00:00',
    data_final_previsto: null,
    tempo_ao_vivo_formatado_hora_minuto_segundo: '1:00:17',
  } */

import FullCalendar from '@fullcalendar/vue3'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import { ref, onMounted, watch, inject } from 'vue'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import OAvatar from 'src/components/Avatar/OAvatar.vue'

const props = defineProps({
  events: Array,
})
const openTaskViewModal = inject('openTaskViewModal')
function handleClick(arg) {
  console.log(arg)
  openTaskViewModal(arg.event.id)
  window._red(arg.event.start)
  window._blue(arg.event.end)
}
const fullCalendar = ref(Element)
let calendarAPI

onMounted(() => {
  calendarAPI = fullCalendar.value.getApi()

  console.log(calendarAPI)
})

watch(
  () => props.events,
  (v) => {
    calendarAPI.addEventSource(v)
    window._blue('addEventSource')
    console.log(v)
  },
  { deep: true }
)

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  locales: [ptLocale],
  headerToolbar: {
    left: 'today prev,next',
    center: 'title',
    right: 'dayGridMonth timeGridWeek timeGridDay',
  },
  dayMaxEvents: false,
  // eventMaxStack:null,
  weekends: true,
  height: 590,

  eventClick: handleClick,
})

const events = ref([
  // {
  //   title: 'event1',
  //   start: '2023-02-01',
  // },
  // {
  //   title: 'event2',
  //   start: '2023-02-05',
  //   end: '2023-02-07',
  // },
  // {
  //   title: 'event3',
  //   start: '2023-02-09T12:30:00',
  //   allDay: false, // will make the time show
  // },
])
</script>

<style lang="sass">
.fullcalendar
  .fc-theme-standard
    --fc-event-border-color: rgba(var(--neutral-100), 0.1)

  .fc-header-toolbar
    button
      background: transparent !important
      color: currentcolor !important
      border-color: rgba(var(--neutral-100),0.1) !important
      height: 32px !important
      padding: 0 1rem !important

      box-shadow: initial !important
      &:hover
        background: rgba(var(--neutral-10),1) !important

      &:active
        background: rgba(var(--neutral-20),1) !important

      &.fc-button-active
        background: rgba(var(--neutral-30),1) !important
        border-color: rgba(var(--neutral-100),0.3) !important

      &.fc-next-button,
      &.fc-prev-button
        width: 32px !important
        display: grid
        place-items: center
        padding: 0 !important

        >span
          margin: auto
          display: block
          &.before

  .fc-toolbar-title:first-letter
    text-transform: capitalize

  // .fc-daygrid-block-event
  //   border: 1px solid rgba(var(--neutral-100), 0.1)

.body--dark
  .fc-theme-standard
    --fc-border-color: rgba(var(--white),0.1)
    --fc-page-bg-color:rgba(var(--d-neutral-30),1)

    .fc-header-toolbar
    button
      border-color: rgba(var(--white),0.1) !important
      box-shadow: initial !important
      &:hover
        background: rgba(var(--white),0.1) !important

      &:active
        background: rgba(var(--white),0.2) !important

      &.fc-button-active
        background: rgba(var(--white),0.1) !important
        border-color: rgba(var(--white),0.3) !important

      &.fc-next-button,
      &.fc-prev-button
        width: 32px !important

        padding: 0 !important

        >span
          margin: auto
          display: block
          // &.before
</style>
