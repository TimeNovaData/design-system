<template>
  <q-form autofocus ref="form" class="fields-cards flex flex-col gap-16">
    <OInput
      v-model="model.titulo"
      label="Título"
      size="lg"
      class="bg-white dark:!bg-transparent !p-0"
      required
      :rules="[(val) => val.length || '']"
      tabindex="-1"
      autofocus
    />

    <OSelectAvatar
      label="Cliente - Projeto"
      size="lg"
      class="bg-white dark:!bg-transparent !p-0"
      :options="projectList"
      :modelValue="model.projeto"
      :loading="!projectList.length"
      fotoKey="logo"
      @update-value="(value) => updateProjectSelect(value)"
      required
      :rules="[(val) => val || '']"
    />
    <!-- :rules="[(val) => val.length || '']" -->

    <OSelectAvatar
      v-if="subProjectSelectList.length"
      label="Subprojeto"
      size="lg"
      class="bg-white dark:!bg-transparent"
      :options="subProjectSelectList"
      :modelValue="model.sub_projeto"
      :loading="!subProjectList.length"
      fotoKey="logo"
      @update-value="(value) => (model.sub_projeto = value)"
    />

    <OSelect
      use-input
      label="Grupo / Tipo"
      size="lg"
      class="bg-white dark:!bg-transparent"
      :options="taskTypes"
      v-model="model.tipo_task"
      option-value="nome"
      option-label="nome"
      :loading="!taskTypes.length"
    ></OSelect>

    <div class="grid grid-cols-2 gap-16">
      <div class="grid grid-cols-2 gap-16">
        <div>
          <OInputNumber
            :modelValue="model.quantidade"
            label="Quantidade"
            size="lg"
            class="bg-white dark:!bg-transparent"
            @update-value="(value) => (model.quantidade = value)"
          ></OInputNumber>
        </div>

        <OInput
          v-model="model.tempo_estimado"
          label="Tempo estimado"
          size="lg"
          class="bg-white dark:!bg-transparent"
          mask="##h ##m"
          reverse-fill-mask
          placeholder="00h 00m"
          maxlength="7"
        >
          <template v-slot:prepend>
            <q-icon size="1.5rem" name="svguse:/icons.svg#icon_clock"></q-icon>
          </template>
        </OInput>
      </div>

      <div class="grid grid-cols-2 gap-16">
        <OButton
          secondary
          class="bg-white h-48 w-full opaque-icon dark:!bg-white/10 dark:!border-transparent dark:text-white"
          icon="svguse:/icons.svg#icon_clock_fast"
        >
          Estimar
        </OButton>

        <OButton
          secondary
          class="bg-white h-48 w-full opaque-icon dark:!bg-white/10 dark:!border-transparent dark:text-white"
          icon="svguse:/icons.svg#icon_file_search"
        >
          Referência
        </OButton>
      </div>

      <OInput
        size="lg"
        class="bg-white dark:!bg-transparent w-full cursor-pointer"
        label="Data de entrega desejada"
        v-model="deliveryDateComplete"
      >
        <q-popup-proxy
          ref="popUpDate"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="model.entrega_data_desejada_data"
            landscape
            today-btn
          >
            <div class="flex flex-col w-full">
              <OInput
                size="md"
                type="time"
                v-model="model.entrega_data_desejada_hora"
              />
              <OButton
                @click="popUpDate.hide()"
                size="md"
                tertiary
                class="mt-8 ml-auto -mb-8"
                >Fechar</OButton
              >
            </div>
          </q-date>
        </q-popup-proxy>

        <template v-slot:append>
          <q-icon
            name="svguse:/icons.svg#icon_calendar"
            class="cursor-pointer"
          />
        </template>
      </OInput>

      <OSelectAvatar
        label="Responsável"
        size="lg"
        class="bg-white dark:!bg-transparent"
        :options="userList"
        :modelValue="model.responsavel_task"
        :loading="!userList.length"
        @update-value="(value) => (model.responsavel_task = value)"
        :rules="[(val) => val || '']"
      />
    </div>
  </q-form>
</template>

