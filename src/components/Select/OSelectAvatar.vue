<template>
  <OSelect
    option-value="id"
    option-label="nome"
    v-bind="attrs"
    v-model="model"
    ref="componentRef"
    use-input
    @update:model-value="(value) => $emit('updateValue', value)"
  >
    <template #option="{ itemProps, opt }">
      <q-item v-bind="itemProps">
        <OAvatar :nome="opt[nomeKey]" :foto="opt[fotoKey]" />
      </q-item>
    </template>

    <template #selected-item="{ itemProps, opt }">
      <q-item v-bind="itemProps" class="translate-y-3 p-0">
        <OAvatar :nome="opt[nomeKey]" :foto="opt[fotoKey]" />
      </q-item>
    </template>
  </OSelect>
</template>

<script setup>
import { useAttrs, ref } from 'vue'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OSelect from './OSelect.vue'

const emit = defineEmits(['updateValue'])

const props = defineProps({
  modelValue: [String, Number, Object],
  nomeKey: {
    type: String,
    default: 'nome',
  },
  fotoKey: {
    type: String,
    default: 'foto',
  },
})

const model = ref(props.modelValue)
const attrs = useAttrs()
const componentRef = ref(null)

defineExpose({ componentRef })
</script>
