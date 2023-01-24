<template>
  <OTable
    v-bind="attrs"
    v-show="rows.length"
    :rows="rows"
    :columns="columns"
    v-model:pagination="pagination"
    :filter="searchFilter"
    class="table-base"
    primary
  >
    <template v-slot:top>
      <OTableHeaderBase
        v-if="header"
        @update="updateModels"
        :filter="searchFilter"
        :rowsPerPage="pagination.rowsPerPage"
      />
    </template>

    <template v-for="slot in Object.keys(slots)" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>

    <template v-slot:bottom="slotProps">
      <OTableFooterBase
        v-if="footer"
        :downloadable="props.showDownloadButton"
        :rows="props.rows"
        :columns="props.columns"
        :slotProps="slotProps"
        :pagination="pagination"
        @update="(val) => updatePagination(val)"
      />
    </template>
  </OTable>

  <SkeletonTable v-if="!rows.length" class="mt-20 px-16" />
</template>

<script setup>
import { ref, useSlots, useAttrs } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import OTable from 'src/components/Table/OTable.vue'

import OTableHeaderBase from 'src/components/Table/OTableHeaderBase.vue'
import OTableFooterBase from 'src/components/Table/OTableFooterBase.vue'
import SkeletonTable from 'src/components/Skeleton/SkeletonTable.vue'
const slots = useSlots()
const attrs = useAttrs()

const { returnRGB } = GLOBAL

const props = defineProps({
  rows: Array,
  columns: Array,
  footer: {
    type: Boolean,
    default: true,
  },
  header: {
    type: Boolean,
    default: true,
  },
  showDownloadButton: {
    type: Boolean,
    default: true,
  },
})

const searchFilter = ref('')

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
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
.table-base
  .q-chip :deep(.q-chip__content)
    justify-content: center

  :deep(.q-table__middle)
    max-height: 37rem

    thead
      position: sticky
      top: 0
      background: rgb(var(--white))
      z-index: 10

.body--dark
  .table-base
    :deep(.q-table__middle)
      border: 1px solid rgba(var(--white), 0.1)

    :deep(thead)
      background: rgb(var(--d-neutral-10))

    :deep(.q-td:not(:last-child))
      border-right: 1px solid rgba(var(--white),0.1)



.body--light
  .table-base
    :deep(.icon-opacity .q-icon)
      color: #999ca4

    :deep(.q-td:not(:last-child))
     border-right: 1px solid rgba(var(--neutral-100),0.1)
</style>