<script setup>
import { date } from 'quasar'
import { ref, computed, inject, watch, onMounted } from 'vue'
import { deepUnref } from 'vue-deepunref'
import GLOBAL from 'src/utils/GLOBAL'
import OInput from 'src/components/Input/OInput.vue'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OInputNumber from 'src/components/Input/OInputNumber.vue'
import OButton from 'src/components/Button/OButton.vue'

const { FTime, FData, FTimeLong } = GLOBAL
const emit = defineEmits(['update'])

const props = defineProps({
  taskValues: Object,
})

const form = ref(null)

// Provider lists
const projectList = inject('projetos')
const subProjectList = inject('subProjetos')
const userList = inject('usuarios')
const taskTypes = inject('taskTypes')
const subProjectSelectList = ref([])
const popUpDate = ref(null)
// Model Value Setters
// const setProjectModel = computed(() => {
//   const selectedProject = projectList.value.filter(
//     (p) => p.id === props.taskValues.projeto
//   )
//   return selectedProject[0]
// })

// const setSubProjectModel = computed(() => {
//   const selectedSubProject = subProjectList.value.filter(
//     (p) => p.id === props.taskValues?.sub_projeto
//   )
//   return selectedSubProject[0]
// })

// const setTaskTypes = computed(() => {
//   const selectedTaskType = taskTypes.value.filter(
//     (p) => p.id === props.taskValues?.tipo_task
//   )
//   return selectedTaskType[0]
// })

const setDeliveryDateModel = computed(() => {
  const prop = props.taskValues?.entrega_data_desejada
  const today = new Date()
  const myDate = date.formatDate(prop, 'YYYY/MM/DD')
  const result = prop ? myDate : today.toDateString()
  return result
})

const setDeliveryTimeModel = computed(() => {
  const prop = props.taskValues?.entrega_data_desejada
  const date = new Date(prop)

  return prop ? `${date.getHours()}:${date.getMinutes()}` : '12:00'
})

const setTimeModel = computed(() => {
  const formatedTime = FTime(props.taskValues?.tempo_estimado)
  return formatedTime === '-' ? '' : formatedTime
})

const model = ref({
  titulo: props.taskValues?.titulo || '',
  projeto: props.taskValues?.projeto || null,
  sub_projeto: props.taskValues?.sub_projeto || null,
  tipo_task: props.taskValues?.tipo_task || null,
  responsavel_task: props.taskValues?.responsavel_task || null,
  quantidade: props.taskValues?.quantidade || 1,
  entrega_data_desejada_data: setDeliveryDateModel.value,
  entrega_data_desejada_hora: setDeliveryTimeModel.value,
  tempo_estimado: setTimeModel.value || '00:00',
})

// Formatando os dados da model para enviar pro back
watch(
  () => model,
  (v) => {
    window.testes = form

    const vl = v.value
    const date_entrega = new Date(
      `${vl.entrega_data_desejada_data} ${vl.entrega_data_desejada_hora}`
    )

    const tempo_estimado = FTimeLong(vl.tempo_estimado)
    const entrega_data_desejada = date
      ?.formatDate(date_entrega)
      ?.replace('.000-', '-')

    const dadosAdicionais = {
      tempo_estimado,
      entrega_data_desejada,
    }

    const dataObj = {
      ...deepUnref(vl),
      ...deepUnref(dadosAdicionais),
    }

    emit('update', dataObj)
  },
  { deep: true }
)

// Visualizaçao do input de entrega desejada
const deliveryDateComplete = computed(() => {
  return `${FData(model.value.entrega_data_desejada_data)} - ${
    model.value.entrega_data_desejada_hora
  }`
})

// Subprojeto select
const setSubProjectList = () => {
  const list = subProjectList.value.filter(
    (subProj) => subProj.caso_pai === model.value.projeto?.id
  )
  subProjectSelectList.value = list
}

function updateProjectSelect(val) {
  model.value.projeto = val
  setSubProjectList()
}

setSubProjectList()

defineExpose({ form })
</script>

<style lang="sass" scoped>
.fields-cards
  :deep(input)
    font-size: 1rem

  .q-input
    :deep(.q-field__control)
      padding-left: .75rem
      padding-right: .75rem

    &.text-center :deep(input)
      text-align: center

    &.q-field--float :deep(.q-field__label)
      max-width: none

.body--light
  .opaque-icon :deep(.q-icon)
    opacity: .4
</style>
