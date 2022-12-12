<template>
  <router-view />
  <!-- 
 <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transitionName || 'tra'">
      <component :is="Component" />
    </transition>
  </router-view>

   -->
</template>

<script>
import { defineComponent, onMounted, ref, provide } from 'vue'
// import emitter from 'src/boot/emitter'

import 'src/css/cores.sass'
import 'src/css/quasar/@index.sass'
import 'src/css/body.sass'
import 'src/css/pages/DesignSystem.sass'
import 'src/css/tailwind.css'
import 'src/css/stores/blurMode.sass'
import 'src/css/vendor/materialSymbolsRounded.sass'
import { Notify } from 'quasar'

Notify.registerType('error', {
  icon: 'warning',
  progress: true,
  classes: 'notify-error',
  timeout: 2000,
})

export default defineComponent({
  name: 'App',
})
</script>

<style>
/* *::selection {
  background: rgba(var(--primary-pure), 0.1);
} */
</style>
