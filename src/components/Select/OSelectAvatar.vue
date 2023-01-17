<template>
  <OSelect
    v-model="model"
    class="select-avatar"
    :class="{ 'have-model': model }"
    option-value="id"
    option-label="nome"
    ref="componentRef"
    use-input
    @update:model-value="(value) => $emit('updateValue', value)"
    :popup-content-class="popupClass"
    v-bind="attrs"
  >
    <!-- 
     {
                "id": 2,
                "username": "emanuel2",
                "get_full_name": "emanuel morais",
                "profile": {
                    "id": 7,
                    "foto": "http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg"
                }
            }
   -->
    <template #option="{ itemProps, opt }">
      <q-item v-bind="itemProps" class="px-4" :key="opt.id">
        <OAvatar
          :nome="opt[nomeKey]"
          :foto="opt[fotoKey]"
          classAvatar="!w-[1.25em] !h-[1.25em]"
        />
      </q-item>
    </template>

    <template #selected-item="{ itemProps, opt }">
      <q-item v-bind="itemProps" class="translate-y-2 p-0 min-h-0">
        {{ itemProps }}
        <OAvatar
          v-show="opt[nomeKey]"
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
  popupClass: {
    type: String,
    default: 'select-menu',
  },
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

<style lang="sass" scoped>
.select-avatar
  :deep(.q-placeholder)
    opacity: 0 !important
  &.have-model
    :deep(.q-placeholder)
      opacity: 1 !important
</style>
