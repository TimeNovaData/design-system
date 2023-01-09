<template>
  <q-card class="detail-card px-16">
    <div class="flex flex-col py-20">
      <span class="text-caps-3 dark:text-white/40">TÍTULO</span>
      <p class="text-paragraph-1 two-lines">{{ details.titulo }}</p>
    </div>

    <hr />

    <div class="flex flex-col py-20">
      <span class="text-caps-3 dark:text-white/40 mb-6">
        CLIENTE - PROJETO / SUBPROJETO
      </span>

      <OAvatar :nome="details.nome_cliente" :foto="details.logo_cliente" />

      <div class="grid grid-cols-2 items-center mt-10 gap-16">
        <OBadge size="sm" square class="bg-primary-pure-dark/40 w-max">
          <template #content>
            <p class="text-center mx-auto one-line">
              {{ details.nome_projeto }}
            </p>
          </template>
        </OBadge>

        <OBadge
          v-if="details.sub_projeto"
          size="sm"
          square
          class="bg-primary-pure-dark/40 w-max"
        >
          <template #content>
            <p class="text-center mx-auto one-line">
              {{ details.sub_projeto }}
            </p>
          </template>
        </OBadge>
      </div>
    </div>

    <hr />

    <div class="grid grid-cols-2 gap-16">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">GRUPO / TIPO</span>
        <p class="text-paragraph-1 one-line">{{ details.nome_tipo_task }}</p>
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

    <div class="grid grid-cols-2 gap-16">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">
          DATA DE ENTREGA DESEJADA
        </span>
        <p class="text-paragraph-1">{{ revisedDate }}</p>
      </div>

      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40 mb-6">RESPONSÁVEL</span>
        <OAvatar
          :nome="details.responsavel_task.nome"
          :foto="details.responsavel_task.profile.foto"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OBadge from 'src/components/Badge/OBadge.vue'

const props = defineProps({
  details: Object,
})

// Formatando tempo e data
const estimatedTime = GLOBAL.FTime(props.details.tempo_estimado)
const revisedDate = GLOBAL.FData(props.details.entrega_data_desejada)
</script>

<style lang="sass" scoped>
.body--dark
  hr
    border-color: rgba(var(--white), 0.1)

hr
  border-color: rgba(var(--neutral-100), 0.1)
</style>
