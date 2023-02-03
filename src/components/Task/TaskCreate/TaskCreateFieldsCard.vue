<template>
  <q-form autofocus ref="form" class="fields-cards flex flex-col gap-16">
    <OInput
      v-model="model.titulo"
      label="Título * "
      size="lg"
      class="bg-white dark:!bg-transparent !p-0 label-transparent"
      required
      :rules="[(val) => val.length || '']"
      tabindex="-1"
      autofocus
    />

    <OSelectAvatar
      label="Cliente - Projeto *"
      size="lg"
      class="bg-white dark:!bg-transparent !p-0 label-transparent"
      :options="projectList"
      :modelValue="model.projeto"
      :loading="!projectList.length && projetosLoading"
      fotoKey="logo"
      option-label="nome_completo"
      nomeKey="nome_completo"
      @update-value="(value) => updateProjectSelect(value)"
      required
      :rules="[(val) => val || '']"
    >
    </OSelectAvatar>
    <!-- :rules="[(val) => val.length || '']" -->

    <OSelectAvatar
      v-if="subProjectSelectList.length"
      label="Subprojeto"
      size="lg"
      class="bg-white dark:!bg-transparent label-transparent"
      :options="subProjectSelectList"
      :modelValue="model.sub_projeto"
      :loading="!subProjectList.length"
      fotoKey="logo"
      @update-value="(value) => (model.sub_projeto = value)"
    />

    <div class="grid grid-cols-2 gap-16">
      <OSelectAvatar
        label="Responsável *"
        size="lg"
        class="bg-white dark:!bg-transparent !p-0 label-transparent"
        :options="userList"
        :modelValue="model.responsavel_task"
        :loading="!userList.length"
        nome-key="get_full_name"
        option-label="get_full_name"
        @update-value="(value) => (model.responsavel_task = value)"
        :rules="[(val) => val || '']"
      />

      <div>
        <q-tooltip v-if="chamados.length === 0" v-bind="tooltipProps"
          >Escolha um projeto para habilitar</q-tooltip
        >
        <OSelect
          :disable="chamados.length === 0"
          label="Chamado"
          size="lg"
          class="bg-white dark:!bg-transparent label-transparent"
          :options="chamados"
          v-model="model.chamado"
          @update:model-value="(value) => (model.chamado = value)"
          option-value="id"
          :loading="chamadoLoading"
          option-label="titulo"
          use-input
        >
          <template #selected-item="{ itemProps, opt }">
            <q-item v-bind="itemProps" class="translate-y-2 p-0 min-h-0">
              <p>{{ opt.titulo }}</p>
            </q-item>
          </template>
        </OSelect>
      </div>
    </div>

    <div class="flex gap-16">
      <OSelect
        use-input
        label="Grupo / Tipo"
        size="lg"
        class="bg-white dark:!bg-transparent label-transparent flex-1"
        :options="taskTypes"
        v-model="model.tipo_task"
        option-label="nome_completo"
        :loading="!taskTypes.length"
      />

      <OButton
        secondary
        class="w-[3.125rem] h-[3.125rem] bg-white dark:!bg-white/10 dark:!border-transparent dark:text-white"
        icon="svguse:/icons.svg#icon_add"
        @click="handleOpenModalAddTipoTask"
      />
    </div>

    <div class="grid grid-cols-2 gap-16">
      <div class="grid grid-cols-2 gap-16">
        <div>
          <OInputNumber
            :modelValue="model.quantidade"
            label="Quantidade"
            size="lg"
            class="bg-white dark:!bg-transparent label-transparent"
            @update-value="(value) => (model.quantidade = value)"
          ></OInputNumber>
        </div>

        <OInput
          v-model="model.tempo_estimado"
          label="Tempo estimado"
          size="lg"
          class="bg-white dark:!bg-transparent label-transparent"
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
        <div>
          <OButton
            :disable="!model.tipo_task"
            secondary
            class="bg-white h-48 w-full opaque-icon dark:!bg-white/10 dark:!border-transparent dark:text-white"
            icon="svguse:/icons.svg#icon_clock_fast"
            @click="setTempoEstimado"
          >
            Estimar
          </OButton>
          <q-tooltip v-if="!model.tipo_task" v-bind="tooltipProps"
            >Escolha um Tipo para habilitar
          </q-tooltip>
        </div>

        <div>
          <OButton
            :disable="!model.tipo_task"
            secondary
            class="bg-white h-48 w-full opaque-icon dark:!bg-white/10 dark:!border-transparent dark:text-white"
            icon="svguse:/icons.svg#icon_file_search"
            @click="handleOpenModalReferencia"
          >
            Referência
          </OButton>
          <q-tooltip v-if="!model.tipo_task" v-bind="tooltipProps"
            >Escolha um Tipo para habilitar</q-tooltip
          >
        </div>
      </div>

      <!-- <OInput
        size="lg"
        class="bg-white dark:!bg-transparent w-full cursor-pointer label-transparent"
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
                class="label-transparent"
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
          <q-icon name="svguse:/icons.svg#icon_date" class="cursor-pointer" />
        </template>
      </OInput> -->

      <OInputDateTime
        ref="inputDataInicial"
        :data="model.data_inicial_previsto"
        label="Data de inicio desejada"
        icon="today"
        @update:date="verifyDataInicial"
      />

      <OInputDateTime
        ref="inputDataDesejada"
        :data="model.entrega_data_desejada"
        label="Data de entrega desejada"
        icon="event"
        @update:date="verifyDataDesejada"
      />
    </div>
  </q-form>
