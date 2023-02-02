<template>
  <q-scroll-area>
    <div class="container relative">
      <q-card
        class="p-16 mt-48 dark:border-white/10 dark:border overflow-hidden"
      >
        <div class="flex justify-between">
          <TextIcon
            class="text-title-4"
            text="Agenda"
            icon="svguse:/icons.svg#icon_calendar"
          />

          <OButton secondary size="md" icon="svguse:/icons.svg#icon_filtros"
            >Filtros
            <q-menu
              ref="menu"
              class="p-12"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-form ref="form">
                <q-list class="w-[23.5rem]">
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
                </q-list>
              </q-form>
            </q-menu>
          </OButton>
        </div>

        <!-- <BaseCalendar2 /> -->
        <div>
          <div
            class="flex items-end w-full flex-nowrap mt-32 mb-16 justify-center relative"
          >
            <p
              class="capitalize text-title-3 mr-24 text-neutral-70 dark:text-white/80"
            >
              {{ formattedMonth }}
            </p>

            <NavigationBar
              @today="onToday"
              @prev="onPrev"
              @next="onNext"
              class="absolute right-0"
            />
          </div>

          <div class="row justify-center">
            <div style="display: flex; width: 100%">
              <QCalendar
                mode="month"
                ref="calendar"
                locale="pt-BR"
                class="rounded-generic overflow-hidden calendario"
                v-model="selectedDate"
                animated
                bordered
                focusable
                hoverable
                no-active-date
                :day-min-height="80"
                :day-height="0"
                @change="onChange"
                @moved="onMoved"
                @click-date="onClickDate"
                @click-day="onClickDay"
                @click-workweek="onClickWorkweek"
                @click-head-workweek="onClickHeadWorkweek"
                @click-head-day="onClickHeadDay"
              >
                <template #week="{ scope: { week, weekdays } }">
                  <template
                    v-for="(computedEvent, index) in getWeekEvents(
                      week,
                      weekdays
                    )"
                    :key="index"
                  >
                    <div
                      :class="badgeClasses(computedEvent)"
                      :style="badgeStyles(computedEvent, week.length)"
                      @click="openTaskViewModal(computedEvent.event.id)"
                    >
                      <div
                        v-if="
                          computedEvent.event && computedEvent.event.details
                        "
                        class="title q-calendar__ellipsis"
                      >
                        {{
                          `${computedEvent.event.title} ${
                            computedEvent.event.time
                              ? ' - ' + computedEvent.event.time
                              : ''
                          }`
                        }}
                        <q-tooltip>{{ computedEvent.event.details }}</q-tooltip>
                      </div>
                    </div>
                  </template>
                </template>
              </QCalendar>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed, reactive, onMounted, nextTick, inject } from 'vue'

