<template>
  <router-view v-slot="{ Component }">
    <!-- <transition :name="$route.meta.transitionName || 'fade'"> -->
    <!-- </transition> -->

    <component
      v-if="($route.name === 'login' && !user?.id) || user?.id"
      :is="Component"
    />
  </router-view>
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
import { useRoute } from 'vue-router'

const { user, userFoto, userProfile } = storeToRefs(useUserStore())
const { usuarios } = storeToRefs(useUsuarioStore())
const { projetos, subProjetos, projetosLoading } = storeToRefs(
  useProjetoStore()
)
const { clientes } = storeToRefs(useClientesStore())
const { taskTypes, taskActive } = storeToRefs(useTaskStore())

const { getUser, getProfile, setProfile } = useUserStore()
const { getUsuarios } = useUsuarioStore()
const { getProjetos, getSubProjetos } = useProjetoStore()
const { getClientes } = useClientesStore()
const { getTaskTypes, postTempoTask } = useTaskStore()
const { darkMode } = useDarkMode()

const { user: userAuthStore } = storeToRefs(useAuthStore())

async function requests() {
  await getUser()
  await nextTick()
  await getProfile()
  await getUsuarios()

  await getProjetos()

  await getClientes()
  await getSubProjetos()
  await getTaskTypes()
}

if (!window.location.href.includes('login')) requests()

watch(
  () => userAuthStore.value.access,
  (acess) => acess && requests(),
  { deep: true }
)

watch(
  () => taskActive.value,
  (v) => {
    postTempoTask(``, v)
  }
)

provide('darkMode', darkMode)
provide('userProfile', userProfile)
provide('user', user)
provide('userFoto', readonly(userFoto))
provide('usuarios', readonly(usuarios))
provide('clientes', readonly(clientes))
provide('projetos', readonly(projetos))
provide('subProjetos', readonly(subProjetos))
provide('taskTypes', readonly(taskTypes))
provide('taskActive', taskActive)

provide('set', {
  setProfile,
})

provide('get', {
  getUsuarios,
  getProjetos,
  getClientes,
})

provide('post', {
  postTempoTask,
})

provide('loading', {
  projetosLoading,
})
</script>

<style lang="sass">


.fade-enter-active,
.fade-leave-active
  transition: opacity .3s ease

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


.body--dark

  /* Track */
  ::-webkit-scrollbar-track
    background: rgba(var(--white),0.1)

  /* Handle */
  ::-webkit-scrollbar-thumb
    background: rgba(var(--white),0.2)
    border-radius: 8px


// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover
//   background: #555
</style>
