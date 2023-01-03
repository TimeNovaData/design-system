<template>
  <OSelect
    class="select-avatar"
    option-value="id"
    option-label="nome"
    v-bind="attrs"
    v-model="model"
    ref="componentRef"
    use-input
    @update:model-value="(value) => $emit('updateValue', value)"
    popup-content-class="select-menu !min-w-[360px]"
  >
    <template #option="{ itemProps, opt }">
      <q-item v-bind="itemProps" class="px-4">
        <OAvatar
          :nome="opt[nomeKey]"
          :foto="opt[fotoKey]"
          classAvatar="!w-[1.25em] !h-[1.25em]"
        />
      </q-item>
    </template>

    <template #selected-item="{ itemProps, opt }">
      <q-item v-bind="itemProps" class="translate-y-2 p-0 min-h-0" v-show="opt">
        <OAvatar
          classAvatar="!w-[0.74em] !h-[0.74em]"
          :nome="opt[nomeKey]"
          :foto="opt[fotoKey]"
          :classText="classText"
        />
      </q-item>
    </template>
  </OSelect>
</template>

<script setup>
import { useAttrs, ref, watch } from 'vue'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OSelect from './OSelect.vue'

const emit = defineEmits(['updateValue'])

const props = defineProps({
  modelValue: [String, Number, Object],
  classText: String,
  nomeKey: {
    type: String,
    default: 'nome',
  },
  fotoKey: {
    type: String,
    default: 'foto',
  },
})

// Se resetar de fora reflete dentro do component

watch(
  () => props.modelValue,
  (v) => (model.value = v)
)

const model = ref(props.modelValue)

const attrs = useAttrs()
const componentRef = ref(null)

defineExpose({ componentRef })
</script>

<style lang="sass" scoped></style>
