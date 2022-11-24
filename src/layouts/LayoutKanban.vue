<template>
  <q-layout view="hHh Lpr fFf" class="layout-kanban">
    <BaseHeader></BaseHeader>
    <KanbanHeader></KanbanHeader>

    <q-page-container
      class="kanban-page-container"
      style="padding-top: var(--top-size)"
    >
      <router-view />
    </q-page-container>

    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import BaseHeader from '../components/BaseHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from '../utils/menuList.js'
import KanbanHeader from 'src/components/KanbanHeader.vue'
</script>

<style lang="sass" >
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
