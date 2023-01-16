<template>
  <div
    class="grid grid-cols-[var(--grid-chamado-list)] h-52 cursor-pointer hover:bg-neutral-10 relative dark:hover:bg-white/5 border-neutral-100/10 border-b"
  >
    <div class="flex items-center gap-4 px-16 py-6">
      <OAvatar size="32px" :foto="chamado.user_criacao.foto"></OAvatar>
      <div class="flex flex-col">
        <p class="text-paragraph-2 one-line">
          {{ chamado.titulo }}
        </p>
        <span class="text-neutral-60 text-paragraph-3 dark:text-white/60">{{
          chamado.user_criacao.nome
        }}</span>
      </div>
    </div>

    <div
      class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-16 text-end justify-end"
    >
      {{ GLOBAL.FData(chamado.data_criacao) }}
    </div>

    <div
      class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-16 !text-end justify-end"
    >
      {{ GLOBAL.FData(chamado.data_desejada) }}
    </div>

    <div
      class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-16 !text-end justify-end"
    >
      {{ GLOBAL.FData(chamado.data_atualizacao) }}
    </div>

    <div
      class="flex items-center text-paragraph-2 border-l border-neutral-100/10 p-10"
    >
      <div
        class="bg-neutral-100/10 w-full h-full justify-center flex text-center items-center rounded-generic"
      >
        {{ chamado.anexo || '-' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import OAvatar from 'src/components/Avatar/OAvatar.vue'

defineProps({
  chamado: Object,
})
</script>

<style lang="sass">
:root
  --grid-chamado-list: auto 162px 162px 162px 100px
</style>
