<template>
  <div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions"></FullCalendar>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ref } from 'vue'
import ptLocale from '@fullcalendar/core/locales/pt-br'

const fullCalendar = ref(Element)

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: false, // initial value
  locales: [ptLocale],
})
</script>

<style lang="scss" scoped></style>
