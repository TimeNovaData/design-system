<template>
  <q-dialog
    class="!border-0"
    v-model="modalEditTaskState"
    ref="dialogRef"
    transition-hide="fade"
    transition-duration="200"
    :persistent="true"
  >
    <q-card class="add-task-modal">
      <header class="modal-header">
        <div class="pl-16">
          <span class="text-caps-3 text-neutral-100/50" v-if="taskModalObj">
            EDITAR TASK
          </span>
          <span class="text-caps-3 text-neutral-100/50" v-else>
            ADICIONAR TASK
          </span>
          <h2 class="text-title-4 text-neutral-100">
            {{ taskModalObj ? taskModalObj.titulo : 'Nova Task' }}
          </h2>
        </div>

        <OButton
          class="!w-max !h-max !p-0"
          size="lg"
          tertiary
          @click="handleCloseModal"
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
          ref="taskFields"
          @update="(val) => handleUpdate(val)"
          :taskValues="taskModalObj"
          :modalIsOpen="modalEditTaskState ? 'aberto' : ''"
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

            <q-tab
              class="!flex-none md:!flex-1"
              name="chat"
              v-if="taskModalObj"
            >
              <template
                class="inline-flex items-center gap-8 text-neutral-70 dark:text-white/70"
                :class="{ 'text-neutral-100 dark:!text-white': tabs == 'chat' }"
              >
                <q-icon size="1.5rem" name="svguse:/icons.svg#icon_chat" />
                <p class="text-paragraph-1">Comentários</p>
                <OCounter
                  v-if="unref(taskModalCommentObj?.comments)?.results.length"
                  class="!w-20 !h-20 bg-neutral-100/10 text-neutral-100 dark:bg-white/10 dark:text-white"
                >
                  {{ unref(taskModalCommentObj?.comments)?.results.length }}
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
                <OCounter
                  v-if="taskModalAnexos?.length"
                  class="!w-20 !h-20 bg-neutral-100/10 text-neutral-100 dark:bg-white/10 dark:text-white"
                >
                  {{ taskModalAnexos?.length }}
                </OCounter>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tabs" animated class="flex-1">
            <div name="desc">
              <TaskCreateDescriptionCard
                :description="newTaskScope ? newTaskScope.observacoes : ''"
                @update="(val) => handleUpdate({ observacoes: val })"
              />
            </div>

            <div name="chat">
              <OChatBox
                v-if="taskModalObj"
                :comments="taskModalCommentObj?.comments"
                :sendComment="taskModalCommentObj?.sendComment"
                :getComments="taskModalCommentObj?.getComments"
                :isLoading="taskModalCommentObj?.isLoading"
              />
            </div>

            <TaskCreateAttachmentCard
              name="attach"
              :anexos="taskModalAnexos"
              :preventEv="true"
            />
          </q-tab-panels>
        </div>
      </section>

      <footer class="flex items-center justify-end gap-6 p-24 pt-14">
        <OButton
          secondary
          icon="svguse:/icons.svg#icon_close"
          @click="handleCloseModal"
        >
          Cancelar
        </OButton>

        <OButton
          v-if="taskModalObj"
          @click="() => validateOnEdit()"
          primary
          icon="svguse:/icons.svg#icon_check"
          :loading="savingTask"
        >
          Salvar Alterações
        </OButton>

        <OButton
          v-else
          @click="() => validateOnCreate()"
          primary
          icon="svguse:/icons.svg#icon_check"
          :loading="savingTask"
        >
          Adicionar Nova Task
        </OButton>
      </footer>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed, unref } from 'vue'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'
import OChatBox from 'src/components/Chat/OChatBox.vue'
import TaskCreateFieldsCard from './TaskCreateFieldsCard.vue'
import TaskCreateDescriptionCard from './TaskCreateDescriptionCard.vue'
import TaskCreateAttachmentCard from './TaskCreateAttachmentCard.vue'
import ModalConfirm from 'src/components/Modal/ModalConfirm.vue'
import OCounter from 'src/components/Counter/OCounter.vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useModalStore } from 'src/stores/modal/modal.store'
import { onBeforeRouteUpdate } from 'vue-router'
import emitter from 'src/boot/emitter'

const $q = useQuasar()

const { dialogRef } = useDialogPluginComponent()

const { handleSaveTask } = useTaskStore()
const { getTaskAnexos, closeTaskEditModal, setNewValueModal } = useModalStore()
const {
  modalEditTaskState,
  taskModalObj,
  taskModalCommentObj,
  taskModalAnexos,
} = storeToRefs(useModalStore())

const tabs = ref('desc')
const newTaskScope = ref(null)
const taskFields = ref(null)
const savingTask = ref(false)

async function validateOnCreate() {
  savingTask.value = true
  const valid = await taskFields.value.form.validate(true)
  if (valid) {
    await handleSaveTask({}, newTaskScope.value)
    dialogRef.value.hide()
  }
  savingTask.value = false
}

const handleCloseModal = () => {
  $q.dialog({
    component: ModalConfirm,
    componentProps: {
      title: 'Confirmar',
      text: 'Deseja sair sem salvar as alterações?',
      persistent: true,
    },
  }).onOk(() => {
    closeTaskEditModal()
  })
}

async function validateOnEdit() {
  savingTask.value = true
  const valid = await taskFields.value.form.validate(true)
  if (valid) {
    const { data: taskEditada } = await handleSaveTask(
      taskModalObj.value,
      newTaskScope.value
    )
    await setNewValueModal(taskEditada.id)
    dialogRef.value.hide()
  }
  savingTask.value = false
}

// Função chamada quando qualquer dado do modal for alterado
function handleUpdate(val) {
  window._blue('UPDATE')

  const dados = {
    ...taskModalObj.value,
    ...newTaskScope.value,
    ...val,
  }

  newTaskScope.value = dados
  // debugger
  // console.log(newTaskScope.value)
}

watch(
  () => newTaskScope.value?.tipo_task,
  (tipo_task, old) => {
    // !taskModalObj.value?.observacoes &&
    if (!tipo_task?.descricao) return

    if (tipo_task.descricao !== old?.descricao) {
      newTaskScope.value.observacoes = tipo_task.descricao
    }
  }
)

// Limpa o estado da task ao abrir o modal
watch(modalEditTaskState, () =>
  modalEditTaskState.value ? (newTaskScope.value = null) : ''
)

onBeforeRouteUpdate(() => {
  modalEditTaskState.value = false
})

// atualiza os anexos ao enviar e reverter
emitter.on(`filepond:task`, async () => {
  await getTaskAnexos(taskModalObj.value.id)
})

emitter.on(`filepond:task:revert`, async () => {
  await getTaskAnexos(taskModalObj.value.id)
})

defineExpose({ dialogRef })
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
