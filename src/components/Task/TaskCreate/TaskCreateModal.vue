<template>
  <q-dialog
    class="!border-0"
    v-model="dialogState"
    ref="dialogRef"
    transition-hide="slide-down"
  >
    <q-card class="add-task-modal">
      <header class="modal-header">
        <div class="pl-16">
          <span class="text-caps-3 text-neutral-100/50">ADICIONAR TASK</span>
          <h2 class="text-title-4 text-neutral-100">
            {{ taskTitle === '' ? 'Nova Task' : taskTitle }}
          </h2>
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

      <section
        class="flex-1 p-24 pb-2 grid grid-cols-2 gap-16 md:flex md:flex-col md:overflow-y-auto"
      >
        <TaskCreateFieldsCard @getTitle="updateTitle" />

        <div class="flex flex-col">
          <q-tabs v-model="tabs" active-color="neutral-100">
            <q-tab class="!flex-none md:!flex-1" name="desc">
              <template
                class="inline-flex items-center gap-8 text-neutral-70 dark:text-white/70"
                :class="{ 'text-neutral-100 dark:!text-white': tabs == 'desc' }"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_description"
                ></q-icon>
                <p class="text-paragraph-1">Descrição</p>
              </template>
            </q-tab>

            <q-tab class="!flex-none md:!flex-1" name="chat">
              <template
                class="inline-flex items-center gap-8 text-neutral-70 dark:text-white/70"
                :class="{ 'text-neutral-100 dark:!text-white': tabs == 'chat' }"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_chat"
                ></q-icon>
                <p class="text-paragraph-1">Comentários</p>
              </template>
            </q-tab>

            <q-tab class="!flex-none md:!flex-1" name="attach">
              <template
                class="inline-flex items-center gap-8 text-neutral-70 dark:text-white/70"
                :class="{
                  'text-neutral-100 dark:!text-white': tabs == 'attach',
                }"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_attachment"
                ></q-icon>
                <p class="text-paragraph-1">Anexos</p>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tabs" animated swipeable class="flex-1">
            <TaskCreateDescriptionCard name="desc" description="" />
            <OChatBox name="chat" comments sendComment getComments isLoading />
            <TaskCreateAttachmentCard name="attach" />
          </q-tab-panels>
        </div>
      </section>

      <footer class="flex items-center justify-end gap-6 p-24 pt-14">
        <OButton secondary icon="svguse:/icons.svg#icon_close">
          Cancelar
        </OButton>
        <OButton primary icon="svguse:/icons.svg#icon_check">
          Adicionar Nova Task
        </OButton>
      </footer>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import TaskCreateFieldsCard from './TaskCreateFieldsCard.vue'
import TaskCreateDescriptionCard from './TaskCreateDescriptionCard.vue'
import TaskCreateAttachmentCard from './TaskCreateAttachmentCard.vue'

const tabs = ref('desc')
const taskTitle = ref('')
const dialogState = ref(false)
const { dialogRef } = useDialogPluginComponent()

const closeDialog = () => {
  dialogState.value = false
}

defineExpose({ dialogRef })

function updateTitle(value) {
  taskTitle.value = value
}
</script>

<style lang="sass" scoped>
@import "src/css/cores.sass"

.body--dark
  .add-task-modal
    background: rgb(var(--d-neutral-20))

    .q-tab--active
      color: rgb(var(--white))
      background: rgb(var(--d-neutral-10))

.add-task-modal
  height: auto
  max-height: 95vh
  min-height: clamp(500px,95vh,747px)
  width: 76rem
  border-radius: .375rem
  display: flex
  flex-direction: column
  background: rgb(var(--neutral-10))
  overflow: hidden

  .modal-header
    display: flex
    align-items: center
    justify-content: space-between
    background: rgb(var(--primary-pure))
    padding: 1rem .5rem
    height: 5rem

  :deep(.detail-card)
    height: var(--detail-height)
    overflow: hidden
  // :deep(.attachment-card)
  //   height: calc()

  .q-card
    border: 1px solid rgba(1, 7, 27, 0.1)
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06)
</style>
