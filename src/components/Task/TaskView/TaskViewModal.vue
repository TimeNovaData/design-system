<template>
  <q-dialog
    class="!border-0"
    v-model="dialogState"
    ref="dialogRef"
    transition-hide="slide-down"
  >
    <q-card class="task-modal">
      <header class="modal-header">
        <div class="pl-16">
          <span class="text-caps-3 text-neutral-100/50">TASK</span>
          <h2 class="text-title-4 text-neutral-100">{{ data.titulo }}</h2>
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
        <div class="flex flex-col gap-16">
          <TaskViewDetailCard :details="data" />
          <TaskViewAttachmentCard :anexos="anexos" />
        </div>

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
                <OCounter
                  v-if="commentsReverse.length"
                  class="!w-20 !h-20 bg-neutral-100/10 text-neutral-100 dark:bg-white/10 dark:text-white"
                >
                  {{ commentsReverse.length }}
                </OCounter>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tabs" animated swipeable class="flex-1">
            <TaskViewDescriptionCard
              name="desc"
              :description="data.observacoes"
            />

            <OChatBox
              name="chat"
              :comments="commentsReverse"
              :sendComment="sendComment"
              :getComments="getComments"
              :isLoading="isLoading"
            />
          </q-tab-panels>
        </div>
      </section>

      <footer class="flex items-center justify-end gap-6 p-24 pt-14">
        <OButton primary icon="svguse:/icons.svg#icon_edit">
          Editar Task
        </OButton>
        <OButton
          secondary
          icon="svguse:/icons.svg#icon_close"
          @click="closeDialog"
        >
          Cancelar
        </OButton>
      </footer>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import useComments from 'src/composables/useComments'
import OButton from 'src/components/Button/OButton.vue'
import OCounter from 'src/components/Counter/OCounter.vue'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import TaskViewAttachmentCard from './TaskViewAttachmentCard.vue'
import TaskViewDetailCard from './TaskViewDetailCard.vue'
import TaskViewDescriptionCard from './TaskViewDescriptionCard.vue'

const tabs = ref('desc')
const dialogState = ref(false)
const { dialogRef } = useDialogPluginComponent()

const props = defineProps({
  data: Object,
  anexos: Array,
})

function showModal() {
  dialogState.value = true
}

const closeDialog = () => {
  dialogState.value = false
}

defineExpose({ dialogRef, showModal })

const { isLoading, commentsReverse, getComments, sendComment } =
  useComments(167)

getComments()
</script>

<style lang="sass" scoped>
@import "src/css/cores.sass"

.body--dark
  .task-modal
    background: rgb(var(--d-neutral-20))

    .q-tab--active
      color: rgb(var(--white))
      background: rgb(var(--d-neutral-10))

.task-modal
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
