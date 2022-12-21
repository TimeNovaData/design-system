<template>
  <div
    class="relative text-headline-3 px-12 py-6 bg-neutral-20 rounded-generic dark:bg-white/5"
    :class="classObj"
    :tabindex="`${editable ? 0 : null}`"
  >
    {{ value }}
    <slot></slot>

    <q-popup-edit
      v-if="editable"
      v-model="popupValue"
      v-slot="scope"
      :model-value="popupValue"
      anchor="top start"
      self="bottom start"
      class="kanban-popup-editable border border-neutral-30"
      :validate="validateFn"
      :class="popupClass"
      tabindex="1"
    >
      <OInput
        size="md"
        v-model="scope.value"
        autofocus
        @keyup.enter.stop
        :mask="inputMask()"
        tabindex="2"
        :placeholder="type === 'date' ? 'DD/MM/AAAA' : null"
      >
        <template v-slot:after>
          <div class="flex w-full no-wrap flex-1 gap-4 !mt-4">
            <OButton
              size="lg"
              @click.stop.prevent="scope.cancel"
              class="w-full flex-1"
              tertiary
              tabindex="4"
            >
              Cancelar
            </OButton>

            <OButton
              size="lg"
              @click="$emit('update', scope.value)"
              @click.stop.prevent="scope.set"
              class="w-full flex-1"
              primary
              :disable="
                scope.validate(scope.value) === false ||
                scope.initialValue === scope.value
              "
              tabindex="3"
            >
              Atualizar
            </OButton>
          </div>
        </template>
      </OInput>
    </q-popup-edit>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OInput from 'src/components/Input/OInput.vue'
import OButton from 'src/components/Button/OButton.vue'
import { testPattern } from 'src/utils/patterns.js'

const props = defineProps({
  value: String,
  type: String,
  popupClass: String,
  notFormat: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
})

const classObj = {
  editavel: props.editable,
}

const popupValue = ref(props.value)

const validateFn = (val) => {
  if (!props.type || props.notFormat) return true
  return testPattern[props.type](val)
}

const inputMask = () => {
  if (props.type === 'date') return '##/##/####'
  if (props.type === 'time') return '##h##m'
  else return ''
}
</script>
<style lang="sass">
.kanban-popup-editable
  padding: 4px !important
  min-height: max-content !important
  height: max-content !important
  .q-field
    padding: 0

  label.o-input
    display: flex
    flex-direction: column

  .q-field__control
    border-top: initial !important
    border-left: initial !important
    border-right: initial !important
  .q-field__after
    width: 100%
    margin: initial
    padding: 0
    margin-top: 0
  .q-field__marginal
    height: 100% !important
</style>
<style lang="sass" scoped></style>
