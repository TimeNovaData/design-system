<template>
  <q-layout view="hHh lpR fFf" style="height: 100vh">
    <q-header
      ref="header"
      class="bg-d-neutral-30 border-b dark:border-d-neutral-40 border-white dark:bg-d-neutral-10"
    >
      <q-toolbar>
        <q-btn
          class="text-neutral-10"
          dense
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon size="28px" name="svguse:icons.svg#icon_menu"></q-icon>
        </q-btn>

        <q-toolbar-title>
          <div class="relative w-[220px] h-48">
            <q-icon
              name="svguse:icons.svg#logo"
              class="absolute left-0 w-[151px] h-[auto] top-[-54px]"
            ></q-icon>
          </div>
        </q-toolbar-title>

        <o-button class="text-neutral-10" round secondary size="md">
          <q-icon name="svguse:icons.svg#icon_config"></q-icon>

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

              <q-separator></q-separator>

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
            </q-list>
          </q-menu>
        </o-button>
      </q-toolbar>
    </q-header>

    <menu-multi-level
      v-if="sectionActive == 'menuMultiLevel'"
      :menu="menuList"
    />

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="dark:!bg-d-neutral-10 !fixed"
      ref="drawer"
    >
      <q-scroll-area class="fit">
        <q-list separator v-for="item in list" :key="item.id">
          <q-item clickable v-ripple @click="sectionActive = item.id">
            <q-item-section class="text-neutral-70 dark:text-white/80">{{
              item.name
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!--  -->

    <q-page-container class="overflow-x-hidden">
      <q-scroll-area style="height: calc(100vh - 51px)">
        <div class="p-24 flex gap-16 overflow-hidden w-full">
          <!-- <TransitionGroup name="list" tag="div" class="w-full"> -->
          <section-tipographie v-if="sectionActive == 'typographie'" />
          <section-button v-else-if="sectionActive == 'button'" />
          <section-radio v-else-if="sectionActive == 'checkbox'" />
          <section-chips v-else-if="sectionActive == 'chips'" />
          <section-intro v-else-if="sectionActive == 'intro'" />
          <section-breadcrumb v-else-if="sectionActive == 'breadcrumb'" />
          <section-input v-else-if="sectionActive == 'inputs'" />
          <section-selects v-else-if="sectionActive == 'selects'" />

          <!-- </TransitionGroup> -->
        </div>
      </q-scroll-area>
    </q-page-container>
    <q-page-sticky position="top-right" :offset="[18, 18]" class="z-[9999999]">
      <o-button
        fab
        icon="sym_r_close"
        secondary
        @click="(sectionActive = 'intro') && drawer.show()"
        v-if="sectionActive == 'menuMultiLevel'"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

import oButton from '../../components/OButton.vue'

import SectionButton from './SectionButton.vue'
import SectionTipographie from './SectionTipographie.vue'
import SectionRadio from './SectionRadio.vue'
import SectionChips from './SectionChips.vue'
import SectionIntro from './SectionIntro.vue'
import SectionBreadcrumb from './SectionBreadcrumb.vue'
import SectionInput from './SectionInput.vue'
import { useDarkMode } from '../../stores/darkMode'
import { storeToRefs } from 'pinia'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel2.vue'
import SectionSelects from './SectionSelects.vue'

const sectionActive = ref('menuMultiLevel')
const leftDrawerOpen = ref(true)
// const drawerLeft = ref(0)

const dark = useDarkMode()
const { darkMode } = storeToRefs(dark)
const header = ref(null)
const drawer = ref(null)

watch(sectionActive, (val) => {
  if (val === 'menuMultiLevel') drawer.value.hide()
})
onMounted(() => {
  if (sectionActive.value === 'menuMultiLevel') drawer.value.hide()
})
const menuList = [
  {
    name: 'Colors & Avatars',
    icon: 'icon_config',
    class: 'activeEffect',
    nivel: 0,
    submenu: [
      {
        title: 'Calendário de Produção',
        nivel: 1
      },
      {
        title: 'Produtos',
        nivel: 1,
        submenu: [
          {
            title: 'Produtos',
            nivel: 2
          },
          {
            title: 'Sub Produtos',
            nivel: 2
          },
          {
            title: 'Insumo',
            nivel: 2
          }
        ]
      },
      {
        title: 'Previsão de Consumo',
        nivel: 1,
        submenu: [
          {
            title: 'Previsão de Consumo',
            nivel: 2
          }
        ]
      },
      {
        title: 'NF de entrada',
        // link: 'https://www.google.com',
        nivel: 1,
        submenu: [
          {
            title: 'NF de entrada',
            // link: 'https://www.google.com',
            nivel: 2
          }
        ]
      }
    ]
  }
]

const list = [
  {
    name: '@ Inicio',
    id: 'intro'
  },
  {
    name: 'Button',
    id: 'button'
  },
  {
    name: 'Typographies',
    id: 'typographie'
  },
  {
    name: 'Checkbox & RadioButton',
    id: 'checkbox'
  },
  {
    name: 'Badge, Status, Tags',
    id: 'chips'
  },
  {
    name: 'Menu Multi Level',
    id: 'menuMultiLevel'
  },
  {
    name: 'Breadcrumb',
    id: 'breadcrumb'
  },
  {
    name: 'Inputs',
    id: 'inputs'
  },
  {
    name: 'Selects',
    id: 'selects'
  },
  {
    name: 'Tabs',
    id: 'tabs'
  }
].sort((a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
})
</script>

<style lang="sass"></style>
