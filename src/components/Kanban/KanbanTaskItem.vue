<template>
  <div
    class="flex py-12 px-16 border-b border-b-neutral-30 items-center gap-8 w-full flex-1 dark:border-b-white/5 cursor-pointer hover:bg-neutral-10 transition-colors"
    @click="() => openTaskViewModal(task)"
  >
    <AvatarSingle
      class="!relative !left-0 !h-48 !w-48"
      :index="1"
      :item="task.responsavel"
    />
    <p class="flex-[3]">{{ task.titulo }}</p>
    <div v-if="task.entrega_data_desejada" class="mx-12">
      <span class="text-headline-4 text-neutral-60 dark:text-white/60"
        >Desejado</span
      >
      <p class="text-paragraph-2">
        {{ GLOBAL.FData(task.entrega_data_desejada) }}
      </p>
    </div>
    <div v-if="task.data_final_previsto" class="mx-12">
      <span class="text-headline-4 text-neutral-60 dark:text-white/60"
        >Previsto</span
      >
      <p class="text-paragraph-2">
        {{ GLOBAL.FData(task.data_final_previsto) }}
      </p>
    </div>
    <div v-if="task.tempo_total" class="mx-12">
      <span class="text-headline-4 text-neutral-60 dark:text-white/60"
        >Tempo decorrido</span
      >
      <p class="text-paragraph-2">{{ GLOBAL.FTime(task.tempo_total) }}</p>
    </div>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'

defineProps({
  task: Object,
  openTaskViewModal: Function,
})
</script>

<style lang="sass" scoped></style>