import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import {
  QCalendar,
  today,
  padNumber,
  isBetweenDates,
  parsed,
  parseDate,
  daysBetween,
  isOverlappingDates,
  indexOf,
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import NavigationBar from 'src/components/Calendar/NavigationBar.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'
// import BaseCalendar2 from 'src/components/Calendar/BaseCalendar2.vue'

const menu = ref(null)
const form = ref(null)
const user = inject('user')
const openTaskViewModal = inject('openTaskViewModal')
const CURRENT_DAY = new Date()

const { tasks } = storeToRefs(useTaskStore())
const { getTasks } = useTaskStore()

onMounted(async () => {
  console.log('inicio', events.value)
  await getTasks(
    `&responsavel_task__id=${user.value.id}&page_size=100&status=abertas`
  )
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
  console.log(
    tasks.value.filter(
      (i) => i.data_inicial_previsto && i.entrega_data_desejada
    ),
    'filtradas'
  )
  const final = tasks.value
    .filter((i) => i.data_inicial_previsto && i.entrega_data_desejada)
    .map((i, index) => ({
      id: i.id,
      title: i.titulo,
      details: i.titulo,
      start: date.formatDate(i.data_inicial_previsto, 'YYYY-MM-DD'),
      end: date.formatDate(i.entrega_data_desejada, 'YYYY-MM-DD'),
      bgcolor: 'orange',
      icon: 'fas fa-birthday-cake',
    }))

  console.log('diff', final, events.value)

  events.value = final
  // calendar.value.updateCurrent()
})

const events = ref([
  {
    id: 1,
    title: '1st of the Month',
    details: 'Everything is funny as long as it is happening to someone else',
    start: getCurrentDay(1), // data_inicial_previsto
    end: getCurrentDay(1), // entrega_data_desejada
    bgcolor: 'orange',
  },
  {
    id: 2,
    title: 'Sisters Birthday',
    details: 'Buy a nice present',
    start: getCurrentDay(4),
    end: getCurrentDay(4),
    bgcolor: 'green',
    icon: 'fas fa-birthday-cake',
  },
  {
    id: 3,
    title: 'Meeting',
    details: 'Time to pitch my idea to the company',
    start: getCurrentDay(10),
    end: getCurrentDay(10),
    time: '10:00',
    duration: 120,
    bgcolor: 'red',
    icon: 'fas fa-handshake',
  },
  {
    id: 4,
    title: 'Lunch',
    details: 'Company is paying!',
    start: getCurrentDay(10),
    end: getCurrentDay(10),
    time: '11:30',
    duration: 90,
    bgcolor: 'teal',
    icon: 'fas fa-hamburger',
  },
  {
    id: 5,
    title: 'Visit mom',
    details: 'Always a nice chat with mom',
    start: getCurrentDay(20),
    end: getCurrentDay(20),
    time: '17:00',
    duration: 90,
    bgcolor: 'grey',
    icon: 'fas fa-car',
  },
  {
    id: 6,
    title: 'Conference',
    details: 'Teaching Javascript 101',
    start: getCurrentDay(22),
    end: getCurrentDay(22),
    time: '08:00',
    duration: 540,
    bgcolor: 'blue',
    icon: 'fas fa-chalkboard-teacher',
  },
  {
    id: 7,
    title: 'Girlfriend',
    details: 'Meet GF for dinner at Swanky Restaurant',
    start: getCurrentDay(22),
    end: getCurrentDay(22),
    time: '19:00',
    duration: 180,
    bgcolor: 'teal',
    icon: 'fas fa-utensils',
  },
  {
    id: 8,
    title: 'Rowing',
    details: 'Stay in shape!',
    start: getCurrentDay(27),
    end: getCurrentDay(28),
    bgcolor: 'purple',
    icon: 'rowing',
  },
  {
    id: 9,
    title: 'Fishing',
    details: 'Time for some weekend R&R',
    start: getCurrentDay(22),
    end: getCurrentDay(29),
    bgcolor: 'purple',
    icon: 'fas fa-fish',
  },
  {
    id: 10,
    title: 'Vacation',
    details:
      "Trails and hikes, going camping! Don't forget to bring bear spray!",
    start: getCurrentDay(22),
    end: getCurrentDay(29),
    bgcolor: 'purple',
    icon: 'fas fa-plane',
  },
])

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)

  return tm.date
}

const selectedDate = ref(today())

function insertEvent(
  events,
  weekLength,
  infoWeek,
  index,
  availableDays,
  level
) {
  const iEvent = infoWeek[index]
  if (iEvent !== undefined && iEvent.left >= availableDays) {
    // If you have space available, more events are placed
    if (iEvent.left - availableDays) {
      // It is filled with empty events
      events.push({ size: iEvent.left - availableDays })
    }
    // The event is built
    events.push({ size: iEvent.size, event: iEvent.event })

    if (level !== 0) {
      // If it goes into recursion, then the item is deleted
      infoWeek.splice(index, 1)
    }

    const currentAvailableDays = iEvent.left + iEvent.size

    if (currentAvailableDays < weekLength) {
      const indexNextEvent = indexOf(
        infoWeek,
        (e) => e.id !== iEvent.id && e.left >= currentAvailableDays
      )

      insertEvent(
        events,
        weekLength,
        infoWeek,
        indexNextEvent !== -1 ? indexNextEvent : index,
        currentAvailableDays,
        level + 1
      )
    } // else: There are no more days available, end of iteration
  } else {
    events.push({ size: weekLength - availableDays })
    // end of iteration
  }
}

