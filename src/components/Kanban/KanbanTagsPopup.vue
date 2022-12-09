<template>
  <q-popup-edit
    v-model="popupValue"
    v-slot="scope"
    anchor="top start"
    self="bottom start"
    class="kanban-popup-editable border border-neutral-30"
    :validate="validateFn"
  >
    <!--     <OInput
      size="md"
      v-model="scope.value"
      autofocus
      @keyup.enter.stop
      :mask="inputMask()"
    > -->
    <!--       <template v-slot:after> -->
    <OSelect></OSelect>
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
import { ref } from 'vue'
import OInput from 'src/components/Input/OInput.vue'
import OButton from 'src/components/Button/OButton.vue'
import { testPattern } from 'src/utils/patterns.js'
import OSelect from 'src/components/Select/OSelect.vue'

const props = defineProps({
  tags: String,
  // type: String,
  // editable: {
  //   type: Boolean,
  //   default: false,
  // },
})

const popupValue = ref(props.value)

const validateFn = (val) => {
  return testPattern[props.type](val)
}
// const inputMask = () => {
//   if (props.type === 'date') return '##/##/####'
//   if (props.type === 'time') return '##h ##m'
//   else return null
// }
</script>

<style lang="scss" scoped></style>
