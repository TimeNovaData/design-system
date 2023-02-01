<template>
  <q-card class="detail-card px-16 pb-24">
    <div class="flex justify-between items-center">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">TÍTULO</span>
        <p class="text-paragraph-1 two-lines">{{ details.titulo }}</p>
      </div>

      <OButton
        secondary
        icon="svguse:/icons.svg#icon_github"
        class="text-neutral-100/70 dark:text-white/70"
        @click="
          $NotifySucess('Commit copiado') &&
            copyToClipboard(`${details.id} - ${details.titulo}`)
        "
      >
        <q-tooltip v-bind="tooltipProps">Copiar commit</q-tooltip>
      </OButton>
    </div>

    <hr />

    <div class="flex flex-col py-20">
      <span class="text-caps-3 dark:text-white/40 mb-6">
        CLIENTE - PROJETO / SUBPROJETO
      </span>

      <OAvatar
        v-if="details.projeto.nome_cliente"
        :nome="details.projeto.nome_cliente"
        :foto="details.projeto.logo"
      />

      <div class="grid grid-cols-2 items-center mt-10 gap-16">
        <OBadge
          :color="GLOBAL.returnRGB(details.projeto.cor)"
          size="sm"
          square
          class="w-max"
        >
          <template #content>
            <p class="text-center mx-auto one-line">
              {{ details.projeto.nome }}
            </p>
          </template>
        </OBadge>

        <OBadge
          v-if="details.sub_projeto"
          :color="GLOBAL.returnRGB(details.sub_projeto.cor)"
          size="sm"
          square
          class="w-max"
        >
          <template #content>
            <p class="text-center mx-auto one-line">
              {{ details.sub_projeto.nome }}
            </p>
          </template>
        </OBadge>
      </div>
    </div>

    <hr />

    <div class="grid grid-cols-2 gap-16">
      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40">GRUPO / TIPO</span>
        <p class="text-paragraph-1 one-line">{{ details?.tipo_task?.nome }}</p>
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
          :nome="details.responsavel_task.get_full_name"
          :foto="details.responsavel_task.profile.foto"
        />
      </div>
    </div>

    <hr />

    <div class="grid grid-cols-2 gap-16">
      <div class="flex flex-col py-20" v-if="details?.chamado">
        <span class="text-caps-3 dark:text-white/40">CHAMADO</span>
        <p class="text-paragraph-1 two-lines">{{ details.chamado.titulo }}</p>
      </div>

      <div class="flex flex-col py-20">
        <span class="text-caps-3 dark:text-white/40"> DATA DE CRIAÇÃO </span>
        <p class="text-paragraph-1">{{ creationDate }}</p>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { copyToClipboard } from 'quasar'
import GLOBAL from 'src/utils/GLOBAL'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'

const props = defineProps({
  details: Object,
})

const tooltipProps = {
  anchor: 'top middle',
  self: 'bottom middle',
  offset: [10, 10],
}

// Formatando tempo e data
const estimatedTime = GLOBAL.FTime(props.details.tempo_estimado)
const revisedDate = GLOBAL.FData(props.details.entrega_data_desejada)
const creationDate = GLOBAL.FData(props.details.data_criacao)
</script>

<style lang="sass" scoped>
.body--dark
  hr
    border-color: rgba(var(--white), 0.1)

hr
  border-color: rgba(var(--neutral-100), 0.1)
</style>
