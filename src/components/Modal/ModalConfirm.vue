<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <h1>Content</h1>

      <!-- buttons example -->
      <q-card-actions align="right">
        <OButton @click="onOKClick">OK</OButton>
        <OButton @click="onDialogCancel">Cancelar</OButton>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

function onOKClick() {
  console.log('OK')
  onDialogOK()
}
</script>
