<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <BaseHeader></BaseHeader>
    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>
    <!-- 



     -->
  </q-layout>
</template>

<script setup>
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import menuList from 'src/utils/menuList'
</script>

<style lang="scss" scoped></style>
