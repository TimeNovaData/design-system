<template>
  <q-header class="base-header">
    <div class="flex items-center justify-between w-full">
      <!-- breadcrumbs -->

      <q-breadcrumbs separator=">" class="bread">
        <q-breadcrumbs-el
          v-for="item in $route.meta.breadcrumbs"
          :label="item.label"
          :to="{ name: item.name }"
          :key="item.name"
          :exact="false"
        />
      </q-breadcrumbs>
      <q-space></q-space>
      <div
        v-if="taskActive?.id"
        class="timer-task-wrapper h-32 shadow-sm border border-neutral-100/10 rounded-generic bg-white dark:bg-neutral-40 flex items-center flex-nowrap gap-4 mr-12 dark:!bg-d-neutral-10 dark:border-white/10"
      >
        <div class="flex flex-nowrap gap-8 p-4 px-8 max-w-[160px]">
          <q-avatar
            v-if="
              user.id !== taskActive?.responsavel_task.id &&
              taskActive?.is_playing
            "
            size="1.5rem"
            class="border-d-neutral-10/10 !border-2 relative overflow-hidden dark:border-white/5 shrink-0"
            style="border-style: unset"
          >
            <img
              v-if="taskActive?.responsavel_task.profile.foto"
              class="absolute w-full h-full left-0 right-0 object-cover"
              :src="taskActive.responsavel_task.profile.foto"
            />
            <div
              v-else
              class="absolute inset-0 m-auto w-full h-full bg-neutral-100/10 dark:bg-white/10"
            ></div>
          </q-avatar>
          <p
            class="text-paragraph-2 text-neutral-100 one-line dark:!text-white/80"
          >
            {{ taskActive.titulo }}
          </p>
        </div>
        <TimerTask
          size="16px"
          class="!h-26 !py-0 cursor-pointer mr-2"
          :task="taskActive"
        />
      </div>
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
              v-if="userFoto"
              class="absolute w-full h-full left-0 right-0 object-cover"
              :src="userFoto"
              alt=""
            />
            <div
              v-else
              class="absolute inset-0 m-auto w-full h-full bg-neutral-100/10 dark:bg-white/10"
            ></div>
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
import gravatar from 'src/assets/image/gravatar.jpg'
import TimerTask from 'src/components/TimerTask/TimerTask.vue'

const taskActive = inject('taskActive')

const userFoto = inject('userFoto')
const user = inject('user')

// import { useBreadcrumbs } from 'src/composables/useBreadcrumbs.js'
// const { breadcrumbs } = useBreadcrumbs()

const router = useRouter()
</script>
<style lang="sass" scoped>
.bread :deep(.q-breadcrumbs--last a)
  color: rgb(var(--primary-pure)) !important
</style>

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
