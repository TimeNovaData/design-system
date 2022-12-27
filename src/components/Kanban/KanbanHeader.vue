<template>
  <q-header class="kanban-header">
    <div class="flex items-center justify-between w-full">
      <div class="flex gap-8 items-center">
        <p class="text-title-3 text-white/90"></p>
      </div>

      <q-tabs
        v-model="tabs"
        class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max mx-auto"
        active-color="primary-pure"
      >
        <q-tab name="board">
          <template class="inline-flex flex-row items-center gap-4 text-white">
            <q-icon size="1.5rem" name="svguse:/icons.svg#icon_quadro"></q-icon>
            <p class="text-paragraph-1">Quadro</p>
          </template>
        </q-tab>

        <q-tab name="lista">
          <template class="inline-flex flex-row items-center gap-4 text-white">
            <q-icon size="1.5rem" name="svguse:/icons.svg#icon_table"></q-icon>
            <p class="text-paragraph-1">Lista</p>
          </template>
        </q-tab>
      </q-tabs>

      <div class="flex gap-8 text-white/80">
        <OButton
          size="sm"
          secondary
          class="bg-white/10 !py-0 !h-32 !border-transparent hover:!text-primary-pure"
          @click="handleClick"
        >
          <q-icon id="icon-reload-kanban" size="1.5rem" name="replay"></q-icon>
        </OButton>

        <OButton
          id="kanban-filters"
          size="sm"
          secondary
          class="bg-white/10 !py-0 !h-32 !border-transparent"
        >
          <!-- <q-icon size="1.5rem" name="svguse:/icons.svg#icon_filter"></q-icon> -->
          <q-icon size="1.5rem" name="svguse:/icons.svg#icon_filtros"></q-icon>
          Filtros
          <slot name="filtros"></slot>
        </OButton>

        <OButton
          size="sm"
          secondary
          class="bg-white/10 !p-0 !px-8 !h-32 !border-transparent"
          @click="$emit('tree-points-click')"
        >
          <q-icon
            size="1.5rem"
            name="svguse:/icons.svg#icon_tree_points"
          ></q-icon>
          Opções
        </OButton>
      </div>

      <!-- Avatar -->
    </div>
  </q-header>
</template>

<script setup>
import { ref, inject } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import gsap from 'gsap/dist/gsap'

const emit = defineEmits(['tree-points-click', 'reload'])

const tabs = inject('tabs')

function handleClick() {
  emit('reload')
  gsap.to('#icon-reload-kanban', {
    rotate: -360,
    duration: 0.5,
    clearProps: true,
    transformOrigin: 'center center',
    ease: 'linear',
  })
}
</script>

<style lang="sass">
.layout-kanban
  --header-color: rgb(var(--neutral-60))
  --header-kanban-height: 3rem

  .base-header
    --header-bg: rgba(0,0,0, .5)
    --header-border-b: 1px solid rgba(var(--white),0.05)



.kanban-header
  --header-bg: rgba(0,0,0, .5)
  height: var(--header-kanban-height)
  top: 2.5rem
  display: flex
  align-items: center
  padding: .5625rem 1rem
  background: var(--header-bg) !important
  width: calc(100% - var(--Nv0-sidebar-width))
  margin-left: auto
  color: var(--header-color)
  border-bottom: 1px solid rgba(var(--white),0.1) !important
  .q-tab--active
    *
      color: rgb(var(--primary-pure)) !important

  .q-breadcrumbs
    --breadcrumb-color: rgb(var(--neutral-60))
    .q-breadcrumbs__separator
      color: var(--breadcrumb-color) !important
    .q-breadcrumbs__el
      color: var(--breadcrumb-color) !important
</style>
