<template>
  <div
    class="table-container border border-neutral-100/10 rounded-generic mt-16 dark:border-white/10"
  >
    <ChamadoListHeader />
    <q-scroll-area class="!h-[400px]">
      <div v-for="chamado in chamadosList" :key="chamado.id" c>
        <ChamadoListItem
          :chamado="chamado"
          @click="$emit('click:list-item', chamado.id)"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import ChamadoListHeader from './ChamadoListHeader.vue'
import ChamadoListItem from './ChamadoListItem.vue'

defineProps({
  chamadosList: Array,
})
defineEmits(['click:list-item'])
</script>

<style lang="scss" scoped></style>
