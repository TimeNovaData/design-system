<template>
  <q-card class="kanban-card shadow-md p-6 dark:bg-d-neutral-40" @click="(e) => handleEmit(e, item)">

    <div class="flex flex-wrap gap-4 mb-6">
      <OBadge v-for="tag in item.tags" :key="tag.nome" size="sm" :badge="true" :bg="tag.cor" square>
        <template #content>
          <p>{{ tag.nome }}</p>
        </template>
      </OBadge>
    </div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia modi soluta obcaecati 
 

    {{ item.nome }}

    <slot></slot>
  </q-card>
</template>

<script setup>
import OBadge from 'src/components/OBadge.vue';

defineProps({
  item: Object
})
const emit = defineEmits(['cardClick'])

function handleEmit(e, item){
  e.stopPropagation()
  e.stopImmediatePropagation()
  emit('cardClick', item.nome)
}
</script>

<style lang="sass" scoped>

</style>
