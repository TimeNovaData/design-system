<template>
  <q-card
    class="kanban-card shadow-md p-6 dark:bg-d-neutral-40"
    @click="(e) => handleEmit(e, item)"
  >
    <div class="flex flex-wrap gap-4 mb-6">
      <OBadge
        v-for="tag in item.tags"
        :key="tag.nome"
        size="sm"
        :badge="true"
        :bg="tag.cor"
        square
      >
        <template #content>
          <p>{{ tag.nome }}</p>
        </template>
      </OBadge>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia modi
      soluta obcaecati
      {{ item.nome }}
    </p>
    <slot></slot>

    <OBadge
      size="sm"
      :badge="false"
      bg="--d-success"
      square
      class="w-full text-center justify-center my-6"
    >
      <template #content>
        <p class="text-center mx-auto">Assessment coolers</p>
      </template>
    </OBadge>

    <section class="flex justify-between items-center" v-if="visaoExpandida">
      <p class="inline-flex gap-2 text-headline-4">
        <span class="text-primary-pure">6</span>
        <span class="text-opacity-70">de</span> <span>10</span>
      </p>
      <p class="text-paragraph-3 text-opacity-70">Tarefas Concluídas</p>
    </section>
    <section
      class="h-4 w-full rounded-xl bg-neutral-100/10 dark:bg-white/10 overflow-hidden relative"
      v-if="visaoExpandida"
    >
      <span
        class="h-4 absolute left-0 top-0 bg-primary-pure block"
        style="width: 60%"
      ></span>
    </section>

    <span class="kanban-card-separator" v-if="visaoExpandida"></span>

    <section class="flex gap-6 justify-between items-center w-full">
      <div class="flex items-center gap-6">
        <q-icon
          class="w-18 h-18"
          name="svguse:/icons.svg#icon_menu_kanban"
        ></q-icon>

        <div class="inline-flex items-center">
          <q-icon
            class="w-18 h-18"
            name="svguse:/icons.svg#icon_attach"
          ></q-icon>
          <p class="opacity-40 text-headline-4">4</p>
        </div>
      </div>
      <div class="h-32 ml-auto w-[150px] relative right-[-20px]">
        <q-avatar
          v-for="n in 2"
          :key="n"
          size="40px"
          class="overlapping w-32 h-32 absolute border-white border-2 dark:border-d-neutral-10 overflow-hidden"
          :style="`right: ${n * 25}px`"
        >
        <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
        </q-avatar>
      </div>
    </section>

    <span class="kanban-card-separator" v-if="visaoExpandida"></span>

    <section class="grid grid-cols-12 gap-6" v-if="visaoExpandida">
      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-4 rounded-generic"
      >
        <p class="text-paragraph-4 dark:text-white/70">Solicitado</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wide">
          16/09/2022
        </p>
      </div>
      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-4 rounded-generic"
      >
        <p class="text-paragraph-4 dark:text-white/70">Desejado</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wide">
          16/09/2022
        </p>
      </div>

      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-4 rounded-generic"
      >
        <p class="text-paragraph-4 dark:text-white/70">Previsto</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wide">
          16/09/2022
        </p>
      </div>

      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-6 rounded-generic flex items-center justify-between"
      >
        <p class="text-paragraph-4 dark:text-white/70">Orçado:</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wider">1h 45m</p>
      </div>

      <div
        class="p-6 dark:bg-white/10 bg-neutral-100/5 col-span-6 rounded-generic flex items-center justify-between"
      >
        <p class="text-paragraph-4 dark:text-white/70">Decorrido:</p>
        <p class="text-headline-5 dark:text-white/90 !tracking-wider">1h 45m</p>
      </div>
    </section>



  </q-card>
</template>

<script setup>
import OBadge from 'src/components/Badge/OBadge.vue'

defineProps({
  item: Object,
  visaoExpandida: Boolean,
})
const emit = defineEmits(['cardClick'])

function handleEmit(e, item) {
  e.stopPropagation()
  e.stopImmediatePropagation()
  emit('cardClick', item.nome)
}
</script>

<style lang="sass">

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
  width: calc(100% - 0.75rem)
  background: rgba(var(--neutral-100), 0.1)
  margin: 6px 0
  position: relative
  left: -0.375rem
  border: 0
  display: block
</style>
