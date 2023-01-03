<template>
  <div class="fields-cards flex flex-col gap-16">
    <OInput
      v-model="titleModel"
      label="Título"
      size="lg"
      class="bg-white dark:!bg-transparent"
      @keyup="sendTitle"
    />

    <OSelectAvatar
      label="Cliente - Projeto / Subprojeto"
      size="lg"
      class="bg-white dark:!bg-transparent"
      :options="projectList"
      :modelValue="projectModel"
      :loading="!projectList.length"
      @update-value="(value) => (projectModel = value)"
    />

    <OSelect
      use-input
      label="Grupo / Tipo"
      size="lg"
      class="bg-white dark:!bg-transparent"
      :options="groupList"
      v-model="groupModel"
      option-value="val"
      option-label="val"
      :loading="!groupList.length"
    ></OSelect>

    <div class="grid grid-cols-2 gap-16">
      <div class="grid grid-cols-2 gap-16">
        <div>
          <OInputNumber
            :modelValue="qtdModel"
            label="Quantidade"
            size="lg"
            class="bg-white dark:!bg-transparent"
            @update-value="(value) => (qtdModel = value)"
          ></OInputNumber>
        </div>

        <OInput
          v-model="timeModel"
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
        @keydown.prevent
      >
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="deliveryDateModel" landscape>
            <OInput size="md" type="time" v-model="deliveryTimeModel" />
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
        :modelValue="respModel"
        :loading="!userList.length"
        @update-value="(value) => (respModel = value)"
      />
    </div>
  </div>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import { ref, computed, inject } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import OSelect from 'src/components/Select/OSelect.vue'
import OButton from 'src/components/Button/OButton.vue'
import OInputNumber from 'src/components/Input/OInputNumber.vue'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'

const { FTime, FData } = GLOBAL

const props = defineProps({
  taskValues: Object,
})

// Model Values Setters
const setProjectModel = () => {
  const selectedProject = projectList.value.filter(
    (p) => p.nome === props.taskValues.nome_projeto
  )
  return selectedProject[0]
}

const setTimeModel = () => {
  const formatedTime = FTime(props.taskValues.tempo_estimado)
  return formatedTime === '-' ? '' : formatedTime
}

const setDeliveryTimeModel = () => {
  const date = new Date(props.taskValues.entrega_data_desejada)
  return `${date.getHours()}:${date.getMinutes()}`
}

const setDeliveryDateModel = () => {
  const today = new Date()
  const date = new Date(props.taskValues.entrega_data_desejada)
  return FData(date.toDateString()) || today.toDateString()
}

// Options
const projectList = inject('projetos')
const userList = inject('usuarios')
const groupList = [{ val: 'Google' }, { val: 'Apple' }, { val: 'Oracle' }]

// Models
const titleModel = ref(props.taskValues.titulo || '')
const projectModel = ref(setProjectModel() || null)
const groupModel = ref('')
const respModel = ref(props.taskValues.responsavel || null)

const qtdModel = ref(props.taskValues.quantidade || 1)
const timeModel = ref(setTimeModel() || '00:00')

const deliveryDateModel = ref(setDeliveryDateModel()) // Data de entrega desejada
const deliveryTimeModel = ref(setDeliveryTimeModel() || '12:00')
const deliveryDateComplete = computed(() => {
  return `${deliveryDateModel.value} - ${deliveryTimeModel.value}`
})

const emit = defineEmits(['getTitle'])

function sendTitle(e) {
  emit('getTitle', FTime(props.taskValues.tempo_estimado))
}
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