function getWeekEvents(week, weekdays) {
  const firstDay = parsed(week[0].date + ' 00:00')
  const lastDay = parsed(week[week.length - 1].date + ' 23:59')
  const eventsWeek = []
  events.value.forEach((event, id) => {
    const startDate = parsed(event.start + ' 00:00')
    const endDate = parsed(event.end + ' 23:59')
    if (isOverlappingDates(startDate, endDate, firstDay, lastDay)) {
      const left = daysBetween(firstDay, startDate, true)
      const right = daysBetween(endDate, lastDay, true)
      eventsWeek.push({
        id, // index event
        left, // Position initial day [0-6]
        right, // Number days available
        size: week.length - (left + right), // Size current event (in days)
        event, // Info
      })
    }
  })
  const eventos = []
  if (eventsWeek.length > 0) {
    const infoWeek = eventsWeek.sort((a, b) => a.left - b.left)
    infoWeek.forEach((_, i) => {
      insertEvent(eventos, week.length, infoWeek, i, 0, 0)
    })
  }
  return eventsWeek
}

function badgeClasses(computedEvent) {
  if (computedEvent.event !== undefined) {
    return {
      'my-event': true,
      'text-white': true,
      [`bg-${computedEvent.event.bgcolor}`]: true,
      'rounded-border': true,
      'q-calendar__ellipsis': true,
    }
  }
  return {
    'my-void-event': true,
  }
}

function badgeStyles(computedEvent, weekLength) {
  const s = {}
  if (computedEvent.size !== undefined) {
    s.width = (100 / weekLength) * computedEvent.size + '%'
  }
  return s
}

function isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
  return (
    (dateEnd < weekEnd && dateEnd >= weekStart) ||
    dateEnd === weekEnd ||
    (dateEnd > weekEnd && dateStart <= weekEnd)
  )
}

const calendar = ref(null)
const formattedMonth = computed(() => {
  const date = new Date(selectedDate.value)
  return monthFormatter().format(date) + ' ' + date.getFullYear()
})

function monthFormatter() {
  try {
    return new Intl.DateTimeFormat('pt', {
      month: 'long',
      timeZone: 'UTC',
    })
  } catch (e) {
    //
  }
}

function onToday() {
  calendar.value.moveToToday()
}
function onPrev() {
  calendar.value.prev()
}
function onNext() {
  calendar.value.next()
}
function onMoved(data) {
  console.log('onMoved', data)
}
function onChange(data) {
  console.log('onChange', data)
}
function onClickDate(data) {
  console.log('onClickDate', data)
}
function onClickDay(data) {
  console.log('onClickDay', data)
}
function onClickWorkweek(data) {
  console.log('onClickWorkweek', data)
}
function onClickHeadDay(data) {
  console.log('onClickHeadDay', data)
}
function onClickHeadWorkweek(data) {
  console.log('onClickHeadWorkweek', data)
}
</script>

<style lang="sass" scoped>

.calendario
  --calendar-border-dark: 1px solid rgba(var(--white),0.15 )
  --calendar-border-current-dark:1px solid rgb(var(--primary-pure))
  --calendar-current-color-dark: rgb(var(--primary-pure))

  --calendar-border-current:1px solid rgb(var(--primary-pure))
  --calendar-current-color: rgb(var(--primary-pure))

  :deep(.q-current-day)
    color: var(--calendar-current-color)

  // --calendar-border-current-dark: #fff
</style>
