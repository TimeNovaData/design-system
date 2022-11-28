<template>
  <q-layout view="hHh Lpr fFf" class="layout-kanban">
    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>
    <BaseHeader></BaseHeader>
    <KanbanHeader></KanbanHeader>

    <q-page-container
      class="kanban-page-container"
      style="padding-top: var(--top-size)"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import KanbanHeader from 'src/components/Kanban/KanbanHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from 'src/utils/menuList.js'
</script>

<style lang="sass">

body
  --header-bg: rgba(0,0,0, .5)
  --breadcrumb-color: rgba(var(--white),0.7)

.q-layout.layout-kanban
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 15.56%)
  .body--dark &
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))

.kanban-page-container
  --top-size: calc(var(--header-kanban-height) + var(--header-base-height))
  margin-left: var(--Nv0-sidebar-width)
  height: calc(100vh - var(--top-size))
  
</style>
