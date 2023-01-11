<template>
  <OTable
    :rows="rows"
    :columns="columns"
    primary
    class="px-16 py-8 visao-geral-table"
    :pagination="pagination"
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
        <span class="text-paragraph-2 text-neutral-70">Mostrar</span>
        <OSelect
          class="w-72 h-40"
          size="md"
          v-model="rowsPerPage"
          :options="[2, 3, 5]"
        />
        <span class="text-paragraph-2 text-neutral-70">Linhas por página</span>
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          key="projeto"
          :auto-width="false"
          class="!border-r w-full"
          :class="{ 'w-1/2': props.row.cliente }"
        >
          {{ props.row.projeto }}
        </q-td>

        <q-td
          v-if="props.row.cliente"
          key="cliente"
          :auto-width="false"
          class="!border-r w-1/2"
        >
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
          v-if="props.row.data_entrega"
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
          <OButton secondary icon="svguse:/icons.svg#icon_config" size="sm" />
          <OButton secondary icon="search" size="sm" class="ml-6" />
        </q-td>
      </q-tr>
    </template>

    <template v-slot:bottom="scope">
      <footer class="flex items-center justify-between w-full mt-12">
        <OButton icon="svguse:/icons.svg#icon_excel" size="sm" secondary>
          Baixar tabela
        </OButton>

        <div class="flex items-center gap-8">
          <!-- <OButton
            v-if="scope.pagesNumber > 2"
            :disable="scope.isFirstPage"
            @click="scope.firstPage"
            >Primeira</OButton
          > -->

          <OButton
            icon="chevron_left"
            :disable="scope.isFirstPage"
            :class="{ '!bg-neutral-100/10': scope.isFirstPage }"
            @click="scope.prevPage"
            primary
            size="sm"
          >
            Anterior
          </OButton>

          <q-pagination
            v-model="pagination.page"
            :max="scope.pagesNumber"
            size="sm"
          />

          <OButton
            v-if="scope.pagesNumber > 2"
            :disable="scope.isLastPage"
            class="w-[2.375rem] h-[2.375rem]"
            @click="scope.lastPage"
            secondary
            size="sm"
          >
            ...
          </OButton>

          <OButton
            icon-right="chevron_right"
            :disable="scope.isLastPage"
            :class="{ '!bg-neutral-100/10': scope.isLastPage }"
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

const filter = ref('')
const rowsPerPage = ref(2)
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
</style>
