<template>
  <ModalCenter
    ref="modalReference"
    :text="isToCreate ? 'ADICIONAR TIPO DE TASK' : 'EDITAR TIPO DE TASK'"
    title="Grupo / Tipo"
  >
    <!-- @hide="handleCloseTaskTypeModal" -->
    <q-form
      ref="form"
      class="bg-neutral-10 dark:bg-d-neutral-20 p-24 h-full w-[600px]"
    >
      <OInput
        label="Nome do tipo"
        size="lg"
        class="bg-white dark:!bg-transparent !p-0 label-transparent"
        autofocus
        v-model="model.nome"
        required
        :rules="[(val) => !!val || '']"
      />

      <OSelect
        use-input
        label="Ferramenta"
        size="lg"
        class="bg-white dark:!bg-transparent label-transparent !p-0 mt-16"
        :options="ferramentaList"
        v-model="model.ferramenta"
        :loading="!ferramentaList.length"
        option-label="nome_ferramenta"
        required
        :rules="[(val) => val || '']"
      />

      <h4 class="text-paragraph-2 text-neutral-100/70 mt-16 dark:text-white/70">
        Descrição
      </h4>
      <q-editor
        max-height="none"
        class="dark:bg-d-neutral-10 mt-4"
        :toolbar="editorToobar()"
        v-model="model.descricao"
        ref="editor"
      />

      <footer class="flex items-center justify-end gap-6 mt-16">
        <OButton
          secondary
          icon="svguse:/icons.svg#icon_close"
          @click="handleCloseModal"
        >
          Cancelar
        </OButton>

        <OButton
          v-if="isToCreate"
          @click="() => handleCreateTaskType()"
          primary
          icon="svguse:/icons.svg#icon_check"
        >
          Adicionar Novo Tipo
        </OButton>

        <OButton
          v-else
          @click="() => handleEditTaskType()"
          primary
          icon="svguse:/icons.svg#icon_check"
        >
          Salvar alteração
        </OButton>
      </footer>
    </q-form>
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'

import editorToobar from 'src/utils/editorToolbar'
import { api } from 'src/boot/axios'
import { NotifyAlert, NotifyError, NotifySucess } from 'src/boot/Notify'

import ModalCenter from 'src/components/Modal/ModalCenter.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OButton from 'src/components/Button/OButton.vue'
import emitter from 'src/boot/emitter'

const { URLS } = api.defaults

// Elements ref
const modalReference = ref(null)
const editor = ref(null)
const form = ref(null)

const isToCreate = ref(null)
const taskTypeEditId = ref(null)

// Model values
const ferramentaList = ref([])

const model = ref({
  nome: '',
  ferramenta: '',
  descricao: '',
})

function handleCloseModal() {
  modalReference.value.dialogRef.hide()

  model.value = {
    nome: '',
    ferramenta: '',
    descricao: '',
  }
}

async function handleCreateTaskType() {
  const valid = await form.value.validate(true)
  if (!valid) {
    NotifyAlert('Preencha os campos obrigatórios')
    return
  }

  try {
    const { data } = await api.post(URLS.tipotask, model.value)
    emitter.emit('modal:tasktype:create', data)
    handleCloseModal()
    NotifySucess('Tipo de task criada com sucesso')
  } catch (e) {
    NotifyError('Erro ao Criar o Tipo de task')
    console.log(e)
    return e
  }
}

async function handleEditTaskType() {
  const valid = await form.value.validate(true)
  if (!valid) {
    NotifyAlert('Preencha os campos obrigatórios')
    return
  }

  try {
    const { data } = await api.patch(
      URLS.tipotask + taskTypeEditId.value + '/',
      model.value
    )
    emitter.emit('modal:tasktype:create', data)
    handleCloseModal()
    NotifySucess('Tipo de task editada com sucesso')
  } catch (e) {
    NotifyError('Erro ao Editar o Tipo de task')
    console.log(e)
    return e
  }
}

async function getFerramentas() {
  try {
    const { data } = await api.get(URLS.ferramenta)
    ferramentaList.value = data
  } catch (e) {
    console.log(e)
  }
}

function getTaskTypeValues(v) {
  if (v.method === 'post') {
    isToCreate.value = true
    return
  }

  const taskType = v.obj
  isToCreate.value = false
  taskTypeEditId.value = taskType.id

  model.value = {
    nome: taskType.nome,
    ferramenta: taskType.ferramenta,
    descricao: taskType.descricao ? taskType.descricao : '',
  }
}

emitter.on('modal:tasktype:open', (tipo_task) => {
  getTaskTypeValues(tipo_task)
  getFerramentas()
})

defineExpose({ modalReference })
</script>
