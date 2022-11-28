<template>
  <div class="kanban-col ">
    <header class="px-6 pb-14 pt-6 w-full flex items-center">
      <div class="inline-flex items-center gap-6">
        <p class="text-headline-3">Novo</p>
        <OCounter bg="--neutral-30" color="--neutral-70"
          class="!text-14 !rounded !p-0 !w-20 !h-20 dark:!bg-white/10 dark:!text-white/70">
          {{ data.length }}
        </OCounter>
      </div>

      <OButton size="sm" class="!p-0 !w-32 !h-32 ml-auto">
        <q-icon size="1.25rem" name="sym_r_add" tertiary></q-icon>
      </OButton>
    </header>

    <div class="cards-wrapper swiper-no-swiping" >
      <q-scroll-area>
        <slot></slot>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OCounter from 'src/components/Counter/OCounter.vue'
defineProps({
  data: Array
})

</script>

<style lang="sass" scoped>

//animacao
.flip-list-move
  transition: transform 0.5s

.no-move
  transition: transform 0s

      
</style>
