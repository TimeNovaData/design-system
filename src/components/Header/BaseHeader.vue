<template>
  <q-header class="base-header">
    <div class="flex items-center justify-between w-full">
      <!-- breadcrumbs -->

      <q-breadcrumbs separator=">">
        <q-breadcrumbs-el
          v-for="item in $route.meta.breadcrumbs"
          :label="item.label"
          :to="{ name: item.name }"
          :key="item.name"
          :exact="true"
        />
      </q-breadcrumbs>
      <q-space></q-space>
      <div class="flex gap-8 items-center" style="--neutral-100: var(--white)">
        <slot name="right"> </slot>

        <OButton
          class="text-neutral-10 w-32 h-32 !p-0"
          tertiary
          rounded
          size="sm"
        >
          <!-- <q-icon name="person"> </q-icon> -->
          <q-avatar
            size="2rem"
            class="border-d-neutral-10/10 !border-2 relative overflow-hidden dark:border-white/5"
            style="border-style: unset"
          >
            <!--       <q-badge rounded class="bg-primary-pure w-8 h-8" floating></q-badge> -->
            <img
              v-show="userFoto"
              class="absolute w-full h-full left-0 right-0 object-cover"
              :src="GLOBAL.imgSrc(userFoto)"
              alt=""
            />
          </q-avatar>
          <BaseHeaderMenu></BaseHeaderMenu>
        </OButton>
      </div>

      <!-- Avatar -->
    </div>
  </q-header>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import OButton from 'src/components/Button/OButton.vue'
import BaseHeaderMenu from './BaseHeaderMenu.vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'

const userFoto = inject('userFoto')
const user = inject('user')

// import { useBreadcrumbs } from 'src/composables/useBreadcrumbs.js'
// const { breadcrumbs } = useBreadcrumbs()

const router = useRouter()
</script>

<style lang="sass">
:root
  --header-bg: rgb(var(--white))
  --header-color: rgb(var(--neutral-60))
  --breadcrumb-color: rgb(var(--neutral-60))
  --header-base-height: 2.5rem
  --header-border-b: 1px solid rgba(var(--neutral-100),0.1)



.base-header
  height: var(--header-base-height)
  display: flex
  align-items: center
  padding: .5625rem 1rem
  background: var(--header-bg)
  width: calc(100% - var(--Nv0-sidebar-width))
  margin-left: auto
  color: var(--header-color)
  border-bottom: var(--header-border-b)



  .q-breadcrumbs
    .q-breadcrumbs__separator
      color: var(--breadcrumb-color)
    .q-breadcrumbs__el
      color: var(--breadcrumb-color)

.body--dark
  .base-header
    --header-bg: rgb(var(--d-neutral-10))
    --header-border-b: 1px solid rgba(var(--white),0.05)
    --breadcrumb-color: rgba(var(--white), 0.9)
</style>
