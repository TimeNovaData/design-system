<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import './css/cores.sass'
import './css/quasar/@index.sass'
import './css/body.sass'
import './css/pages/DesignSystem.sass'
import './css/tailwind.css'

export default defineComponent({
  name: 'App'
})
</script>

<style>
/* *::selection {
  background: rgba(var(--primary-pure), 0.1);
} */
</style>
