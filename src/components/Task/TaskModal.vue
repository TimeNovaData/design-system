<template>
  <q-dialog v-model="dialogState" ref="dialogRef" transition-hide="slide-down">
    <q-card class="task-modal">
      <header class="modal-header">
        <div class="pl-16">
          <span class="text-caps-3 text-neutral-100/50">TASK</span>
          <h2 class="text-title-4">Telas do Hub</h2>
        </div>

        <OButton class="!w-max !h-max !p-0" size="lg" tertiary>
          <q-icon
            class="w-48 h-48"
            name="svguse:/icons.svg#icon_close"
          ></q-icon>
        </OButton>
      </header>

      <section class="p-24 grid grid-cols-2">
        <DetailCard />
      </section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'
import { ref } from 'vue'
import DetailCard from './DetailCard.vue'

const dialogState = ref(false)
const { dialogRef } = useDialogPluginComponent()
defineExpose({ dialogRef })
</script>

<style lang="sass" scoped>
@import "src/css/cores.sass"

.task-modal
  height: 95vh
  max-height: 747px
  width: 76rem
  border-radius: .375rem
  display: flex
  flex-direction: column
  background: rgb(var(--neutral-10))

  .modal-header
    display: flex
    align-items: center
    justify-content: space-between
    background: rgb(var(--primary-pure))
    padding: 1rem .5rem
</style>
