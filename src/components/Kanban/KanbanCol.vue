<template>
  <div class="kanban-col">
    <header class="px-6 pb-14 pt-6 w-full flex items-center flex-nowrap gap-8">
      <div class="inline-flex items-center gap-6">
        <p class="text-headline-3 one-line">
          {{ colData.nome }}
          <span class="opacity-60">{{
            colData.fase_conclusao ? '(Ultimos 15 dias)' : ''
          }}</span>
        </p>
        <OCounter
          class="!text-14 !rounded !w-max !p-0 !min-w-20 !h-20 dark:!bg-white/10 dark:!text-white/70 bg-neutral-100/5 text-neutral-70 !px-4"
        >
          {{ cards.length }}
        </OCounter>
      </div>

      <OButton
        size="sm"
        class="!p-0 !w-32 !h-32 ml-auto"
        @click="$emit('newCards', colData)"
      >
        <q-icon
          size="1.25rem"
          :name="
            newCardActive.id === colData.id ? 'remove_circle' : 'add_circle'
          "
          tertiary
        ></q-icon>
      </OButton>
    </header>

    <div class="cards-wrapper swiper-no-swiping">
      <q-scroll-area>
        <slot></slot>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OCounter from 'src/components/Counter/OCounter.vue'

const props = defineProps({
  cards: Array,
  colData: Object,
  newCardActive: Object,
})
</script>

<style lang="sass" scoped>

//animacao
.flip-list-move
  transition: transform 0.5s


.no-move
  transition: transform 0s
</style>
