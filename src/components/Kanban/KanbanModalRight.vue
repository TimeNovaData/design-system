<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-hide="slide-right"
    transition-show="slide-left"
    v-model="dialogState"
    class="kanban-modal-right"
  >
    <q-card class="q-dialog-plugin remove-styles content p-16">
      <q-list class="gap-4 flex flex-col">
        <q-item dense class="p-0">
          <q-item-section>
            <p class="text-headline-3">Visualização</p>
          </q-item-section>
        </q-item>

        <q-item
          tag="label"
          dense
          class="flex-row items-center !h-40 rounded-generic user-select-none px-8"
        >
          <div class="flex items-center gap-4">
            <q-icon size="1.5rem" name="visibility"></q-icon>
            <p class="text-paragraph-2">Visao Expandida</p>
          </div>
          <q-space></q-space>
          <q-toggle v-model="visaoExpandida"></q-toggle>
        </q-item>

        <q-item
          tag="label"
          dense
          class="flex-row items-center !h-40 rounded-generic user-select-none px-8"
        >
          <div class="flex items-center gap-4">
            <q-icon size="1.5rem" name="blur_on"></q-icon>
            <div>
              <p class="text-paragraph-2">Blur Mode</p>
            </div>
            <small class="text-neutral-100/60 dark:text-white/40 ml-8"
              >Experimental</small
            >
          </div>
          <q-space></q-space>
          <q-toggle v-model="blurMode"></q-toggle>
        </q-item>

        <q-item dense class="flex flex-col p-0 mt-16">
          <p class="text-paragraph-2 shrink-0 mb-4">Background URL</p>
          <q-space></q-space>
          <OInput size="sm" v-model="kanbanBG"></OInput>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { storeToRefs } from 'pinia'
import { useBlurMode } from 'src/stores/blurMode'
import OInput from 'src/components/Input/OInput.vue'

const blur = useBlurMode()
const kanbanBG = inject('kanbanBG')
const { blurMode } = storeToRefs(blur)

const dialogState = ref(false)
const props = defineProps({})

const visaoExpandida = inject('visaoExpandida')

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide } = useDialogPluginComponent()

watch(dialogState, () => {
  console.log(dialogState.value)
})

defineExpose({ dialogRef })
</script>

<style lang="sass">
.kanban-modal-right
  .q-dialog__backdrop
    opacity: 0 !important
  .q-dialog__inner
    justify-content: flex-end
    padding: 0 !important
  .content
    height: 100vh !important
    // margin-top: var(--top-size)
    max-height: initial !important
    width: 350px
    background: rgb(var(--d-neutral-20))
    border-radius: 3px 0 0 3px
    overflow: hidden
    display: flex
    flex-direction: column


.body--light
  .kanban-modal-right
    .content
      background: rgb(var(--white))


// .kanban-modal-separator
//   height: 1px
//   width: 100%
//   background: rgba(var(--neutral-100), 0.1)
//   margin: 1rem 0
//   border: 0
//   display: block
//   .body--dark &
//     background: rgba(var(--white), 0.05)


// .grid-info
//    display: grid
//    grid-template-columns: minmax(560px,1fr) minmax( 256px,1fr)
//    column-gap: 1rem
</style>
