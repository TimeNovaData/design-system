<template>
  <!-- <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transitionName || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <RouterView></RouterView>
</template>

<script>
import { defineComponent, toRefs, ref, provide, watch, onMounted } from 'vue'
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
import useDarkMode from 'src/composables/useDarkMode'
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
import { useUsuarioStore } from 'src/stores/usuarios/usuarios.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'

const { user, userFoto } = storeToRefs(useUserStore())
const { usuariosFoto } = storeToRefs(useUsuarioStore())
const { projetos } = storeToRefs(useProjetoStore())

const { getUser } = useUserStore()
const { getUsuariosFoto } = useUsuarioStore()
const { getProjetos } = useProjetoStore()
const { darkMode } = useDarkMode()

const { user: userStore } = storeToRefs(useAuthStore())

if (userStore.value.access) {
  watch(
    () => userStore.value.access,
    () => {
      getUser()
      getUsuariosFoto()
      getProjetos()
    }
  )
}

onMounted(() => {
  userStore.value.access && getUser()
})

console.log(projetos, getProjetos)

provide('user', user)
provide('userFoto', userFoto)
provide('usuarios', usuariosFoto)
provide('projetos', projetos)
provide('darkMode', darkMode)
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
