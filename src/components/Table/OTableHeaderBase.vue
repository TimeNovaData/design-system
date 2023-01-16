<template>
  <div class="flex items-center justify-between w-full">
    <OInput
      size="md"
      debounce="300"
      placeholder="Pesquise por nome, tipo..."
      class="no-label mb-4 w-[22rem]"
      v-model="model.filter"
      @update:model-value="$emit('update', model)"
      clearable
      @clear="$emit('update', model)"
    />

    <div class="flex gap-8 items-center">
      <span class="text-paragraph-2 text-neutral-70 dark:text-white/70">
        Mostrar
      </span>
      <OSelect
        class="w-72 h-40"
        size="md"
        v-model="model.rowsPerPage"
        :options="[10, 20, 30, 50]"
        @update:model-value="$emit('update', model)"
      />
      <span class="text-paragraph-2 text-neutral-70 dark:text-white/70">
        Linhas por página
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'

const emit = defineEmits(['update'])

const props = defineProps({
  filter: String,
  rowsPerPage: Number,
})

const model = ref({
  filter: props.filter,
  rowsPerPage: props.rowsPerPage,
})

// watch(
//   () => props.filter,
//   (newValue) => {
//     modelFilter.value = newValue
//   }
// )
</script>

<style lang="sass"></style>
