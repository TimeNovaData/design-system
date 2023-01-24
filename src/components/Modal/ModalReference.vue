<template>
  <ModalCenter
    ref="modalReference"
    text="REFERENCIA"
    title="Escolha uma Task de Referência para Clonar o Tempo Estimado"
    @hide="handleCloseReferenceModal"
  >
    <OTableBase
      :rows="tasksReference"
      :columns="columns"
      class="px-16 py-8 w-[1000px]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="titulo"
            :auto-width="false"
            class="!border-r cursor-pointer"
          >
            {{ props.row.titulo }}
          </q-td>

          <q-td
            key="projeto"
            :auto-width="false"
            class="!border-r cursor-pointer"
          >
            {{ props.row.projeto?.nome || '-' }}
          </q-td>

          <q-td
            key="tipo_task"
            :auto-width="false"
            class="!border-r cursor-pointer"
          >
            {{ props.row.tipo_task?.nome_completo || '-' }}
          </q-td>

          <q-td
            key="usuario"
            :auto-width="false"
            class="!border-r cursor-pointer"
          >
            <div class="inline-flex items-center h-full">
              <AvatarSingle
                class="!w-32 !h-32 overflow-hidden mr-2 ajuste-img"
                :estatic="true"
                :item="{
                  foto: props.row.responsavel_task?.profile.foto,
                }"
              ></AvatarSingle>
              <p class="pl-8">
                {{ props.row.responsavel_task?.get_full_name }}
              </p>
            </div>
          </q-td>

          <q-td
            key="tempo_corrente"
            :auto-width="false"
            class="!border-r cursor-pointer text-right"
          >
            {{
              GLOBAL.FTime(
                props.row.tempo_ao_vivo_formatado_hora_minuto_segundo
              )
            }}
          </q-td>

          <q-td key="copy">
            <OButton
              secondary
              class="!p-0 w-40 h-40 dark:bg-white/10 bg-text-white dark:!border-transparent"
              icon="svguse:/icons.svg#icon_copy"
              @click="
                emitter.emit(
                  'modal:copy:reference',
                  props.row.tempo_ao_vivo_formatado_hora_minuto_segundo
                )
              "
            />
          </q-td>
        </q-tr>
      </template>
    </OTableBase>
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import emitter from 'src/boot/emitter'

import GLOBAL from 'src/utils/GLOBAL'

import OTableBase from 'src/components/Table/OTableBase.vue'
import ModalCenter from './ModalCenter.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OButton from 'src/components/Button/OButton.vue'

import { useTaskStore } from 'src/stores/tasks/tasks.store'

defineProps({})
const { setTasksReference } = useTaskStore()
const { tasksReference } = storeToRefs(useTaskStore())

const modalReference = ref(null)

const columns = ref([
  {
    name: 'titulo',
    field: 'titulo',
    label: 'Título',
    align: 'left',
    sortable: true,
  },
  {
    name: 'projeto',
    field: (row) => row.projeto?.nome,
    label: 'Projeto',
    align: 'left',
    sortable: true,
  },
  {
    name: 'tipo_task',
    label: 'Tipo de Task',
    align: 'left',
  },
  {
    name: 'usuario',
    field: (row) => row.responsavel_task?.get_full_name,
    label: 'Usuário',
    align: 'left',
    sortable: true,
  },
  {
    name: 'tempo_corrente',
    label: 'Tempo Corrente',
    align: 'right',
    sortable: true,
  },
  {
    name: 'copy',
  },
])

function handleCloseReferenceModal() {
  setTasksReference([])
}

defineExpose({ modalReference })
</script>

<style lang="scss" scoped></style>
