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
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref } from 'vue'

import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'
import BaseCalendar2 from 'src/components/Calendar/BaseCalendar2.vue'

const menu = ref(null)
const form = ref(null)
</script>

<style lang="sass" scoped></style>
