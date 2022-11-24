<template>
  <q-header class="kanban-header">
    <div class="flex items-center justify-between w-full">
      <div class="flex gap-8 items-center">
        <p class="text-title-3 text-white/90">Natura</p>
      </div>

      <q-tabs
        v-model="tab"
        class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max mx-auto"
        active-color="primary-pure"
      >
        <q-tab name="quadro">
          <template class="inline-flex flex-row items-center gap-4">
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_quadro"
            ></q-icon>
            <p class="text-paragraph-1">Quadro</p>
          </template>
        </q-tab>
      </q-tabs>

      <div class="flex gap-8 text-white/80">
        <OButton
          size="sm"
          secondary
          class="bg-white/10 !py-0 !h-32 !border-transparent"
        >
          <q-icon
            size="1.5rem"
            name="svguse:/icons.svg#icon_filter"
          ></q-icon>
          Filtro
        </OButton>
        <OButton
          size="sm"
          secondary
          class="bg-white/10 !py-0 !h-32 !border-transparent"
        >
          <q-icon
            size="1.5rem"
            name="svguse:/icons.svg#icon_visualizacao"
          ></q-icon>

          Visualização
          <q-badge rounded class="bg-primary-pure w-8 h-8" floating></q-badge>
          <q-menu class="overflow-x-hidden ">
            <q-list padding class="select-none min-w-[250px]">
              <q-item dense class="items-center">
                <p class="text-headline-3">
                  Mudar Visualizaçao</p>
              </q-item>

              <q-item tag="label">
                <q-item-section
                  avatar
                  class="flex items-center flex-row no-wrap"
                >
                  <q-toggle v-model="visaoExpandida"></q-toggle>
                  <p class="text-paragraph-2">Visão Expandida</p>
                </q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </OButton>
        <OButton
          size="sm"
          secondary
          class="bg-white/10 !p-0 !h-32 !border-transparent !w-32"
        >
          <q-icon
            size="1.5rem"
            name="svguse:/icons.svg#icon_tree_points"
          ></q-icon>
        </OButton>
      </div>

      <!-- Avatar -->
    </div>
  </q-header>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseMenuTop from './BaseMenuHeader.vue'
import OButton from './OButton.vue'
import OInput from './OInput.vue'
import { useVisaoExpandida } from 'src/stores/visaoExpandida'

const visao = useVisaoExpandida()
const { visaoExpandida } = storeToRefs(visao)
const tab = ref('quadro')
</script>

<style lang="sass">
:root
  --header-bg: rgb(var(--white))
  --header-color: rgb(var(--neutral-60))
  --breadcrumb-color: rgb(var(--neutral-60))
  --header-kanban-height: 3rem

.kanban-header
  height: var(--header-kanban-height)
  top: 2.5rem
  display: flex
  align-items: center
  padding: .5625rem 1rem
  background: var(--header-bg)
  width: calc(100% - var(--Nv0-sidebar-width))
  margin-left: auto
  color: var(--header-color)
  border-bottom: 1px solid rgba(var(--white),0.1) !important



  .q-breadcrumbs
    .q-breadcrumbs__separator
      color: var(--breadcrumb-color)
    .q-breadcrumbs__el
      color: var(--breadcrumb-color)
</style>
