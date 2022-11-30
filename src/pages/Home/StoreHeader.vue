<template>
  <q-header class="store-header">
    <div class="flex items-center justify-between w-full py-40">
      <div class="main-container">
        <div class="flex items-center">
          <q-avatar size="4rem">
            <img
              src="data:image/png;base64,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"
            />
          </q-avatar>
          <h1 class="ml-12 text-title-2 text-neutral-100 !font-light">
            Rei do Mate - Restaurante
          </h1>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { ref } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
const emit = defineEmits(['tree-points-click'])
const tab = ref('quadro')
</script>

<style lang="sass">
:root
  --store-header-bg: linear-gradient(90.4deg, rgba(77, 29, 215, 0.1) -0.7%, rgba(51, 119, 255, 0.1) 100%)
  --header-color: rgb(var(--neutral-60))
  --breadcrumb-color: rgb(var(--primary-pure))
  --header-kanban-height: 8.75rem

.store-header
  height: var(--header-kanban-height)
  top: 2.5rem
  display: flex
  align-items: center
  padding: .5625rem 1rem
  background: var(--store-header-bg)
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
