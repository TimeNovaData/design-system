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

          <OButton
            secondary
            size="md"
            icon="svguse:/icons.svg#icon_filtros"
            disable
            >Filtros
            <q-menu
              ref="menu"
              class="p-12"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-form ref="form">
                <q-list class="w-[376px]">
                  <q-item
                    class="px-0 text-headline-3 text-neutral-60 dark:text-white/60 justify-between flex items-center w-full"
                    dense
                  >
                    Filtros
                    <q-icon
                      size="1.25rem"
                      name="svguse:/icons.svg#icon_filtros"
                    ></q-icon>
                  </q-item>
                </q-list>
              </q-form>
            </q-menu>
          </OButton>
        </div>

        <div class="mt-24">
          <BaseCalendar :events="events" ref="baseCalendar" />
        </div>
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, inject } from 'vue'

import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'

import { useTaskStore } from 'src/stores/tasks/tasks.store'
import BaseCalendar from 'src/components/Calendar/BaseCalendar.vue'
import emitter from 'src/boot/emitter'
import GLOBAL from 'src/utils/GLOBAL'

const menu = ref(null)
const form = ref(null)

const { getTasks } = useTaskStore()

const tasks = ref([])
const events = ref([])
const baseCalendar = ref(Element)

onMounted(async () => {
  const formato = 'YYYY-MM-DD[T]HH:mm:ss' /* '2023-02-09T12:30:00' */
  await handleGetTasks()
  await nextTick()
  events.value = GLOBAL.formatToCalendar(tasks.value, formato)
})

const handleGetTasks = async () => {
  baseCalendar.value.setLoading(true)
  tasks.value = await getTasks(`&page_size=1000&status=abertas`, false)
  baseCalendar.value.setLoading(false)
}

emitter.on('modal:task:create', async () => {
  await handleGetTasks()
})
emitter.on('modal:task:edit', async () => {
  await handleGetTasks()
})
</script>

<style lang="sass" scoped></style>
