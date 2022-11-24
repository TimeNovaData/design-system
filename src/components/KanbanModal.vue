<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" transition-hide="slide-down">
    <q-card class="kanban-modal q-dialog-plugin remove-styles">
      <header class="bg-neutral-30 dark:bg-d-neutral-20">
        <div>
          <div class="text-title-2 px-24 pt-24 pb-6 flex items-center gap-12">
            <q-icon class="w-24 h-24" name="svguse:/icons.svg#icon_screen"></q-icon>
            <p class="">BUGS e melhorias gerais já priorizadas</p>
          </div>
          <div class="flex items-center ml-[2.25rem] gap-12 px-24">
            <p>Squad Logbit</p>
            <OBadge size="sm" :badge="false" bg="--d-success" square class="">
              <template #content>
                <p class="text-center mx-auto">Assessment coolers</p>
              </template>
            </OBadge>
          </div>
        </div>
  
        <q-tabs v-model="tab" class="text-neutral-100 dark:text-white/90 text-paragraph-2 w-max mt-24 px-24"
          active-color="primary-pure" secondary>
          <q-tab :ripple="false" name="info" label="Informações gerais"></q-tab>
          <q-tab :ripple="false" name="tarefas" label="Tarefas"></q-tab>
          <q-tab :ripple="false" name="anexos" label="Anexos"></q-tab>
          <q-tab :ripple="false" name="chat" label="Chat"></q-tab>
        </q-tabs>
      </header>
  
      <q-tab-panels v-model="tab" animated class="flex-1 h-full">
        <q-tab-panel name="info">
          <article class="grid grid-cols-[minmax(560px,1fr),minmax(_256px,1fr)] gap-16">
            <div>
              <div class="inline-flex gap-4 text-neutral-70 dark:text-white/70">
                <q-icon size="20px" name="svguse:/icons.svg#icon_tags"></q-icon>
                <p class="text-paragraph-2">Tags</p>
              </div>
  
              <div class="flex gap-8 flex-wrap mt-6">
                <OBadge size="lg" v-for="item in 9" :badge="true" :key="item" bg="--alert-warning"
                  class="rounded-generic h-32">
                  <template #content>
                    <p class="text-center mx-auto" square>Tag</p>
                  </template>
                </OBadge>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="flex flex-col ">
                <div class="inline-flex gap-4 text-neutral-70 dark:text-white/70">
                  <q-icon size="20px" name="svguse:/icons.svg#icon_user"></q-icon>
                  <p class="text-paragraph-2">Solicitante</p>
                </div>
                <div class="mt-6">
                  <q-avatar size="32px" class="w-32 h-32" :style="`right: ${n * 25}px`">
                    <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
                  </q-avatar>
                </div>
              </div>
              <div class="relative">
                <div class="inline-flex gap-4 text-neutral-70 dark:text-white/70">
                  <q-icon size="20px" name="svguse:/icons.svg#icon_user"></q-icon>
                  <p class="text-paragraph-2">Responsáveis</p>
                </div>
                <div class="">
                  <q-avatar v-for="n in 3" :key="n" size="32px"
                    class="overlapping w-32 h-32 absolute border-white border-2 dark:border-d-neutral-10 overflow-hidden"
                    :style="`left: ${n * 25 - 25}px`">
                    <img :src="`https://cdn.quasar.dev/img/avatar${
                      n + 1
                    }.jpg`" />
                  </q-avatar>
                </div>
              </div>
            </div>
          </article>
        </q-tab-panel>
  
        <q-tab-panel name="tarefas">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
  
        <q-tab-panel name="anexos">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="chat">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sijjt amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import OButton from './OButton.vue'
import { ref } from 'vue'
import OBadge from './OBadge.vue'
const tab = ref('info')
const props = defineProps({
  // ...your custom props
})

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

defineExpose({ dialogRef })
</script>

<style lang="sass" scoped>
.body--dark
  .q-tab--active
    background: rgb(var(--d-neutral-30)) !important
    color: white !important
    border-color: rgba(var(--white),0.05)
</style>
<style lang="sass">

:root
  --kanban-modal-bg: rgb(var(--neutral-10))
.body--dark
  --kanban-modal-bg: rgb(var(--d-neutral-30))

.kanban-modal
  height: 95vh
  width: 880px
  background: var(--kanban-modal-bg)
  border-radius: 6px
  overflow: hidden
  display: flex
  flex-direction: column
</style>
