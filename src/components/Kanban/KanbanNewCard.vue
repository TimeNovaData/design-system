<template>
  <q-card
    class="kanban-new-card shadow-md p-8 dark:bg-d-neutral-40 hover:cursor-pointer overflow-hidden mx-8"
    ref="card"
  >
    <p
      class="text-neutral-70 dark:text-white/70 flex items-center justify-between text-paragraph-3 mb-10"
    >
      Novo Chamado
    </p>

    <OSelect
      ref="select"
      v-model="newCardData.projeto"
      use-input
      size="md"
      behavior="menu"
      option-value="id"
      option-label="nome"
      :options="projetoAndSubProjetoOptions"
      label="Projeto"
      :auto-save="true"
      class="mb-10"
      @update:model-value="handleChangeSelect"
    >
      <template #option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label class="flex items-center gap-8">
              <q-badge
                rounded
                class="shrink-0 w-8 h-8"
                :style="{ background: opt.cor_letra }"
              ></q-badge>
              <p class="!text-neutral-70 dark:!text-white/90">{{ opt.nome }}</p>
            </q-item-label>
          </q-item-section>
          <q-item-section side class="!w-56 opacity-0">
            <q-toggle
              size="sm"
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
          </q-item-section>
        </q-item>
      </template>
    </OSelect>

    <OInput
      size="md"
      type="textarea"
      primary
      class="!min-h-40 new-card-input"
      v-model="newCardData.titulo"
      rows="0"
      ref="input"
      placeholder="Titulo do chamado"
      @focusout="handleFocusOut"
    ></OInput>

    <!-- <div class="flex items-center gap-8 mt-8 justify-end">
      <OButton size="md" tertiary icon="close" @click="$emit('closeClick')">
      </OButton>
      <OButton class="!min-w-[100px]" size="md" primary :disable="!chamadoValid"
        >Criar
      </OButton>
    </div> -->
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { ref, onMounted, inject, computed } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'

const emit = defineEmits(['digitandoNome', 'create', 'invalid'])

const card = ref(null)
const input = ref(null)
const select = ref(null)

const projetoAndSubProjetoOptions = inject('projetoAndSubProjetoOptions')

const props = defineProps({
  colData: Object,
})
const newCardData = ref({
  titulo: '',
  projeto: '',
  fase: null,
})

const chamadoValid = computed(
  () => newCardData.value.titulo && newCardData.value.projeto
)

function autoGrow({ currentTarget }) {
  currentTarget.style.height = '18px'
  currentTarget.style.height = currentTarget.scrollHeight + 'px'
  emit('digitandoNome')
}

function handleChangeSelect() {
  input.value.componentRef.focus()
}
function handleFocusOut() {
  if (!chamadoValid.value) {
    emit('invalid')
    newCardData.value = { titulo: '', projeto: '', id: null }
  } else {
    newCardData.value.fase = props.colData.id
    emit('create', newCardData.value)
  }
}

onMounted(() => {
  card.value.$el.querySelector('textarea').addEventListener('input', autoGrow)
  select.value.componentRef.focus()
  select.value.componentRef.showPopup()
})
</script>

<style lang="sass" scoped>
.kanban-new-card
  display: flex
  flex-direction: column
  .new-card-input :deep(.q-field__native)
    padding-top: .5rem
    height: auto
    min-height: 60px
    max-height: 190px
    resize: none
</style>
