<template>
  <ModalCenter
    ref="modalReference"
    text="ADICIONAR TIPO DE TASK"
    title="Novo Grupo / Tipo"
  >
    <!-- @hide="handleCloseTaskTypeModal" -->
    <q-form ref="form" class="bg-neutral-10 p-24 h-full w-[600px]">
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

      <h4 class="text-paragraph-2 text-neutral-100/70 mt-16">Descrição</h4>
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
          @click="() => handleCreateTaskType()"
          primary
          icon="svguse:/icons.svg#icon_check"
        >
          Adicionar Novo Tipo
        </OButton>
      </footer>
    </q-form>
  </ModalCenter>
</template>

<script setup>
import { ref, watch, onUpdated } from 'vue'

import editorToobar from 'src/utils/editorToolbar'
import { api } from 'src/boot/axios'
import { NotifyAlert, NotifySucess } from 'src/boot/Notify'

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

// Model values
const ferramentaList = ref([])

const model = ref({
  nome: '',
  ferramenta: '',
  descricao: '',
})

const handleCloseModal = () => modalReference.value.dialogRef.hide()

async function handleCreateTaskType() {
  const valid = await form.value.validate(true)

  if (!valid) {
    NotifyAlert('Preencha os campos obrigatórios')
    return
  }

  try {
    const req = await api.post(URLS.ferramenta, model.value)

    console.log(req)
  } catch (e) {
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

emitter.on('modal:tasktype:open', () => getFerramentas())

defineExpose({ modalReference })
</script>
