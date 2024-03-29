<template>
  <q-card
    class="kanban-card shadow-md p-6 dark:bg-d-neutral-40 hover:cursor-pointer overflow-hidden hover:bg-neutral-10 dark:hover:bg-d-neutral-30"
    @click="(e) => handleEmit(e, item)"
    @keyup.enter="(e) => handleEmit(e, item)"
    tabindex="0"
  >
    <div class="flex flex-wrap gap-4 mb-6">
      <OBadge
        v-for="tag in item.tag"
        size="sm"
        :key="tag.nome"
        :badge="true"
        square
        :color="returnRGB(tag.cor_letra)"
      >
        <template #content>
          <p>{{ tag.nome }}</p>
        </template>
      </OBadge>
    </div>
    <div
      class="three-lines card-descicao inline-block text-paragraph-2"
      style="word-break: break-word"
    >
      <div class="card-id inline-block mr-4 three-lines">(Nº{{ item.id }})</div>
      {{ item.titulo }}
    </div>
    <slot></slot>

    <OBadge
      v-if="item.projeto.nome"
      size="sm"
      :badge="false"
      :bg="returnRGB(item.projeto.cor)"
      :color="returnRGB(item.projeto.cor)"
      square
      class="w-full text-center justify-center my-6"
      :ripple="false"
    >
      <template #content>
        <p class="text-center mx-auto one-line">{{ item.projeto.nome }}</p>
      </template>
    </OBadge>

    <section
      class="flex justify-between items-center"
      v-if="visaoExpandida && item.quantidade_tasks > 0"
    >
      <p class="inline-flex gap-2 text-headline-4">
        <span class="text-primary-pure">{{
          item.quantidade_tasks_concluidas
        }}</span>
        <span class="text-opacity-70">de</span>
        <span>{{ item.quantidade_tasks }}</span>
      </p>
      <p class="text-paragraph-3 text-opacity-70">Tarefas Concluídas</p>
    </section>

    <section
      class="h-4 w-full rounded-xl bg-neutral-100/10 dark:bg-white/10 overflow-hidden relative"
      v-if="visaoExpandida && item.quantidade_tasks > 0"
    >
      <span
        class="h-4 absolute left-0 top-0 bg-primary-pure block"
        :style="{
          width:
            (item.quantidade_tasks / item.quantidade_tasks_concluidas) * 100 +
            '%',
        }"
      ></span>
    </section>

    <span class="kanban-card-separator" v-if="visaoExpandida"></span>

    <section class="flex gap-6 justify-between items-center w-full">
      <div class="flex items-center gap-6">
        <q-icon
          v-if="item.descricao"
          class="w-18 h-18"
          name="svguse:/icons.svg#icon_menu_kanban"
        ></q-icon>

        <div class="inline-flex items-center" v-if="item.anexo">
          <q-icon
            class="w-18 h-18"
            name="svguse:/icons.svg#icon_attach"
          ></q-icon>
          <p class="opacity-40 text-headline-4">{{ item.anexo.length }}</p>
        </div>
      </div>
      <div class="h-32 ml-auto w-[150px] relative">
        <AvatarMultiple side="right" :list="item.responsaveis"></AvatarMultiple>
      </div>
    </section>

    <span class="kanban-card-separator" v-if="visaoExpandida"></span>

    <section class="grid grid-cols-12 gap-6" v-if="visaoExpandida">
      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-4 rounded-generic"
      >
        <p class="text-paragraph-4 dark:text-white/70">Solicitado</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wide">
          {{ FData(item.data_criacao) }}
        </p>
      </div>
      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-4 rounded-generic"
      >
        <p class="text-paragraph-4 dark:text-white/70">Desejado</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wide">
          {{ FData(item.data_desejada) }}
        </p>
      </div>

      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-4 rounded-generic"
      >
        <p class="text-paragraph-4 dark:text-white/70">Previsto</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wide">
          {{ FData(item.data_prevista) }}
        </p>
      </div>

      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-6 rounded-generic flex items-center justify-between"
      >
        <p class="text-paragraph-4 dark:text-white/70">Orçado:</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wider">
          {{ FTime(item.tempo_estimado) }}
        </p>
      </div>

      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-6 rounded-generic flex items-center justify-between"
      >
        <p class="text-paragraph-4 dark:text-white/70">Decorrido:</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wider">
          {{ FTime(item.tempo_decorrido) }}
        </p>
      </div>
    </section>
  </q-card>
</template>

<script setup>
import OBadge from 'src/components/Badge/OBadge.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { colors } from 'quasar'
import { onMounted } from 'vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'

const { FData, FTime } = GLOBAL
const { returnRGB } = GLOBAL

defineProps({
  item: Object,
  visaoExpandida: Boolean,
})

// const returnRGB = (v) => `${Object.values(colors.hexToRgb(v))}`

const emit = defineEmits(['cardClick'])

function handleEmit(e, item) {
  e.stopPropagation()
  e.stopImmediatePropagation()
  emit('cardClick', item.nome)
}

onMounted(() => {
  colors.hexToRgb('#000')
})
</script>

<style lang="sass">

@import 'src/css/quasar/variables.sass'
@import 'src/css/quasar/core/typography.sass'

.ghost
  &::after
    content: ""
    position: absolute
    width: 100%
    height: 100%
    left: 0
    top: 0
    display: block
    background: rgb(var(--neutral-30))
    border-radius: 3px
    overflow: hidden
    .body--dark &
      background: rgb(var(--d-neutral-40))

.kanban-card-separator
  height: .0625rem
  width: calc(100% + 0.75rem)
  background: rgba(var(--neutral-100), 0.1)
  margin: 6px 0
  position: relative
  left: -0.375rem
  border: 0
  display: block

.kanban-card
  .card-id
    @include text(headline-3)
</style>
