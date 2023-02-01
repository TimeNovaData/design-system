<template>
  <q-dialog ref="dialogRef">
    <q-card class="q-dialog-plugin dark:bg-d-neutral-10">
      <header
        class="flex items-center bg-primary-pure py-16 px-24 text-title-4 text-neutral-100"
      >
        {{ title }}
      </header>

      <div class="p-24 flex flex-col justify-between min-h-160">
        <p
          class="text-paragraph-2 text-neutral-100/80 dark:text-white/70"
          v-html="text"
        ></p>

        <div class="flex items-center justify-end gap-8 mt-48">
          <OButton
            size="md"
            secondary
            @click="onDialogCancel"
            class="dark:bg-d-neutral-40 dark:!border-transparent !px-14"
          >
            Cancelar
          </OButton>
          <OButton size="md" primary @click="onDialogOK" class="!px-14">
            Confirmar
          </OButton>
        </div>
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
