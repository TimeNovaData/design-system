<template>
  <li
    class="task-item bg-white border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden px-16 py-[7px]"
  >
    <div class="base-grid">
      <div class="flex justify-between items-center">
        <q-icon name="svguse:/icons.svg#icon_drag" size="22px"></q-icon>
        <q-icon name="svguse:/icons.svg#icon_check_circle" size="22px"></q-icon>
      </div>

      <div class="pl-16">
        <p class="text-paragraph-2 text-neutral-100 one-line">
          Design System + Telas HUB | Novadata
        </p>
        <p class="text-paragraph-3 text-neutral-70">Projeto: HUB</p>
      </div>
      <div class="pl-16 relative">
        <div class="flex items-center">
          <div class="relative w-40 h-40 mr-8">
            <AvatarSingle
              class="!w-40 !h-40"
              :index="0"
              side="left"
              :item="listAvatar[0]"
            />
          </div>
          <div>
            <p class="text-paragraph-2 text-neutral-100">Você</p>
            <p class="text-paragraph-3 text-neutral-70">Criado por: Bernardo</p>
          </div>
        </div>
      </div>
      <div class="pl-16">
        <UrgenciaStatus text="Moderada" />
      </div>
      <!-- <div class="pl-16">
        <div class="flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_calendar_create"
            size="24px"
            class="mr-8"
          >
          </q-icon>
          <div>
            <p class="text-paragraph-2 text-neutral-100">09/12/2022</p>
            <p class="text-paragraph-3 text-neutral-70">Sexta</p>
          </div>
        </div>
      </div> -->
      <div class="pl-16">
        <div class="flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_calendar_heart"
            size="24px"
            class="mr-8"
          >
          </q-icon>
          <div>
            <p class="text-paragraph-2 text-neutral-100">12/12</p>
            <p class="text-paragraph-3 text-neutral-70">Terça</p>
          </div>
        </div>
      </div>
      <div class="pl-16">
        <div class="flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_date_time"
            size="24px"
            class="mr-8 text-neutral-100/40"
          >
          </q-icon>
          <div>
            <p class="text-paragraph-2">12/12</p>
            <p class="text-paragraph-3 text-neutral-70">Terça</p>
          </div>
        </div>
      </div>
      <div class="pl-16">
        <TimerTask />
      </div>
    </div>
  </li>
</template>

<script setup>
import UrgenciaStatus from 'src/components/Urgencia/UrgenciaStatus.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import TimerTask from 'src/components/TimerTask/TimerTask.vue'
import { ref } from 'vue'

const listAvatar = ref([
  {
    foto: 'https://cdn.quasar.dev/img/avatar1.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar2.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar3.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar4.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar5.jpg',
    nome: 'Teste',
  },
])
</script>

<style lang="sass" scoped>

.base-grid
  display: grid
  grid-template-columns: minmax(55px, 65px)  minmax(200px, 1fr) minmax(170px, 204px) repeat(3, 100px) minmax(120px, 130px)
  align-items: center
</style>
