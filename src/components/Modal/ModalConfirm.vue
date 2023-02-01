<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin p-16">
      <!-- <header class="modal-header"></header> -->
      <h1 class="text-headline-1 mb-16">{{ title }}</h1>

      <p class="text-paragraph-2 mb-16">{{ text }}</p>

      <div class="flex items-center gap-8 justify-end">
        <OButton
          size="md"
          secondary
          @click="onDialogCancel"
          class="!min-w-[100px]"
        >
          Cancelar
        </OButton>
        <OButton size="md" primary @click="onDialogOK" class="!min-w-[100px]">
          Confirmar
        </OButton>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const props = defineProps({
  title: String,
  text: String,
})

defineEmits([...useDialogPluginComponent.emits])
</script>
