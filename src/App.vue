<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
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
