<template>
  <q-popup-edit
    anchor="bottom left"
    class="w-[51.875rem] !p-12"
    v-slot="scope"
    :model-value="data"
    ref="popup"
    @show="editor.focus()"
    :persistent="true"
  >
    <p class="mb-16 text-title-5">{{ text }}</p>
    <q-editor
      ref="editor"
      v-model="scope.value"
      min-height="7rem"
      max-height="17.75rem"
      :toolbar="editorToobar()"
    />
    <div class="flex items-center gap-8 mt-8">
      <OButton
        size="lg"
        @click.stop.prevent="scope.cancel"
        class="flex-1"
        tertiary
      >
        Cancelar
      </OButton>
      <q-space class="flex-2 flex"></q-space>

      <OButton
        ref="ok"
        size="lg"
        @click="$emit('updateValue', scope.value)"
        @click.stop.prevent="scope.set"
        class="flex-1"
        primary
        :disable="scope.initialValue === scope.value"
      >
        Atualizar
      </OButton>
    </div>
  </q-popup-edit>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import { ref } from 'vue'
import editorToobar from 'src/utils/editorToolbar'
const ok = ref(null)
const editor = ref(null)
const popup = ref(null)
const emit = defineEmits(['updateValue'])
const props = defineProps({
  data: {
    type: String,
    default: '',
  },
  text: String,
})
</script>
<style lang="sass"></style>
<style lang="sass" scoped></style>
