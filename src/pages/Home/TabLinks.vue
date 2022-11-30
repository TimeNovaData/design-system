<template>
  <div class="grid grid-cols-3 mt-16 gap-16 sm:grid-cols-1">
    <TabLinkVue title="Cardápio" name="svguse:/icons.svg#icon-Notes" />
    <TabLinkVue title="Pedidos" name="svguse:/icons.svg#icon-Notes" />
    <TabLinkVue title="Financeiros" name="svguse:/icons.svg#icon-Notes" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabLinkVue from './TabLink.vue'
</script>

<style lang="sass"></style>
