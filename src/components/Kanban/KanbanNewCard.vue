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
    <q-form>
      <OSelect
        ref="select"
        v-model="newCardData.projeto"
        use-input
        size="md"
        behavior="menu"
        option-value="id"
        option-label="nome"
        :options="projetos"
        label="Projeto"
        :auto-save="true"
        class="mb-10"
        :rules="[(val) => !!val]"
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
                <p class="!text-neutral-70 dark:!text-white/90">
                  {{ opt.nome }}
                </p>
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

      <OSelect
        v-if="newCardData.projeto?.tem_subprojetos"
        ref="selectSubprojeto"
        v-model="newCardData.subProjetos"
        use-input
        size="md"
        behavior="menu"
        option-value="id"
        option-label="nome"
        :options="subProjetosProjetoAtivo"
        label="Subprojeto"
        :auto-save="true"
        class="mb-10 -mt-16"
        :rules="[(val) => !!val]"
        @update:model-value="() => input.componentRef.focus()"
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
                <p class="!text-neutral-70 dark:!text-white/90">
                  {{ opt.nome }}
                </p>
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
        primary
        class="new-card-input -mt-16 -mb-16"
        v-model="newCardData.titulo"
        ref="input"
        placeholder="Titulo do chamado"
        @keyup.enter="handleFocusOut"
        :rules="[(val) => !!val]"
      ></OInput>

      <!-- <div class="flex items-center gap-8 mt-8 justify-end">
      <OButton size="md" tertiary icon="close" @click="$emit('closeClick')">
      </OButton>
      <OButton class="!min-w-[100px]" size="md" primary :disable="!chamadoValid"
        >Criar
      </OButton>
    </div> -->
    </q-form>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { ref, onMounted, inject, computed, nextTick, watch } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { Notify } from 'quasar'

const emit = defineEmits(['digitandoNome', 'create', 'invalid'])

const card = ref(null)
const input = ref(null)
const select = ref(null)
const selectSubprojeto = ref(null)

const projetos = inject('projetos')
const subProjetos = inject('subProjetos')

const subProjetosProjetoAtivo = computed(() =>
  subProjetos.value.filter((p) => p.caso_pai === newCardData.value.projeto.id)
)

const props = defineProps({
  colData: Object,
})

const newCardData = ref({
  titulo: '',
  projeto: '',
  subProjetos: '',
  fase: null,
})

const chamadoValid = computed(
  () => !!(newCardData.value.titulo.length && newCardData.value.projeto)
)

async function handleChangeSelect() {
  if (newCardData.value.projeto?.tem_subprojetos) {
    await nextTick()
    selectSubprojeto.value.componentRef.focus()
    selectSubprojeto.value.componentRef.showPopup()
  } else {
    input.value.componentRef.focus()
  }
}
function handleFocusOut() {
  if (chamadoValid.value) {
    newCardData.value.fase = props.colData.id
    emit('create', newCardData.value)
    Notify.create({
      message: `Chamado Criado com sucesso`,
      position: 'top-right',
      timeout: 1000,
    })
  } else {
    emit('invalid')
    newCardData.value = { titulo: '', projeto: '', id: null }
    Notify.create({
      type: 'error',
      message: `Chamado Invalido`,
      position: 'top-right',
      timeout: 1000,
    })
  }
}

onMounted(() => {
  // card.value.$el.querySelector('').addEventListener('input', autoGrow)
  select.value.componentRef.focus()
  select.value.componentRef.showPopup()
})
</script>

<style lang="sass" scoped>
.kanban-new-card
  display: flex
  flex-direction: column
  // .new-card-input :deep(.q-field__native)
  //   padding-top: .5rem
  //   height: auto
  //   min-height: 28px
  //   max-height: 190px
  //   resize: none
</style>
