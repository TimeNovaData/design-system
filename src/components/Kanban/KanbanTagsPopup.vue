<template>
  <q-popup-edit
    v-model="popupValue"
    v-slot="scope"
    anchor="top start"
    self="bottom start"
    class="kanban-popup-editable border border-neutral-30"
    :validate="validateFn"
  >
    <pre>
      <code>
        {{ scope.value.map((i) => i.nome) }}
      </code>
    </pre>
    <div class="flex w-full no-wrap flex-1 gap-4 !mt-4">
      <OButton
        size="lg"
        @click.stop.prevent="scope.cancel"
        class="w-full flex-1"
        tertiary
      >
        Cancelar
      </OButton>

      <OButton
        size="lg"
        @click.stop.prevent="scope.set"
        class="w-full flex-1"
        primary
        :disable="
          scope.validate(scope.value) === false ||
          scope.initialValue === scope.value
        "
      >
        Atualizar
      </OButton>
    </div>
    <!--     </template> -->
    <!--     </OInput> -->
  </q-popup-edit>
</template>

<script setup>
import { ref, watch } from 'vue'
import OInput from 'src/components/Input/OInput.vue'
import OButton from 'src/components/Button/OButton.vue'
import { testPattern } from 'src/utils/patterns.js'
import OSelect from 'src/components/Select/OSelect.vue'

const props = defineProps({
  tags: Array,
  value: Boolean,
  // type: String,
  // editable: {
  //   type: Boolean,
  //   default: false,
  // },
})

watch(
  () => props.tags,
  () => {
    popupValue.value = props.tags
  },
  { deep: true }
)

const popupValue = ref(props.tags)

const validateFn = (val) => {
  // return testPattern[props.type](val)
  return true
}
// const inputMask = () => {
//   if (props.type === 'date') return '##/##/####'
//   if (props.type === 'time') return '##h ##m'
//   else return null
// }
</script>

<style lang="scss" scoped></style>