</template>

<script setup>
import { date, LoadingBar } from 'quasar'
import { ref, computed, inject, watch, onMounted, nextTick } from 'vue'
import { deepUnref } from 'vue-deepunref'
import { storeToRefs } from 'pinia'

import GLOBAL from 'src/utils/GLOBAL'
import { NotifyAlert, NotifySucess } from 'src/boot/Notify'
import emitter from 'src/boot/emitter'

import OInput from 'src/components/Input/OInput.vue'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OInputNumber from 'src/components/Input/OInputNumber.vue'
import OButton from 'src/components/Button/OButton.vue'

import { useChamadoStore } from 'src/stores/chamados/chamados.store'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'
import { useProfileStore } from 'src/stores/profile/profile.store'
import { useUserStore } from 'src/stores/usuarios/user.store'
import OInputDateTime from 'src/components/Input/OInputDateTime.vue'

// ==========================================================================================

const { FTime, FData, FTimeLong } = GLOBAL
const emit = defineEmits(['update'])

const { getTasks, setTasksReference, getTaskTypes } = useTaskStore()
const { getUserById } = useUserStore()

const props = defineProps({
  taskValues: Object,
})

const form = ref(null)

// Provider lists
const projectList = inject('projetos')
const subProjectList = inject('subProjetos')
const userList = inject('usuarios')
const taskTypes = inject('taskTypes')
const { projetosLoading } = inject('loading')
const subProjectSelectList = ref([])
const popUpDate = ref(null)

const setDeliveryDateModel = computed(() => {
  const prop = props.taskValues?.entrega_data_desejada
  const today = new Date()
  const myDate = date.formatDate(prop, 'YYYY/MM/DD')
  const result = prop ? myDate : today.toDateString()
  return result
})

const setDeliveryTimeModel = computed(() => {
  const prop = props.taskValues?.entrega_data_desejada

  return prop ? date.formatDate(prop, 'HH[:]mm') : '12:00'
})

const setTimeModel = computed(() => {
  const formatedTime = FTime(props.taskValues?.tempo_estimado || '00:00:00')
  return formatedTime === '-' ? '' : formatedTime
})

const model = ref({
  titulo: props.taskValues?.titulo || '',
  projeto:
    projectList.value.filter((p) => p.id === props.taskValues?.projeto.id)[0] ||
    null,
  sub_projeto: props.taskValues?.sub_projeto || null,
  tipo_task: props.taskValues?.tipo_task || null,
  responsavel_task: props.taskValues?.responsavel_task || null,
  quantidade: props.taskValues?.quantidade || 1,
  entrega_data_desejada: props.taskValues?.entrega_data_desejada || null,
  data_inicial_previsto: props.taskValues?.data_inicial_previsto || null,
  tempo_estimado: setTimeModel.value || '00:00',
  chamado: props.taskValues?.chamado || null,
})

const inputDataInicial = ref(Element)
const inputDataDesejada = ref(Element)

function verifyDataInicial(value) {
  if (inputDataInicial.value.history.history.value.length < 2) return

  const data1 = new Date(value)
  const data2 =
    model.value.entrega_data_desejada &&
    new Date(model.value.entrega_data_desejada)

  if (!data2 || data1 < data2) {
    model.value.data_inicial_previsto = value
  } else {
    NotifyAlert('A data de inicio deve ser menor que a de entrega')
    inputDataInicial.value.history.undo()
  }
}

