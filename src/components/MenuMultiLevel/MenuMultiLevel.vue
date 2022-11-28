<template>
  <aside class="OSidebar" ref="sidebar" level="0" @mouseenter="GLOBAL.debounce(100, handleMouseEnter, 'sideTime')()"
    @mouseleave="GLOBAL.debounce(50, handleMouseLeave, 'sideTime')()">
    <header class="OSidebar-header" v-if="showHeader">
      <MenuLogo />
    </header>

    <section>
      <q-list class="Nv0-ul" tag="ul">
        <MenuLi v-for="(Nv0, index) in props.menu" :key="Nv0.title + index" :data="Nv0" :sidebar="sidebar" :to="Nv0.href"
          @Nv0Click="() => handleClick(true)" @click="(e) => Nv0HandleClick(e, Nv0)" :showHeader="showHeader">
          <q-item-section v-if="Nv0.icon" avatar class="min-w-32 pl-10">
            <q-icon size="24px" :name="Nv0.icon"></q-icon>
          </q-item-section>
        
          <q-item-section class="Nv0-text">
            <p class="one-line">{{ Nv0.title }}</p>
          </q-item-section>
        
          <q-item-section v-if="Nv0.submenu" avatar class="opacity-50">
            <q-icon size="1rem" name="sym_r_navigate_next"></q-icon>
          </q-item-section>
        </MenuLi>
        </q-list>
        </section>
        </aside>
        <Teleport to="body">
          <span v-if="state.open" class="OSidebar-deep" @click="() => handleClick(false)"></span>
        </Teleport>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MenuLogo from './MenuLogo.vue'
import MenuLi from './MenuLi.vue'

import GLOBAL from 'src/utils/GLOBAL'
import logoAnimation from 'src/utils/animation/logo'

const route = useRoute()

const props = defineProps({
  menu: Array,
})

const state = ref({
  open: false,
  hover: false,
})
const showHeader = ref(true)

const sidebar = ref(null)
let $ = {}
let animate

onMounted(() => {
  $ = {
    Nv0: sidebar.value,
    body: document.body,
  }
  animate = logoAnimation('.OSidebar')
  animate.logoAnimationToNDT.play().progress(1)
})

watch(showHeader, () => {
  if (!showHeader.value) {
    $.body.classList.add('showHeader')
    animate = logoAnimation('.header-top')
    animate.logoAnimationToNDT.play().progress(1)
  } else {
    $.body.classList.remove('showHeader')
  }
})

watch(
  () => state.value.open,
  (open) => {
    if (open) {
      $.body.classList.add('sidebar-open')
    } else {
      $.body.classList.remove('sidebar-open')
      state.value.hover = false
      toggleActiveOnLis()
    }
  }
)

watch(
  () => state.value.hover,
  (hover) => {
    if (hover) {
      $.body.classList.add('sidebar-active')
      animate.logoAnimationToNovadata.play().timeScale(1.1)
    } else {
      $.body.classList.remove('sidebar-active')
      animate.logoAnimationToNovadata.reverse()
    }
  }
)
// Fecha menu ao mudar a rota
watch(
  () => route.path,
  () => {
    state.value.open = false
  }
)

function handleMouseEnter() {
  state.value.hover = true
}

function handleMouseLeave() {
  if (state.value.open) return
  state.value.hover = false
}

function handleClick(val) {
  state.value.open = val
}

function Nv0HandleClick({ currentTarget }, Nv0) {
  if (Nv0.href) {
    GLOBAL.debounce(0, handleClick, 'sideTime')(false)
  }
  toggleActiveOnLis(currentTarget)
}

function toggleActiveOnLis(current) {
  document
    .querySelectorAll('.Nv0-ul > li')
    .forEach((i) => i.classList.remove('active'))
  if (current) current.classList.add('active')
}
</script>

<style lang="sass">
:root
  --Nv0-sidebar-width: 5rem
  --Nv0-sidebar-width-open: 21.25rem
  --Nv0-sidebar-transition: cubic-bezier(.4,0,.2,1)
  --Nv0-sidebar-border:1px solid rgba(var(--neutral-100),0.1)
  --Nv0-sidebar-z-index: 9010
  --Nv0-sidebar-overflow: hidden
  --Nv1-sidebar-width: 21.25rem
  --Nv1-sidebar-z-index: 9019
  --Nv2-sidebar-z-index: 9018
  --z-index-deep: 9000
  --sidebar-top:0
  --sidebar-header-height: 5.4375rem

.body--light
  --logo-color: #000
  --sidebar-bg: rgb(var(--white))
  --Nv1-sidebar-bg: rgb(var(--white))
  --Nv2-sidebar-bg: rgb(var(--white))

.body--dark
  --logo-color: white
  --sidebar-bg: rgb(var(--d-neutral-10))
  --Nv1-sidebar-bg: rgb(var(--d-neutral-20))
  --Nv2-sidebar-bg: rgb(var(--d-neutral-30))
  --Nv0-sidebar-border:1px solid rgba(var(--white),0.05)

.OSidebar
  position: fixed
  height: 100vh
  left: 0
  top: var(--sidebar-top)
  width: var(--Nv0-sidebar-width)
  z-index: var(--Nv0-sidebar-z-index)
  background: var(--sidebar-bg)
  transition:.2s  var(--Nv0-sidebar-transition)
  border-right: var(--Nv0-sidebar-border)
  transition-property: width
  overflow: var(--Nv0-sidebar-overflow)
  display: flex
  flex-direction: column
  .showHeader &
    --sidebar-top:51px

  .sidebar-active &
    width: var(--Nv0-sidebar-width-open)
    --Nv0-sidebar-overflow: initial

  .sidebar-open &
    width: var(--Nv0-sidebar-width-open)

// Header
.OSidebar-header
  padding: 1.5rem .5rem 1.5rem
  border-bottom: var(--Nv0-sidebar-border)
  height: var(--sidebar-header-height)

//itens
.Nv0-ul
  margin-top: 2rem
.Nv0-li
  white-space: nowrap
.Nv0-text
  opacity: 0
  transition: opacity .2s ease

.sidebar-active .OSidebar
  .Nv0-text
    opacity: 1

// Fundo
.OSidebar-deep
  width: 100vw
  height: 100vh
  background: rgba(0,0,0,0.1)
  z-index: var(--z-index-deep)
  position: fixed
  cursor: pointer
  top: var(--sidebar-top)
  left: 0
  backdrop-filter: blur(10px)
</style>
