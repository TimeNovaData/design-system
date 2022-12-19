<template>
  <q-popup-edit
    anchor="top left"
    class="w-[800px]"
    v-slot="scope"
    :model-value="data"
    tabindex="1"
  >
    <q-editor v-model="scope.value" min-height="5rem" />
    <div class="flex items-center gap-8 mt-8">
      <OButton
        size="lg"
        @click.stop.prevent="scope.cancel"
        class="w-full flex-1"
        tertiary
        tabindex="3"
      >
        Cancelar
      </OButton>

      <OButton
        size="lg"
        @click="$emit('updateValue', scope.value)"
        @click.stop.prevent="scope.set"
        class="w-full flex-[2]"
        primary
        :disable="scope.initialValue === scope.value"
        tabindex="2"
      >
        Atualizar
      </OButton>
    </div>
  </q-popup-edit>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'

const emit = defineEmits(['updateValue'])
const props = defineProps({
  data: {
    type: String,
    default: '',
  },
})
</script>
<style lang="sass"></style>
<style lang="sass" scoped></style>