function verifyDataDesejada(value) {
  if (inputDataDesejada.value.history.history.value.length < 2) return

  // if (!model.value.data_inicial_previsto) {
  //   inputDataDesejada.value.history.undo()
  //   NotifyAlert('Preencha o campo Data de inicio desejada')
  //   return
  // }

  const data1 = new Date(model.value.data_inicial_previsto)
  const data2 = new Date(value)

  if (data1 < data2) {
    model.value.entrega_data_desejada = value
  } else {
    NotifyAlert('A data de entrega deve ser maior que a de inicio')
    inputDataDesejada.value.history.undo()
  }
}

// Chamado
const chamados = ref([])
const chamadoLoading = ref(false)
const { getChamado } = useChamadoStore()

async function setandGetChamados(v) {
  chamados.value = []
  chamadoLoading.value = true
  chamados.value = await getChamado(`&projeto__id=${v.id}&no_loading`, false)
  chamadoLoading.value = false
}
watch(
  () => model.value.projeto,
  async (v) => {
    model.value.chamado = null
    setandGetChamados(v)
  }
)

const isEdit = ref(false)
watch(
  () => props.taskValues,
  () => {
    isEdit.value = props.taskValues?.id
  }
)

// Formatando os dados da model para enviar pro back
watch(
  () => model,
  (v) => {
    const vl = v.value
    // const date_entrega = new Date(
    //   `${vl.entrega_data_desejada_data} ${vl.entrega_data_desejada_hora}`
    // )

    const tempo_estimado = FTimeLong(vl.tempo_estimado)
    // const entrega_data_desejada = date?.formatDate(date_entrega)

    const dadosAdicionais = {
      tempo_estimado,
      // entrega_data_desejada,
    }

    const dataObj = {
      ...deepUnref(vl),
      ...deepUnref(dadosAdicionais),
    }
    console.log(dataObj)

    emit('update', dataObj)
  },
  { deep: true }
)

// Visualizaçao do input de entrega desejada
// const deliveryDateComplete = computed(() => {
//   return `${FData(model.value.entrega_data_desejada_data)} - ${
//     model.value.entrega_data_desejada_hora
//   }`
// })

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

function setTempoEstimado() {
  if (model.value.tipo_task.tempo_medio) {
    model.value.tempo_estimado = FTime(model.value.tipo_task.tempo_medio)
    NotifySucess('Tempo Estimado Aplicado')
  } else {
    NotifyAlert('Nao há tempo estimado para este tipo de task')
  }
}

setSubProjectList()

async function handleOpenModalReferencia() {
  LoadingBar.start()

  const taskTypeId = model.value.tipo_task.id
  const tasksReference = await getTasks(`&tipo_task__id=${taskTypeId}`, false)

  LoadingBar.stop()
  if (!tasksReference.length) {
    NotifyAlert('Nao há referências para este tipo de task')
    return
  }

  emitter.emit('modal:reference:open', taskTypes.value.id)
  setTasksReference(tasksReference)
}

emitter.on('modal:reference:copy', (val) => {
  const newTime = val.split(':').slice(0, 2).join('')
  model.value.tempo_estimado = newTime
})

function handleOpenModalAddTipoTask() {
  emitter.emit('modal:tasktype:open')
}

emitter.on(`modal:tasktype:create`, (tasktype) => {
  // Selecionando tipo de task criado
  model.value.observacoes = tasktype.descricao
  model.value.tipo_task = tasktype
  getTaskTypes()
})

// ==========================================================================================
// LOGICA DO MODAL CRIACAO ==================================================================
const { projeto: selectedProject } = storeToRefs(useProjetoStore())
const { profileActive } = storeToRefs(useProfileStore())

function formatProfileActive(profile, user) {
  return {
    id: user.id,
    username: user.username,
    get_full_name: profile.nome,
    profile: {
      id: profile.id,
      foto: profile.foto,
    },
    foto: profile.foto,
  }
}

onMounted(async () => {
  if (model.value.projeto) setandGetChamados(model.value.projeto)

  if (selectedProject.value.length !== 0) {
    model.value.projeto = selectedProject.value
  }

  if (profileActive.value.id) {
    const userActive = await getUserById(profileActive.value.user)

    model.value.responsavel_task = formatProfileActive(
      profileActive.value,
      userActive
    )
  }
})

const tooltipProps = {
  anchor: 'top middle',
  self: 'bottom middle',
  offset: [10, 10],
}

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
