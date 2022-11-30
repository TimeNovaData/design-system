<template>
  <q-layout view="hHh Lpr fFf" class="layout-home">
    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>
    <BaseHeader></BaseHeader>
    <StoreHeader @tree-points-click="openModalRight"></StoreHeader>

    <q-page-container
      class="home-page-container"
      style="padding-top: var(--top-size)"
    >
      <div class="main-container">
        <TabLink></TabLink>
        <TheAcompanhamento class="mt-16"></TheAcompanhamento>
        <TheDesempenho class="mt-16"></TheDesempenho>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import StoreHeader from 'src/pages/Home/StoreHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from 'src/utils/menuList.js'
import TabLink from 'src/pages/Home/TabLinks.vue'
import TheAcompanhamento from 'src/pages/Home/TheAcompanhamento.vue'
import TheDesempenho from 'src/pages/Home/TheDesempenho.vue'
</script>

<style lang="sass">

body
  --top-size: calc(var(--header-kanban-height) + var(--header-base-height))

.home-page-container
  margin-left: var(--Nv0-sidebar-width)
  height: calc(100vh - var(--top-size))
</style>
