<template>
  <footer class="flex items-center justify-between w-full mt-12">
    <OButton
      v-if="downloadable"
      icon="svguse:/icons.svg#icon_excel"
      size="sm"
      class="dark:bg-white/10 dark:!border-transparent icon-opacity"
      secondary
      @click="() => exportTable(props.columns, props.rows)"
    >
      Baixar tabela
    </OButton>

    <div class="flex items-center gap-8 ml-auto">
      <OButton
        icon="chevron_left"
        :disable="props.slotProps.isFirstPage"
        @click="goPrev()"
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
        @update:model-value="$emit('update', pagination)"
      />

      <OButton
        icon-right="chevron_right"
        :disable="props.slotProps.isLastPage"
        @click="goNext()"
        primary
        size="sm"
      >
        Próximo
      </OButton>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'

const { exportTable } = GLOBAL

const emit = defineEmits(['update'])

const props = defineProps({
  rows: Array,
  columns: Array,
  slotProps: Object,
  pagination: Object,
  downloadable: {
    type: Boolean,
    default: false,
  },
})

const pagination = ref(props.pagination)

const pagesNumber = computed(() =>
  Math.ceil(props.rows.length / props.pagination.rowsPerPage)
)

function goNext() {
  props.slotProps.nextPage()
  pagination.value.page++
}

function goPrev() {
  props.slotProps.prevPage()
  pagination.value.page--
}
</script>

<style lang="sass"></style>
