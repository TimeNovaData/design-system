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
import { useDarkMode } from '../stores/darkMode'
import { storeToRefs } from 'pinia'

const dark = useDarkMode()
const { darkMode } = storeToRefs(dark)
</script>

<style lang="sass" scoped></style>
