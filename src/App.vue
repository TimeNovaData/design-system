<template>
  <!-- <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transitionName || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <RouterView></RouterView>
</template>

<script setup>
// css
import 'src/css/cores.sass'
import 'src/css/quasar/@index.sass'
import 'src/css/body.sass'
import 'src/css/pages/DesignSystem.sass'
import 'src/css/tailwind.css'
import 'src/css/stores/blurMode.sass'
import 'src/css/vendor/materialSymbolsRounded.sass'
import 'src/css/vendor/apexCharts.sass'
// script
import { provide, watch, onMounted, ref, readonly, nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from 'src/stores/auth.store'
import { useUserStore } from 'src/stores/usuarios/user.store'
import { useUsuarioStore } from 'src/stores/usuarios/usuarios.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import useDarkMode from 'src/composables/useDarkMode'
import { useClientesStore } from './stores/clientes/clientes.store'
import { useTaskStore } from './stores/tasks/tasks.store'

const { user, userFoto, userProfile } = storeToRefs(useUserStore())
const { usuariosFoto } = storeToRefs(useUsuarioStore())
const { projetos, subProjetos } = storeToRefs(useProjetoStore())
const { clientes } = storeToRefs(useClientesStore())
const { taskTypes } = storeToRefs(useTaskStore())

const { getUser, getProfile, setProfile } = useUserStore()
const { getUsuariosFoto } = useUsuarioStore()
const { getProjetos, getSubProjetos } = useProjetoStore()
const { getClientes } = useClientesStore()
const { getTaskTypes } = useTaskStore()
const { darkMode } = useDarkMode()

const { user: userAuthStore } = storeToRefs(useAuthStore())

async function requests() {
  await getUser()
  await nextTick()
  console.log(user)
  await getProfile()
  await getUsuariosFoto()
  await getProjetos()
  await getClientes()
  await getSubProjetos()
  await getTaskTypes()
}

if (userAuthStore.value.access) requests()

watch(
  () => userAuthStore.value.access,
  (acess) => acess && requests(),
  { deep: true }
)

provide('darkMode', darkMode)
provide('userProfile', userProfile)
provide('user', user)
provide('userFoto', readonly(userFoto))
provide('usuarios', readonly(usuariosFoto))
provide('clientes', readonly(clientes))
provide('projetos', readonly(projetos))
provide('subProjetos', readonly(subProjetos))
provide('taskTypes', readonly(taskTypes))

provide('set', {
  setProfile,
})

provide('get', {
  getUsuariosFoto,
  getProjetos,
  getClientes,
})
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
