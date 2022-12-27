<template>
  <q-dialog v-model="dialogState" ref="dialogRef" transition-hide="slide-down">
    <q-card class="task-modal">
      <header class="modal-header">
        <div class="pl-16">
          <span class="text-caps-3 text-neutral-100/50">TASK</span>
          <h2 class="text-title-4 text-neutral-100">{{ data.nome_chamado }}</h2>
        </div>

        <OButton
          class="!w-max !h-max !p-0"
          size="lg"
          tertiary
          @click="closeDialog"
        >
          <q-icon
            class="w-48 h-48 dark:text-neutral-100"
            name="svguse:/icons.svg#icon_close"
          ></q-icon>
        </OButton>
      </header>

      <section class="p-24 grid grid-cols-2 gap-16">
        <div class="flex flex-col gap-16">
          <DetailCard :details="data" />
          <AttachmentCard :data="data" />
        </div>

        <div class="flex flex-col">
          <q-tabs v-model="tabs" active-color="neutral-100">
            <q-tab class="!flex-none" name="desc">
              <template
                class="inline-flex items-center gap-8 text-neutral-70"
                :class="{ 'text-neutral-100': tabs == 'desc' }"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_description"
                ></q-icon>
                <p class="text-paragraph-1">Descrição</p>
                <OCounter
                  class="!w-20 !h-20 bg-neutral-100/10 text-neutral-100"
                >
                  1
                </OCounter>
              </template>
            </q-tab>

            <q-tab class="!flex-none" name="chat">
              <template
                class="inline-flex items-center gap-8 text-neutral-70"
                :class="{ 'text-neutral-100': tabs == 'chat' }"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_chat"
                ></q-icon>
                <p class="text-paragraph-1">Comentários</p>
                <OCounter
                  class="!w-20 !h-20 bg-neutral-100/10 text-neutral-100"
                >
                  7
                </OCounter>
              </template>
            </q-tab>
          </q-tabs>

          <DescriptionCard v-if="tabs == 'desc'" />
        </div>
      </section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'
import { ref } from 'vue'
import OCounter from 'src/components/Counter/OCounter.vue'
import AttachmentCard from './AttachmentCard.vue'
import DetailCard from './DetailCard.vue'
import DescriptionCard from './DescriptionCard.vue'

const dialogState = ref(false)
const { dialogRef } = useDialogPluginComponent()

const closeDialog = () => {
  dialogState.value = false
}

const props = defineProps({
  data: Object,
})

const tabs = ref('desc')

defineExpose({ dialogRef })
</script>

<style lang="sass" scoped>
@import "src/css/cores.sass"

.body--dark
  .task-modal
    background: rgb(var(--d-neutral-20))

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
