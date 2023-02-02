<template>
  <router-view v-slot="{ Component }">
    <!-- <transition :name="$route.meta.transitionName || 'fade'"> -->
    <!-- </transition> -->

    <component
      v-if="($route.name === 'login' && !user?.id) || user?.id"
      :is="Component"
    />

    <ModalAddAnexo
      ref="modalAddAnexoRef"
      :url="URLS.anexo"
      keyProp="task"
      :id="openTask"
    />

    <ModalReference ref="modalReferenceRef" />
    <ModalTaskType ref="modalTaskTypeRef" />
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

import { api } from 'src/boot/axios'
import emitter from 'src/boot/emitter'
import GLOBAL from 'src/utils/GLOBAL'

import ModalAddAnexo from './components/Modal/ModalAddAnexo.vue'
import ModalReference from './components/Modal/ModalReference.vue'
import ModalTaskType from './components/Modal/ModalTaskType.vue'

const { URLS } = api.defaults

const { user, userFoto, userProfile } = storeToRefs(useUserStore())
const { usuarios } = storeToRefs(useUsuarioStore())
const { projetos, subProjetos, projetosLoading } = storeToRefs(
  useProjetoStore()
)
const { clientes } = storeToRefs(useClientesStore())
const { taskTypes, taskActive, openTask, tasksColaborador } = storeToRefs(
  useTaskStore()
)

const { getUser, getProfile, setProfile } = useUserStore()
const { getUsuarios } = useUsuarioStore()
const { getProjetos, getSubProjetos } = useProjetoStore()
const { getClientes } = useClientesStore()
const { getTaskTypes, postTempoTask, getTempoTask } = useTaskStore()
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
  (acess) => {
    acess && requests()
    if (!acess) {
      // limpando estado ~temporario
      taskActive.value = {}
      tasksColaborador.value = {
        concluidas: [],
        pendentes: [],
      }
    }
  },
  { deep: true }
)

// depois remover do app ~temporario ---------------------------------------
const tempoTaskActiveID = ref(null)

watch(
  () => taskActive.value,
  async (v) => {
    if (v?.id) {
      const { id } = await postTempoTask(``, v)
      tempoTaskActiveID.value = id
      intervalTempoTask()
    } else {
      tempoTaskActiveID.value = null
      emitter.emit('title:timer:update', '') // Removendo o timer do titulo
    }
  }
)

let timeout
let timerCache

async function intervalTempoTask() {
  clearTimeout(timeout)
  if (!tempoTaskActiveID.value) return

  const taskReturn = await getTempoTask(tempoTaskActiveID.value)

  const timer = GLOBAL.FTime(taskReturn.tempo_total)

  if (timer !== timerCache) {
    const formatedTimer = GLOBAL.FTime(taskReturn.tempo_total) // Atualiza timer do titulo

    emitter.emit('title:timer:update', `${formatedTimer} - `)
  }

  timerCache = timer
  window._red(taskReturn.tempo_total, 'tempo retornado')

  tasksColaborador.value.pendentes = tasksColaborador.value.pendentes.map(
    (t) => {
      if (taskReturn.id === t.id) {
        t = taskReturn
      }

      return t
    }
  )

  if (taskActive.value) {
    taskActive.value.tempo_total = taskReturn.tempo_total
  }

  timeout = setTimeout(() => intervalTempoTask(), 10000)
}

//  ---------------------------------------
const modalAddAnexoRef = ref(null)

emitter.on('modal:anexo:abrir', () =>
  modalAddAnexoRef.value?.modalAddAnexo.dialogRef.show()
)
//  ---------------------------------------
const modalReferenceRef = ref(null)

emitter.on('modal:reference:open', () =>
  modalReferenceRef.value?.modalReference.dialogRef.show()
)
//  ---------------------------------------
const modalTaskTypeRef = ref(null)

emitter.on('modal:tasktype:open', () =>
  modalTaskTypeRef.value?.modalReference.dialogRef.show()
)
//  ---------------------------------------

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
