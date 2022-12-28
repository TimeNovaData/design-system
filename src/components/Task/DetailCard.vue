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
          <p class="text-paragraph-1">{{ details.quantidade }}</p>
        </div>
        <div class="flex flex-col py-20">
          <span class="text-caps-3 dark:text-white/40">TEMPO ESTIMADO</span>
          <p class="text-paragraph-1">{{ estimatedTime }}</p>
        </div>
      </div>
    </div>

    <hr />

    <div class="grid grid-cols-2">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">
          DATA DE ENTREGA DESEJADA
        </span>
        <p class="text-paragraph-1">{{ revisedDate }}</p>
      </div>

      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">RESPONSÁVEL</span>
        <OAvatar :item="details.responsavel" />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import OAvatar from 'src/components/Avatar/OAvatar.vue'

const props = defineProps({
  details: Object,
})

// Formatando tempo e data
const estimatedTime = GLOBAL.FTime(props.details.tempo_estimado)
const revisedDate = GLOBAL.FData(props.details.entrega_data_desejada)

// Gerando o field de cliente / projeto
const subProject = props.details.sub_projeto
  ? ` / ${props.details.sub_projeto}`
  : ''

const clientName =
  props.details.nome_cliente + ` - ${props.details.nome_projeto}` + subProject

const clientAvatar = {
  nome: clientName,
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
