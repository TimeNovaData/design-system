<template>
  <OTableBase
    :rows="rows"
    :columns="columns"
    class="visao-geral-table px-16 py-8"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td class="text-center !px-6">
          <OButton
            :href="adminUrl(props.row.id)"
            target="_blank"
            secondary
            icon="svguse:/icons.svg#icon_config"
            size="sm"
            class="w-[2.375rem] h-[2.375rem] icon-opacity"
          />
          <OButton
            v-if="user.is_staff"
            :to="{ name: 'singleProjeto', params: { id: props.row.id } }"
            secondary
            icon="search"
            size="sm"
            class="w-[2.375rem] h-[2.375rem] icon-opacity ml-6"
          />
        </q-td>
        <q-td
          key="projeto"
          :auto-width="false"
          class="!border-r w-1/2 cursor-pointer"
          @click="$emit('click:acompanhamento', props.row.id)"
        >
          {{ props.row.projeto }}
        </q-td>

        <q-td
          key="cliente"
          :auto-width="false"
          class="!border-r w-1/2 cursor-pointer"
          @click="$emit('click:acompanhamento', props.row.id)"
        >
          {{ props.row.cliente }}
        </q-td>

        <q-td
          key="responsaveis"
          :auto-width="false"
          class="px-6 !border-r cursor-pointer"
          @click="$emit('click:acompanhamento', props.row.id)"
        >
          <div class="grid h-full items-center relative">
            <AvatarMultiple
              v-if="props.row.responsaveis"
              :list="props.row.responsaveis"
            ></AvatarMultiple>
            <span class="pl-2">-</span>
          </div>
        </q-td>

        <q-td
          @click="$emit('click:acompanhamento', props.row.id)"
          key="responsaveis_atendimento"
          :auto-width="false"
          class="!border-r cursor-pointer"
        >
          <div class="inline-flex items-center h-full gap-6">
            <div class="grid h-full items-center relative">
              <AvatarMultiple
                v-if="props.row.responsaveis_atendimento"
                :list="props.row.responsaveis_atendimento"
              ></AvatarMultiple>
              <span class="pl-2">-</span>
            </div>
          </div>
        </q-td>

        <q-td
          key="data_entrega"
          :auto-width="false"
          class="text-right !border-r cursor-pointer"
          @click="$emit('click:acompanhamento', props.row.id)"
        >
          {{ props.row.data_entrega }}
        </q-td>

        <q-td
          key="ultimo_acompanhamento"
          :auto-width="false"
          class="text-right !border-r cursor-pointer"
          @click="$emit('click:acompanhamento', props.row.id)"
        >
          <OBadge
            size="lg"
            :color="returnRGB(props.row.ultimo_acompanhamento.cor)"
            square
            class="w-[8rem]"
          >
            <template v-slot:content>{{
              props.row.ultimo_acompanhamento.data
            }}</template>
          </OBadge>
        </q-td>

        <q-td
          key="status_andamento"
          :auto-width="false"
          class="!border-r cursor-pointer"
          @click="$emit('click:acompanhamento', props.row.id)"
        >
          <OBadge
            size="lg"
            :color="returnRGB(props.row.status_andamento.cor)"
            square
            class="w-[8rem]"
          >
            <template v-slot:content>{{
              props.row.status_andamento.status
            }}</template>
          </OBadge>
        </q-td>

        <q-td
          @click="$emit('click:acompanhamento', props.row.id)"
          key="chamado_pendentes"
          :auto-width="false"
          class="text-right !border-r w-96 cursor-pointer"
        >
          {{ props.row.chamado_pendentes }}
        </q-td>

        <q-td
          @click="$emit('click:acompanhamento', props.row.id)"
          key="tasks_pendentes"
          :auto-width="false"
          class="text-right !border-r w-96"
        >
          {{ props.row.tasks_pendentes }}
        </q-td>
      </q-tr>
    </template>
  </OTableBase>
</template>

<script setup>
import { ref, inject } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import OTable from 'src/components/Table/OTable.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
import OTableBase from 'src/components/Table/OTableBase.vue'

const { returnRGB } = GLOBAL
const user = inject('user')

const props = defineProps({
  rows: Array,
  columns: Array,
})

defineEmits(['click:acompanhamento'])

const adminUrl = (id) =>
  `${process.env.BACKEND_URL}admin/control/caso/${id}/change/`
</script>

<style lang="sass" scoped></style>
