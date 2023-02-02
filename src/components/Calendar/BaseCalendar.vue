<template>
  <div>
    <FullCalendar
      :events="events"
      ref="fullCalendar"
      :options="calendarOptions"
    >
      <template v-slot:eventContent="arg">
        <div
          @click="handleClick(arg)"
          class="flex items-center gap-4 cursor-pointer"
        >
          <OAvatar size="1.5rem" :foto="arg.event.extendedProps.foto" />
          {{ arg.event.title }}
        </div>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ref, onMounted, watch, inject } from 'vue'
import ptLocale from '@fullcalendar/core/locales/pt-br'
import OAvatar from 'src/components/Avatar/OAvatar.vue'

const props = defineProps({
  events: Array,
})
const openTaskViewModal = inject('openTaskViewModal')
function handleClick(arg) {
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
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: false, // initial value
  locales: [ptLocale],
})

const events = ref([
  {
    title: 'event1',
    start: '2023-02-01',
  },
  {
    title: 'event2',
    start: '2023-02-05',
    end: '2023-02-07',
  },
  {
    title: 'event3',
    start: '2023-02-09T12:30:00',
    allDay: false, // will make the time show
  },
])
</script>

<style lang="scss" scoped></style>
