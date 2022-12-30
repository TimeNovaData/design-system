<template>
  <OInput
    v-bind="attrs"
    v-model="model"
    class="text-center"
    ref="componentRef"
    @update:model-value="(value) => $emit('updateValue', value)"
  >
    <template v-slot:prepend>
      <q-icon
        size="1.5rem"
        name="svguse:/icons.svg#icon_minus_circle"
        class="cursor-pointer hover:opacity-70 transition-opacity"
        :class="{ 'cursor-not-allowed !opacity-30': model === 1 }"
        @click="model > 1 ? model-- : (model = 1)"
      ></q-icon>
    </template>

    <template v-slot:append>
      <q-icon
        size="1.5rem"
        name="svguse:/icons.svg#icon_plus_circle"
        class="cursor-pointer hover:opacity-70 transition-opacity"
        @click="model++"
      ></q-icon>
    </template>
  </OInput>
</template>

<script setup>
import { useAttrs, ref, watch } from 'vue'
import OInput from './OInput.vue'

const attrs = useAttrs()
const componentRef = ref(null)

const emit = defineEmits(['updateValue'])

const props = defineProps({
  modelValue: [Number, String],
  modelModifiers: { default: () => ({}) },
})

const model = ref(props.modelValue)

watch(model, () => emit('updateValue', model.value))

defineExpose({ componentRef })
</script>
