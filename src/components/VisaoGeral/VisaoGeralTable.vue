<template>
  <OTable
    :rows="rows"
    :columns="columns"
    primary
    class="px-16 py-8 dark:bg-d-neutral-20 visao-geral-table"
    :pagination="pagination"
    :filter="filter"
  >
    <template v-slot:top-left>
      <OInput
        size="md"
        debounce="300"
        v-model="filter"
        placeholder="Pesquise por nome, tipo..."
        class="no-label mb-4 w-[22rem]"
      />
    </template>

    <template v-slot:top-right>
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
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="projeto" :auto-width="false" class="!border-r w-1/2">
          {{ props.row.projeto }}
        </q-td>

        <q-td key="cliente" :auto-width="false" class="!border-r w-1/2">
          {{ props.row.cliente }}
        </q-td>

        <q-td key="responsavel" :auto-width="false" class="!border-r">
          <div class="inline-flex items-center h-full gap-6">
            <AvatarSingle
              class="!w-32 !h-32 overflow-hidden ajuste-img"
              :estatic="true"
              :item="props.row.responsavel"
            ></AvatarSingle>
            <p class="">{{ props.row.responsavel?.nome }}</p>
          </div>
        </q-td>

        <q-td
          key="responsavel_atendimento"
          :auto-width="false"
          class="!border-r"
        >
          <div class="inline-flex items-center h-full gap-6">
            <AvatarSingle
              class="!w-32 !h-32 overflow-hidden ajuste-img"
              :estatic="true"
              :item="props.row.responsavel_atendimento"
            ></AvatarSingle>
            <p class="">{{ props.row.responsavel_atendimento?.nome }}</p>
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

        <q-td key="status" :auto-width="false" class="!border-r">
          <o-badge size="lg" color="var(--alert-error)" square class="w-[8rem]">
            <template v-slot:content>{{ props.row.status }}</template>
          </o-badge>
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

    <template v-slot:bottom="scope">
      <footer class="flex items-center justify-between w-full mt-12">
        <OButton
          icon="svguse:/icons.svg#icon_excel"
          size="sm"
          class="dark:bg-white/10 dark:!border-transparent icon-opacity"
          secondary
        >
          Baixar tabela
        </OButton>

        <div class="flex items-center gap-8">
          <OButton
            icon="chevron_left"
            :disable="scope.isFirstPage"
            @click="scope.prevPage"
            primary
            size="sm"
          >
            Anterior
          </OButton>

          <q-pagination
            v-model="pagination.page"
            :max="scope.pagesNumber"
            size="lg"
          />

          <OButton
            v-if="scope.pagesNumber > 2"
            :disable="scope.isLastPage"
            class="w-[2.375rem] h-[2.375rem] dark:bg-white/5"
            @click="scope.lastPage"
            secondary
            size="sm"
          >
            ...
          </OButton>

          <OButton
            icon-right="chevron_right"
            :disable="scope.isLastPage"
            @click="scope.nextPage"
            primary
            size="sm"
          >
            Próximo
          </OButton>
        </div>
      </footer>
    </template>
  </OTable>
</template>

<script setup>
import { ref, computed } from 'vue'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'

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
  // rowsNumber: xx if getting data from a server
})

const pagesNumber = computed(() => {
  return Math.ceil(props.rows.length / pagination.value.rowsPerPage)
})
</script>

<style lang="sass" scoped>
.visao-geral-table
  .q-chip :deep(.q-chip__content)
    justify-content: center

.body--light
  .visao-geral-table
    :deep(.icon-opacity .q-icon)
      color: #999ca4
    :deep(.q-btn.disabled)
      opacity: 1 !important
      background: rgba(var(--neutral-100), 0.1)
      color: rgba(var(--neutral-100), 0.4)

.body--dark
  .visao-geral-table
    :deep(.q-table__middle)
      background: rgb(var(--d-neutral-40))
      border-bottom: 1px solid rgba(var(--white), 0.1)
    :deep(.q-btn.disabled)
      opacity: 1 !important
      background: rgba(var(--white), 0.05)
      color: rgba(var(--white), 0.2)
</style>
