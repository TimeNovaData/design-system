<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>
    <BaseHeader></BaseHeader>
    <q-page-container
      class="home-page-container bg-neutral-10"
      style="padding-top: var(--top-size)"
    >
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
  // const oi2 = await api.get('cliente/')
  // const oi = await api.get('usuario/')
  // console.log(oi, oi2)
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
  height: calc(100vh - var(--top-size))

  .body--dark &
    background: rgb(var(--d-neutral-10))
</style>

<style lang="sass" scoped>
.base-header
 background: rgba(var(--white), 0.04) !important
</style>
