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
          <QCalendar
            class="mt-32"
            locale="pt-BR"
            mode="month"
            :day-min-height="70"
            animated
            bordered
            :task-width="240"
            :min-weekday-length="2"
          >
            <!--  -->

            <template #title-task="{ scope }">
              <div class="summary ellipsis">
                <div class="title ellipsis">{{ scope.title.label }}</div>
              </div>
            </template>

            <!--  -->

            <template
              #head-tasks="{
                /* scope */
              }"
            >
              <div class="header ellipsis" style="font-weight: 600">
                <div class="issue ellipsis">Issue</div>
                <div class="key">Key</div>
                <div class="logged">Logged</div>
              </div>
            </template>

            <!--  -->
          </QCalendar>
        </div>
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed, reactive, onBeforeMount } from 'vue'

import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import {
  QCalendar,
  today,
  padNumber,
  isBetweenDates,
  parsed,
} from '@quasar/quasar-ui-qcalendar/src/index.js'
// import BaseCalendar2 from 'src/components/Calendar/BaseCalendar2.vue'

const menu = ref(null)
const form = ref(null)

const selectedCalendar = ref('day'),
  selectedView = ref('day'),
  calendar = ref(null),
  selectedDate = ref(today()),
  resources = reactive([
    { id: '1', name: 'John' },
    {
      id: '2',
      name: 'Board Room',
      expanded: false,
      children: [
        { id: '2.1', name: 'Room-1' },
        {
          id: '2.2',
          name: 'Room-2',
          expanded: false,
          children: [
            { id: '2.2.1', name: 'Partition-A' },
            { id: '2.2.2', name: 'Partition-B' },
            { id: '2.2.3', name: 'Partition-C' },
          ],
        },
      ],
    },
    { id: '3', name: 'Mary' },
    { id: '4', name: 'Susan' },
    { id: '5', name: 'Olivia' },
  ]),
  startDate = ref(today()),
  endDate = ref(today()),
  tasks = reactive([
    {
      icon: 'done',
      title: 'Task 1',
      key: 'TSK-584',
      logged: [
        { date: '2021-03-02', logged: 0.5 },
        { date: '2021-03-05', logged: 2.0 },
      ],
    },
    {
      icon: 'pending',
      title: 'Task 2',
      key: 'TSK-592',
      logged: [
        { date: '2021-03-06', logged: 3.5 },
        { date: '2021-03-08', logged: 4.0 },
      ],
    },
    {
      icon: 'pending',
      title: 'Task 3',
      key: 'TSK-593',
      logged: [
        { date: '2021-03-10', logged: 4.5 },
        { date: '2021-03-11', logged: 2.4 },
      ],
    },
    {
      icon: 'done',
      title: 'Task 4',
      key: 'TSK-594',
      logged: [
        { date: '2021-03-14', logged: 6.5 },
        { date: '2021-03-15', logged: 2.0 },
      ],
    },
    {
      icon: 'pending',
      title: 'Task 5',
      key: 'TSK-595',
      logged: [
        { date: '2021-03-12', logged: 1.5 },
        { date: '2021-03-18', logged: 2.0 },
      ],
    },
    {
      icon: 'blocking',
      title: 'Task 6',
      key: 'TSK-596',
      logged: [
        { date: '2021-03-13', logged: 1.5 },
        { date: '2021-03-23', logged: 3.5 },
      ],
    },
    {
      icon: 'pending',
      title: 'Task 7',
      key: 'TSK-597',
      logged: [
        { date: '2021-03-19', logged: 0.75 },
        { date: '2021-03-26', logged: 2.25 },
      ],
    },
    {
      icon: 'done',
      title: 'Task 8',
      key: 'TSK-598',
      logged: [
        { date: '2021-03-21', logged: 1.5 },
        { date: '2021-03-22', logged: 4.0 },
      ],
    },
    {
      icon: 'pending',
      title: 'Task 9',
      key: 'TSK-599',
      logged: [
        { date: '2021-03-26', logged: 6.5 },
        { date: '2021-03-27', logged: 3.5 },
      ],
    },
    {
      icon: 'blocking',
      title: 'Task 10',
      key: 'TSK-600',
      logged: [
        { date: '2021-03-12', logged: 0.5 },
        { date: '2021-03-14', logged: 2.0 },
        { date: '2021-03-28', logged: 4.5 },
        { date: '2021-03-30', logged: 1.0 },
      ],
    },
  ]),
  titleTasks = reactive([{ label: 'TITLE' }, { label: 'SUBTITLE' }]),
  footerTasks = reactive([{ title: 'TOTALS' }]),
  agenda = {
    // value represents day of the week
    1: [
      {
        time: '08:00',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        desc: 'Meeting with CEO',
      },
      {
        time: '08:30',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
        desc: 'Meeting with HR',
      },
      {
        time: '10:00',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
        desc: 'Meeting with Karen',
      },
    ],
    2: [
      {
        time: '11:30',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
        desc: 'Meeting with Alisha',
      },
      {
        time: '17:00',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
        desc: 'Meeting with Sarah',
      },
    ],
    3: [
      {
        time: '08:00',
        desc: 'Stand-up SCRUM',
        avatar: 'https://cdn.quasar.dev/img/material.png',
      },
      {
        time: '09:00',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      },
      {
        time: '10:00',
        desc: 'Sprint planning',
        avatar: 'https://cdn.quasar.dev/img/material.png',
      },
      {
        time: '13:00',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
      },
    ],
    4: [
      {
        time: '09:00',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
      },
      {
        time: '10:00',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      },
      {
        time: '13:00',
        avatar: 'https://cdn.quasar.dev/img/material.png',
      },
    ],
    5: [
      {
        time: '08:00',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      },
      {
        time: '09:00',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      },
      {
        time: '09:30',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      },
      {
        time: '10:00',
        avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
      },
      {
        time: '11:30',
        avatar: 'https://cdn.quasar.dev/img/material.png',
      },
      {
        time: '13:00',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
      },
      {
        time: '13:30',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
      },
      {
        time: '14:00',
        avatar: 'https://cdn.quasar.dev/img/linux-avatar.png',
      },
      {
        time: '14:30',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
      },
      {
        time: '15:00',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      },
      {
        time: '15:30',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      },
      {
        time: '16:00',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
      },
    ],
  }
</script>

<style lang="sass" scoped></style>
