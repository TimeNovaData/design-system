<template>
  <!-- <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transitionName || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <RouterView></RouterView>
</template>

<script>
import { defineComponent, toRefs, ref, provide, watch } from 'vue'
// import emitter from 'src/boot/emitter'

import 'src/css/cores.sass'
import 'src/css/quasar/@index.sass'
import 'src/css/body.sass'
import 'src/css/pages/DesignSystem.sass'
import 'src/css/tailwind.css'
import 'src/css/stores/blurMode.sass'
import 'src/css/vendor/materialSymbolsRounded.sass'
import 'src/css/vendor/apexCharts.sass'
import { Notify } from 'quasar'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth.store'

Notify.registerType('error', {
  icon: 'warning',
  progress: true,
  classes: 'notify-error',
  timeout: 2000,
})

export default defineComponent({ name: 'App' })
</script>

<script setup>
import { useUserStore } from 'src/stores/usuarios/user.store'
const { user, userFoto } = storeToRefs(useUserStore())
const { getUser } = useUserStore()

const { user: userStore } = storeToRefs(useAuthStore())

watch(userStore.value.access, () => {
  getUser()
})

provide('user', user)
provide('userFoto', userFoto)
</script>

<style lang="sass">


.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0



/* width */
::-webkit-scrollbar
  width: 8px

/* Track */
::-webkit-scrollbar-track
  background: rgba(var(--neutral-10),1)

/* Handle */
::-webkit-scrollbar-thumb
  background: rgba(var(--neutral-100),0.2)
  border-radius: 8px

// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover
//   background: #555
</style>
