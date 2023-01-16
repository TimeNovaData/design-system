<template>
  <OTable
    v-show="rows.length"
    :rows="rows"
    :columns="columns"
    v-model:pagination="pagination"
    :filter="searchFilter"
    class="px-16 py-8 dark:bg-d-neutral-20 visao-geral-table"
    primary
  >
    <template v-slot:top>
      <OTableHeaderBase
        @update="updateModels"
        :filter="searchFilter"
        :rowsPerPage="pagination.rowsPerPage"
      />
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="projeto" :auto-width="false" class="!border-r w-1/2">
          {{ props.row.projeto }}
        </q-td>

        <q-td key="cliente" :auto-width="false" class="!border-r w-1/2">
          {{ props.row.cliente }}
        </q-td>

        <q-td key="responsaveis" :auto-width="false" class="px-6 !border-r">
          <div class="grid h-full items-center relative">
            <AvatarMultiple
              v-if="props.row.responsaveis"
              :list="props.row.responsaveis"
            ></AvatarMultiple>
            <span class="pl-2">-</span>
          </div>
        </q-td>

        <q-td
          key="responsaveis_atendimento"
          :auto-width="false"
          class="!border-r"
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
          class="text-right !border-r"
        >
          {{ props.row.data_entrega }}
        </q-td>

        <q-td
          key="ultimo_acompanhamento"
          :auto-width="false"
          class="text-right !border-r"
        >
          {{ props.row.ultimo_acompanhamento }}
        </q-td>

        <q-td key="status_andamento" :auto-width="false" class="!border-r">
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
          key="chamado_pendentes"
          :auto-width="false"
          class="text-right !border-r w-96"
        >
          {{ props.row.chamado_pendentes }}
        </q-td>

        <q-td
          key="tasks_pendentes"
          :auto-width="false"
          class="text-right !border-r w-96"
        >
          {{ props.row.tasks_pendentes }}
        </q-td>

        <q-td class="text-center !px-6">
          <a :href="adminUrl(props.row.id)" target="_blank">
            <OButton
              secondary
              icon="svguse:/icons.svg#icon_config"
              size="sm"
              class="w-[2.375rem] h-[2.375rem] icon-opacity"
            />
          </a>
          <a :href="'/projeto/' + props.row.id">
            <OButton
              secondary
              icon="search"
              size="sm"
              class="w-[2.375rem] h-[2.375rem] icon-opacity ml-6"
            />
          </a>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:bottom="slotProps">
      <OTableFooterBase
        downloadable
        :rows="props.rows"
        :columns="props.columns"
        :slotProps="slotProps"
        :pagination="pagination"
        @update="(val) => updatePagination(val)"
      />
    </template>
  </OTable>

  <q-markup-table v-show="!rows.length" class="mt-20 px-16">
    <thead>
      <tr>
        <th class="text-left" style="width: 150px">
          <q-skeleton animation="blink" type="text" />
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text" />
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text" />
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text" />
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text" />
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text" />
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="n in 5" :key="n">
        <td class="text-left">
          <q-skeleton animation="blink" type="text" width="85px" />
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="50px" />
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="35px" />
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="65px" />
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="25px" />
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="85px" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import OTable from 'src/components/Table/OTable.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import OTableHeaderBase from 'src/components/Table/OTableHeaderBase.vue'
import OTableFooterBase from 'src/components/Table/OTableFooterBase.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'

const { returnRGB } = GLOBAL

const props = defineProps({
  rows: Array,
  columns: Array,
})

const adminUrl = (id) =>
  `${process.env.BACKEND_URL}admin/control/caso/${id}/change/`

const searchFilter = ref('')

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 1,
})

function updateModels(val) {
  searchFilter.value = val.filter
  pagination.value.rowsPerPage = val.rowsPerPage
}

function updatePagination(val) {
  pagination.value = val
}
</script>

<style lang="sass" scoped>
.visao-geral-table
  .q-chip :deep(.q-chip__content)
    justify-content: center

  :deep(.q-table__middle)
    max-height: 37rem

    thead
      position: sticky
      top: 0
      background: rgb(var(--white))
      z-index: 10

  .q-pagination
    :deep(.q-btn)
      width: 2.375rem
      height: 2.375rem
      border: 1px solid rgba(var(--neutral-100),0.1)
      font-size: .75rem
      margin: 0

      &:before
        box-shadow: initial !important

    :deep(.q-pagination__middle),
    :deep(.q-pagination__content)
      gap: .375rem

.body--light
  .visao-geral-table
    :deep(.icon-opacity .q-icon)
      color: #999ca4
    :deep(.q-btn.disabled)
      opacity: 1 !important
      background: rgba(var(--neutral-100), 0.1)
      color: rgba(var(--neutral-100), 0.4)
    .q-pagination :deep(.q-btn)
      color: rgb(var(--neutral-70)) !important
      &.bg-primary
        color: rgb(var(--neutral-100)) !important
        border: transparent

.body--dark
  .visao-geral-table
    :deep(.q-table__middle)
      background: rgb(var(--d-neutral-40))
      border-bottom: 1px solid rgba(var(--white), 0.1)
    :deep(.q-btn.disabled)
      opacity: 1 !important
      background: rgba(var(--white), 0.05)
      color: rgba(var(--white), 0.2)
    .q-pagination :deep(.q-btn)
      border: 1px solid rgba(var(--white),0.1)
      color: rgba(var(--white), 0.7) !important
      background: rgba(var(--white), 0.05)
      &.bg-primary
        color: rgb(var(--neutral-100)) !important
</style>
