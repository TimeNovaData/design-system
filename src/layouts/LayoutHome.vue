<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <KeepAlive>
      <component :is="MenuMultiLevel" :menu="menuList" />
    </KeepAlive>

    <BaseHeader></BaseHeader>
    <q-page-container class="home-page-container bg-neutral-10">
      <router-view />
      <!--  MOVI PARA LAYOUTTEST /testes  -->
    </q-page-container>
    <ButtonFloat></ButtonFloat>
  </q-layout>

  <TaskViewModal />
  <TaskCreateModal />
</template>

<script setup>
import ButtonFloat from 'src/components/Button/ButtonFloat.vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from 'src/utils/menuList.js'
import TaskViewModal from 'src/components/Task/TaskView/TaskViewModal.vue'
import TaskCreateModal from 'src/components/Task/TaskCreate/TaskCreateModal.vue'
import { useModalStore } from 'src/stores/modal/modal.store'
import { provide } from 'vue'

const { openTaskViewModal, openTaskEditModal } = useModalStore()

provide('openTaskViewModal', openTaskViewModal)
provide('openTaskEditModal', openTaskEditModal)
</script>

<style lang="sass">

.home-page-container
  --header-bg: white
  --top-size: var(--header-base-height)
  margin-left: var(--Nv0-sidebar-width)
  // margin-top: var(--top-size)
  height:100vh

  .body--dark &
    background: rgb(var(--d-neutral-10))
</style>

<style lang="sass" scoped>
.base-header
 background: rgba(var(--white), 0.04) !important
</style>
