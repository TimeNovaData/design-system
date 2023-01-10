<template>
  <q-page-sticky
    position="bottom-right"
    :offset="[0, 0]"
    class="z-[9999999999]"
    id="floatbutton-sticky"
  >
    <div class="!w-[5rem] !h-[5rem] !p-0 relative">
      <q-btn
        round
        class="bg-primary-pure !w-[60px] !h-[60px] shadow-md"
        @click="handleClick"
      >
        <q-tooltip v-if="!state" v-bind="tooltipProps"
          >⚡ Ações Rapidas</q-tooltip
        >
        <q-icon
          size="40px"
          class="w-40 h-40 dark:text-d-neutral-10"
          name="svguse:/icons.svg#icon_star"
          id="icon-button-floatbutton"
        ></q-icon>
      </q-btn>

      <div class="buttons" id="buttons-floatbutton">
        <q-btn
          class="shadow-md botoes dark:!bg-d-neutral-30 bg-white"
          rounded=""
        >
          <q-icon
            name="svguse:/icons.svg#icon_file_add"
            class="text-primary-pure"
          ></q-icon>
          <q-tooltip v-bind="tooltipProps">Criar Task</q-tooltip>
        </q-btn>

        <q-btn
          class="shadow-md botoes dark:!bg-d-neutral-30 bg-white"
          rounded=""
          @click="openTaskEditModal"
        >
          <q-icon
            name="svguse:/icons.svg#icon_file_add"
            class="text-primary-pure"
          ></q-icon>
          <q-tooltip v-bind="tooltipProps">Nova Tarefa</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-page-sticky>
</template>

<script setup>
import gsap from 'gsap/dist/gsap'
import { onMounted, ref, watch, watchEffect, inject } from 'vue'

const openTaskEditModal = inject('openTaskEditModal')
function tl() {
  const icon = document.getElementById('icon-button-floatbutton')
  const buttonsContainer = document.getElementById('buttons-floatbutton')
  const buttonsContainerItems = document.querySelectorAll(
    '#buttons-floatbutton .botoes '
  )
  return gsap
    .timeline({ paused: true, immediateRender: true, overwrite: true })
    .set(buttonsContainerItems, { opacity: 0 })
    .from(icon, { rotate: 0 }, 'time1')
    .to(icon, { rotate: 310 }, 'time1')
    .from(buttonsContainer, { scale: 0, transformOrigin: 'bottom' }, 'time1')
    .to(buttonsContainer, { scale: 1, transformOrigin: 'bottom' }, 'time1')
    .from(buttonsContainerItems, { y: 50, opacity: 0, stagger: 0.1 }, 'time1')
    .to(
      buttonsContainerItems,
      { y: 0, transformOrigin: 'bottom', stagger: 0.3, opacity: 1 },
      'time1'
    )
}

const timeline = ref(null)
const state = ref(false)

const handleClickOutside = (e) => {
  console.log('clique')
  const floatButton = document.querySelector('#floatbutton-sticky')
  const isEl = e.target === floatButton
  const isFather = e.target.closest('#floatbutton-sticky')

  if (isEl || isFather) {
    return null
  } else {
    state.value = false
  }
}

watch(
  () => state.value,
  (v) => {
    if (v) {
      timeline.value.play()
      document.addEventListener('click', handleClickOutside)
    } else {
      timeline.value.reverse()
      document.removeEventListener('click', handleClickOutside)
    }
  }
)

function handleClick() {
  state.value = !state.value
}

onMounted(() => {
  const buttonsContainer = document.getElementById('buttons-floatbutton')
  gsap.set(buttonsContainer, { scale: 0 })
  timeline.value = tl()
})
//  anchor="center left" self="center right" :offset="[10, 10]"
const tooltipProps = {
  anchor: 'center left',
  self: 'center right',
  offset: [10, 10],
  transitionDuration: 100,
}
</script>

<style lang="sass" scoped>
.buttons
  height: 150px
  width: 60px
  position: absolute
  top:-165px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-end
  gap:16px
  .botoes
    transition: initial !important
    padding: 0 !important
    width: 3rem
    height: 3rem
    .body--dark &
      border: 1px solid rgba(var(--white), 0.1)
</style>
