<template>
  <q-menu class="overflow-x-hidden">
    <q-list padding class="select-none min-w-[200px]">
      <q-item dense class="items-center">
        <p class="text-headline-3">Settings</p>
      </q-item>

      <q-item tag="label">
        <q-item-section avatar class="flex items-center flex-row">
          <q-toggle v-model="darkMode"></q-toggle>
          <p class="text-paragraph-2">Dark Mode</p>
        </q-item-section>
      </q-item>
      <q-item tag="label">
        <q-item-section avatar class="flex items-center flex-row">
          <q-toggle v-model="blurMode"></q-toggle>
          <p class="text-paragraph-2">Blur Mode</p>
        </q-item-section>
      </q-item>
      <q-item tag="label">
        <q-item-section avatar class="flex items-center flex-row">
          <p class="text-paragraph-2">Kanban Background</p>
      
        </q-item-section>
        <q-menu padding class="p-24">
          <OInput type="text" size="lg" v-model="kanbanBG" label="Cole o link do bg"></OInput>
        </q-menu>
      </q-item>


      <!-- <q-separator></q-separator>

        <q-item dense>
          <q-item-section>
            <p class="text-headline-3">Links</p>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          href="https://quasar.dev/"
          target="_blank"
          class="flex-row items-center"
        >
          <p class="text-paragraph-2">Quasar Docs</p>
        </q-item>
         -->
    </q-list>
  </q-menu>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDarkMode } from '../stores/darkMode'
import { useKanbanBG } from '../stores/kanbanBG'
import { useBlurMode } from '../stores/blurMode'

import OInput from './OInput.vue';


const dark = useDarkMode()
const bg = useKanbanBG()
const blur = useBlurMode()

const { darkMode } = storeToRefs(dark)
const { kanbanBG } = storeToRefs(bg)
const { blurMode } = storeToRefs(blur)


</script>

<style lang="sass" scoped></style>
