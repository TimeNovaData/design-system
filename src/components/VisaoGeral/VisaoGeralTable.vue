<template>
  <OTable
    :rows="rows"
    :columns="columns"
    v-model:pagination="pagination"
    :filter="filter"
    class="px-16 py-8 dark:bg-d-neutral-20 visao-geral-table"
    primary
  >
    <template v-slot:top>
      <div class="flex items-center justify-between w-full">
        <OInput
          size="md"
          debounce="300"
          v-model="filter"
          placeholder="Pesquise por nome, tipo..."
          class="no-label mb-4 w-[22rem]"
        />

        <div class="flex gap-8 items-center">
          <span class="text-paragraph-2 text-neutral-70 dark:text-white/70">
            Mostrar
          </span>
          <OSelect
            class="w-72 h-40"
            size="md"
            v-model="rowsPerPage"
            :options="[2, 3, 5]"
          />
          <span class="text-paragraph-2 text-neutral-70 dark:text-white/70">
            Linhas por página
          </span>
        </div>
      </div>
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

    <template v-slot:bottom="props">
      <footer class="flex items-center justify-between w-full mt-12">
        <OButton
          icon="svguse:/icons.svg#icon_excel"
          size="sm"
          class="dark:bg-white/10 dark:!border-transparent icon-opacity"
          secondary
          @click="exportTable"
        >
          Baixar tabela
        </OButton>

        <div class="flex items-center gap-8">
          <OButton
            icon="chevron_left"
            :disable="props.isFirstPage"
            @click="props.prevPage"
            primary
            size="sm"
          >
            Anterior
          </OButton>

          <q-pagination
            v-model="pagination.page"
            color="primary"
            :max="pagesNumber"
            :max-pages="4"
            :boundary-numbers="false"
          />

          <OButton
            icon-right="chevron_right"
            :disable="props.isLastPage"
            @click="props.nextPage"
            primary
            size="sm"
          >
            Próximo
          </OButton>
        </div>
      </footer>
    </template>
  </OTable>

  <div class="row justify-center q-mt-md"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar, exportFile } from 'quasar'
import GLOBAL from 'src/utils/GLOBAL'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'

const { wrapCsvValue, returnRGB } = GLOBAL

const props = defineProps({
  rows: Array,
  columns: Array,
})

const adminUrl = (id) =>
  `${process.env.BACKEND_URL}admin/control/caso/${id}/change/`

const filter = ref('')
const rowsPerPage = ref(5)

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: rowsPerPage.value,
})

const pagesNumber = computed(() =>
  Math.ceil(props.rows.length / pagination.value.rowsPerPage)
)

// exportar tabela ----------------------------------
const $q = useQuasar()

const exportTable = () => {
  // naive encoding to csv format
  const content = [props.columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      props.rows.map((row) =>
        props.columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  const status = exportFile('table-export.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    })
  }
}
</script>

<style lang="sass" scoped>
.visao-geral-table
  .q-chip :deep(.q-chip__content)
    justify-content: center

  .q-pagination
    :deep(.q-btn)
      width: 2.375rem
      height: 2.375rem
      border: 1px solid rgba(var(--neutral-100),0.1)
      font-size: .75rem
      margin: 0

      &:before
        box-shadow: initial !important
      span
        transform: translateY(1px)

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
