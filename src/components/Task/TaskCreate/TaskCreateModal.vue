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
          <span class="text-caps-3 text-neutral-100/50" v-if="taskTitle">
            EDITAR TASK
          </span>
          <span class="text-caps-3 text-neutral-100/50" v-else>
            ADICIONAR TASK
          </span>
          <h2 class="text-title-4 text-neutral-100">
            {{ taskTitle ? taskTitle : 'Nova Task' }}
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
        <TaskCreateFieldsCard
          @update="(val) => handleUpdate(val)"
          :taskValues="taskScope"
        />

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
                />
                <p class="text-paragraph-1">Descrição</p>
              </template>
            </q-tab>

            <q-tab class="!flex-none md:!flex-1" name="chat" v-if="taskTitle">
              <template
                class="inline-flex items-center gap-8 text-neutral-70 dark:text-white/70"
                :class="{ 'text-neutral-100 dark:!text-white': tabs == 'chat' }"
              >
                <q-icon size="1.5rem" name="svguse:/icons.svg#icon_chat" />
                <p class="text-paragraph-1">Comentários</p>
                <OCounter
                  class="!w-20 !h-20 bg-neutral-100/10 text-neutral-100 dark:bg-white/10 dark:text-white"
                >
                  {{ commentsReverse.length }}
                </OCounter>
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
                />
                <p class="text-paragraph-1">Anexos</p>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tabs" animated swipeable class="flex-1">
            <TaskCreateDescriptionCard
              name="desc"
              :description="taskScope.value?.observacoes"
            />
            <OChatBox
              v-if="taskTitle"
              name="chat"
              :comments="commentsReverse"
              :sendComment="sendComment"
              :getComments="getComments"
              :isLoading="isLoading"
            />
            <TaskCreateAttachmentCard name="attach" />
          </q-tab-panels>
        </div>
      </section>

      <footer class="flex items-center justify-end gap-6 p-24 pt-14">
        <OButton
          secondary
          icon="svguse:/icons.svg#icon_close"
          @click="closeDialog"
        >
          Cancelar
        </OButton>

        <OButton
          @click="handleSave"
          primary
          icon="svguse:/icons.svg#icon_check"
        >
          <span v-if="taskTitle">Salvar Alterações</span>
          <span v-else>Adicionar Nova Task</span>
        </OButton>
      </footer>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import useComments from 'src/composables/useComments'
import OButton from 'src/components/Button/OButton.vue'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import TaskCreateFieldsCard from './TaskCreateFieldsCard.vue'
import TaskCreateDescriptionCard from './TaskCreateDescriptionCard.vue'
import TaskCreateAttachmentCard from './TaskCreateAttachmentCard.vue'
import OCounter from 'src/components/Counter/OCounter.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { deepUnref } from 'vue-deepunref'
import { api } from 'src/boot/axios'

const { URLS } = api.defaults

const props = defineProps({
  taskObject: Object,
})

const taskScope = ref(props.taskObject)
watch(
  () => props.taskObject,
  () => {
    window._yellow('Mudou taskScope')
    taskScope.value = props.taskObject
  }
)

watch(
  () => taskScope,
  () => {
    window._yellow('Mudou taskTitle')
    taskTitle.value = taskScope.value.titulo
  },
  { deep: true }
)

const tabs = ref('desc')
const taskTitle = ref(taskScope.value.titulo)

const dialogState = ref(false)
const { dialogRef } = useDialogPluginComponent()

function showModal() {
  dialogState.value = true
}

const closeDialog = () => {
  dialogState.value = false
}

function handleUpdate(val) {
  taskScope.value = { ...taskScope.value, ...val }
  console.log('handleUpdate', { ...taskScope.value, ...val })
}

async function handleSave() {
  const diff = GLOBAL.compareAndReturnDiff(props.taskObject, taskScope.value)
  const data = { ...deepUnref(diff) }

  const req = await api.patch(URLS.task + props.taskObject.id + '/', data)
  console.log(req)
}

const { isLoading, commentsReverse, getComments, sendComment } = useComments(
  props.taskObject.id
)

defineExpose({ dialogRef, showModal })
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
