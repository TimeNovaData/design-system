<template>
  <q-layout view="hHh lpR fFf" style="height: 100vh">
    <q-header
      ref="header"
      class="bg-d-neutral-30 border-b border-white dark:bg-d-neutral-10 header-top"
    >
      <q-toolbar>
        <q-btn
          class="text-neutral-10"
          dense
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon
            size="28px"
            name="svguse:icons.svg#icon_menu"
          ></q-icon>
        </q-btn>

        <q-toolbar-title>
          <div class="relative w-[220px] h-48 flex items-center">
            <MenuLogo class="w-[151px] h-max my-auto"></MenuLogo>
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
                <q-item-section
                  avatar
                  class="flex items-center flex-row"
                >
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
        <q-list class="mt-24 flex flex-col">
          <q-item
            dense
            class="text-neutral-100/50 dark:text-white/80 text-caps-3 !py-4 !min-h-24 flex items-end order-1"
          >
            Components
          </q-item>
          <q-item
            v-for="(item, index) in list"
            :key="item.id"
            clickable
            v-ripple
            @click="sectionActive = item.id"
            :style="{ order: index }"
          >
            <q-item-section
              class="text-neutral-70 dark:text-white/80"
              >{{ item.name }}</q-item-section
            >
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!--  -->

    <q-page-container class="overflow-x-hidden">
      <q-scroll-area style="height: calc(100vh - 51px)">
        <div class="p-24 flex gap-16 overflow-hidden w-full">
          <transition name="list" tag="section">
            <section-tipographie
              v-if="sectionActive == 'typographie'"
            />
            <section-button v-else-if="sectionActive == 'button'" />
            <section-radio v-else-if="sectionActive == 'checkbox'" />
            <section-chips v-else-if="sectionActive == 'chips'" />
            <section-intro v-else-if="sectionActive == 'intro'" />
            <section-breadcrumb
              v-else-if="sectionActive == 'breadcrumb'"
            />
            <section-input v-else-if="sectionActive == 'inputs'" />
            <section-selects v-else-if="sectionActive == 'selects'" />
            <section-tabs v-else-if="sectionActive == 'tabs'" />
            <section-table v-else-if="sectionActive == 'table'" />
            <section-popup-proxy
              v-else-if="sectionActive == 'popupProxy'"
            />
            <section-accordion
              v-else-if="sectionActive == 'accordion'"
            />
            <section-paginacao
              v-else-if="sectionActive == 'paginacao'"
            />
            <section-modal v-else-if="sectionActive == 'modal'" />
          </transition>
        </div>
      </q-scroll-area>
    </q-page-container>
    <q-page-sticky :offset="[32, 32]" class="z-[9999999]">
      <o-button
        primary
        fab
        icon="sym_r_close"
        @click=";(sectionActive = 'intro') && drawer.show()"
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
import SectionTable from './SectionTable.vue'
import SectionPopupProxy from './SectionPopUpProxy.vue'
import SectionAccordion from './SectionAccordion.vue'
import SectionPaginacao from './SectionPaginacao.vue'
import SectionModal from './SectionModal.vue'

import { useDarkMode } from '../../stores/darkMode'

import { storeToRefs } from 'pinia'
import MenuMultiLevel from '../../components/MenuMultiLevel/MenuMultiLevel.vue'
import MenuLogo from 'src/components/MenuMultiLevel/MenuLogo.vue'
import SectionSelects from './SectionSelects.vue'
import SectionTabs from './SectionTabs.vue'
import menuList from 'src/utils/menuList'
import logoAnimation from 'src/utils/animation/logo'
const sectionActive = ref('intro')
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
  const animation = logoAnimation('.header-top')
  animation.logoAnimationToNDT.play().progress(1)
})

const list = [
  {
    name: '@ Inicio',
    id: 'intro',
  },
  {
    name: 'Button',
    id: 'button',
  },
  {
    name: 'Typographies',
    id: 'typographie',
  },
  {
    name: 'Checkbox & RadioButton',
    id: 'checkbox',
  },
  {
    name: 'Badge, Status, Tags',
    id: 'chips',
  },
  {
    name: 'Menu Multi Level',
    id: 'menuMultiLevel',
  },
  {
    name: 'Breadcrumb',
    id: 'breadcrumb',
  },
  {
    name: 'Inputs',
    id: 'inputs',
  },
  {
    name: 'Selects',
    id: 'selects',
  },
  {
    name: 'Tabs',
    id: 'tabs',
  },
  {
    name: 'Table',
    id: 'table',
  },
  {
    name: 'Popup Proxy',
    id: 'popupProxy',
  },
  {
    name: 'Accordion',
    id: 'accordion',
  },
  {
    name: 'Paginaçao',
    id: 'paginacao',
  },
  {
    name: 'Modal',
    id: 'modal',
  },
].sort((a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
})
</script>

<style lang="sass">

.showHeader
  .header-top
    z-index: 9999999999999999999
</style>
