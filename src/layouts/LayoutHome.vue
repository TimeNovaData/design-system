<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <KeepAlive>
      <component :is="MenuMultiLevel" :menu="menuList" />
    </KeepAlive>
    <BaseHeader></BaseHeader>
    <q-page-container class="home-page-container bg-neutral-10">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from 'src/utils/menuList.js'
import { api } from 'src/boot/axios'

onMounted(async () => {
  const oi = api
  console.log(api)
})
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
