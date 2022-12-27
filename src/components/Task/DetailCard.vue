<template>
  <q-card class="detail-card px-16">
    <div class="flex flex-col py-20">
      <span class="text-caps-3 dark:text-white/40">TÍTULO</span>
      <p class="text-paragraph-1">Telas do Hub</p>
    </div>

    <hr />

    <div class="flex flex-col py-20">
      <span class="text-caps-3 dark:text-white/40">
        CLIENTE - PROJETO / SUBPROJETO
      </span>

      <OAvatar :item="clientAvatar" />
    </div>

    <hr />

    <div class="grid grid-cols-2">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">GRUPO / TIPO</span>
        <p class="text-paragraph-1">Figma -> Dashboard</p>
      </div>

      <div class="grid grid-cols-2">
        <div class="flex flex-col py-20">
          <span class="text-caps-3 dark:text-white/40">QUANTIDADE</span>
          <p class="text-paragraph-1">2</p>
        </div>
        <div class="flex flex-col py-20">
          <span class="text-caps-3 dark:text-white/40">Tempo estimado</span>
          <p class="text-paragraph-1">00:00</p>
        </div>
      </div>
    </div>

    <hr />

    <div class="grid grid-cols-2">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">
          DATA DE ENTREGA DESEJADA
        </span>
        <p class="text-paragraph-1">10/10/2022 - 18h 30m</p>
      </div>

      <OAvatar :item="respAvatar" />
    </div>
  </q-card>
</template>

<script setup>
import OAvatar from 'src/components/Avatar/OAvatar.vue'

const clientAvatar = {
  name: 'Cliente - Projeto / Subprojeto',
  image: 'https://cdn.quasar.dev/img/avatar.png',
}

const respAvatar = {
  name: 'Adriano',
  image: 'https://cdn.quasar.dev/img/avatar.png',
}
</script>

<style lang="sass" scoped>
.body--dark
  hr
    border-color: rgba(var(--white), 0.1)

hr
  border-color: rgba(var(--neutral-100), 0.1)
</style>
