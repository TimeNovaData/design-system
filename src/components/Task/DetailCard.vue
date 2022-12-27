<template>
  <q-card class="detail-card px-16">
    <div class="flex flex-col py-20">
      <span class="text-caps-3 dark:text-white/40">TÍTULO</span>
      <p class="text-paragraph-1">{{ details.nome_chamado }}</p>
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
        <p class="text-paragraph-1">{{ details.nome_tipo_task }}</p>
      </div>

      <div class="grid grid-cols-2">
        <div class="flex flex-col py-20">
          <span class="text-caps-3 dark:text-white/40">QUANTIDADE</span>
          <p class="text-paragraph-1">2</p>
        </div>
        <div class="flex flex-col py-20">
          <span class="text-caps-3 dark:text-white/40">TEMPO ESTIMADO</span>
          <p class="text-paragraph-1">{{ details.tempo_estimado }}</p>
        </div>
      </div>
    </div>

    <hr />

    <div class="grid grid-cols-2">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">
          DATA DE ENTREGA DESEJADA
        </span>
        <!-- <p class="text-paragraph-1">10/10/2022 - 18h 30m</p> -->
        <p class="text-paragraph-1">{{ details.data_final_previsto }}</p>
      </div>

      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">RESPONSÁVEL</span>
        <OAvatar :item="details.responsavel" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import { ref } from 'vue'

const props = defineProps({
  details: Object,
})

const client = ref(props.details.nome_cliente)
const project = props.details.nome_projeto
  ? ` - ${props.details.nome_projeto}`
  : ''

// nome_cliente nome_projeto

const clientAvatar = {
  nome: client.value + project,
  // nome: 'Cliente - Projeto / Subprojeto',
  foto: 'https://cdn.quasar.dev/img/avatar.png',
}
</script>

<style lang="sass" scoped>
.body--dark
  hr
    border-color: rgba(var(--white), 0.1)

hr
  border-color: rgba(var(--neutral-100), 0.1)
</style>
