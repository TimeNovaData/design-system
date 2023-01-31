<template>
  <h1>calendl</h1>

  <CalendarView
    :displayPeriodUom="displayPeriod"
    :startingDayOfWeek="1"
    :periodChangedCallback="handleChangeDate"
    currentPeriodLabel="icons"
    :itens="itens"
    :show-date="showDate"
  >
    <template #header="{ headerProps }">
      <CalendarViewHeader
        slotScope="{ headerProps }"
        :header-props="headerProps"
        currentPeriodLabel="icons"
        @input="setShowDate"
      >
        <template>
          header customizado
          <pre>{{ headerProps }}</pre>
        </template>
      </CalendarViewHeader>
    </template>
  </CalendarView>
</template>

<script setup>
import { ref } from 'vue'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import 'vue-simple-calendar/dist/style.css'

const showDate = ref(new Date())
const displayPeriod = ref('week') // week, month, year
const header = ref(null)

function handleChangeDate(ev) {
  // const { periodStart, periodEnd, displayFirstDate, displayLastDate } = ev.value

  window._blue('Data alterada')
  // console.log(periodStart, periodEnd, displayFirstDate, displayLastDate)
}

function setShowDate(ev) {
  // const { periodStart, periodEnd, displayFirstDate, displayLastDate } = ev.value

  window._yellow('Alteração no header')
  console.log('setShowDate', ev)
  // console.log(periodStart, periodEnd, displayFirstDate, displayLastDate)
}

const itens = [
  {
    id: 1,
    startDate: '2023-01-31',
    title: 'Item 1',
    tooltip: 'Item 1 tooltip',
    classes: ['blue-item'],
  },
  {
    id: 2,
    startDate: '2023-02-01',
    endDate: '2023-02-03',
    title: 'Item 2',
    tooltip: 'Item 2 tooltip',
    classes: ['red-item'],
  },
]
</script>

<style lang="sass" scoped>
// isHovered
</style>
