<template>
  <div
    class="relative text-headline-3 px-12 py-6 bg-neutral-20 rounded-generic dark:bg-white/5"
    :class="classObj"
    v-ripple="editable"
  >
    <p>
      {{ value }}
    </p>
    <q-popup-edit
      v-show="editable"
      v-model="popupValue"
      v-slot="scope"
      anchor="top start"
      self="bottom start"
      class="kanban-popup-editable border border-neutral-30"
      :validate="validateFn"
    >
      <OInput
        size="md"
        v-model="scope.value"
        autofocus
        @keyup.enter.stop
        :mask="inputMask()"
      >
        <template v-slot:after>
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
  return testPattern[props.type](val)
}
const inputMask = () => {
  if (props.type === 'date') return '##/##/####'
  if (props.type === 'time') return '##h ##m'
  else return null
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
<style lang="sass" scoped>
.editavel
  cursor: pointer
  border: 1px solid transparent
  transition: .3s
  &:hover
    border-color: rgba(var(--neutral-100), 0.3)
    background: rgba(var(--neutral-30),1)

.body--dark
  .editavel
    &:hover
      border-color: rgba(var(--d-neutral-10), 0.3)
      background: rgba(var(--white), 0.2) !important
</style>
