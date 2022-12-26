<template>
  <q-menu
    ref="menu"
    class="p-12"
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <q-form ref="form">
      <q-list class="w-[23.5rem]">
        <q-item
          class="px-0 text-headline-3 text-neutral-60 dark:text-white/60 justify-between flex items-center w-full"
          dense
        >
          Filtros
          <q-icon size="20px" name="svguse:/icons.svg#icon_filtros"></q-icon>
        </q-item>

        <q-item class="px-0">
          <OSelect
            :loading="!filtros.tags.options.length"
            v-model="filtros.tags.model"
            use-input
            label="Tags"
            size="md"
            class="w-full"
            :options="filtros.tags.options"
            clearable
            option-value="id"
            option-label="nome"
          >
          </OSelect>
        </q-item>

        <!-- <q-item class="px-0">
                  <OSelect
                    use-input
                    label="Projeto"
                    size="md"
                    class="w-full"
                    :options="filtros.projeto.options"
                    v-model="filtros.projeto.model"
                    clearable
                    option-value="id"
                    option-label="nome"
                    :loading="!filtros.projeto.options.length"
                  >
                  </OSelect>
                </q-item>

                <q-item class="px-0 flex gap-4">
                  <OSelect
                    use-input
                    label="Usuário"
                    size="md"
                    class="w-full"
                    :options="filtros.usuario.options"
                    v-model="filtros.usuario.model"
                    clearable
                    option-value="id"
                    option-label="nome"
                    :loading="!filtros.usuario.options.length"
                  >
                  </OSelect>
                </q-item>
                <q-item class="px-0">
                  <OInput
                    size="md"
                    class="w-full cursor-pointer"
                    label="Data"
                    :model-value="filtros.data.days.from && dataRangeFiltro"
                    clearable
                    @clear="filtros.data.days = { from: '', to: '' }"
                    @keydown.prevent
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                      class="!w-max !min-w-0"
                    >
                      <q-date v-model="filtros.data.days" range />
                    </q-popup-proxy>

                    <template v-slot:append>
                      <q-icon name="calendar_today" class="cursor-pointer">
                      </q-icon>
                    </template>
                  </OInput>
                </q-item>

                <q-item class="px-0 flex gap-4 justify-end w-full">
                  <OButton
                    size="md"
                    icon="close"
                    tertiary
                    @click="handleRemoveFilters"
                  >
                    Remover Filtros</OButton
                  >
                  <OButton
                    size="md"
                    icon="check"
                    primary
                    @click="getTempoTask"
                    :loading="isLoading"
                    >Aplicar</OButton
                  >
                </q-item> -->
      </q-list>
    </q-form>
  </q-menu>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'

const tagsList = inject('tagsList')

watch(
  () => tagsList,
  (v) => {
    filtros.value.tags.options = v
  },
  { deep: true }
)

const filtrosDefault = {
  tags: {
    options: [],
    model: '',
    // name: 'clienteid',
    // nameVisivel: 'Cliente',
  },
  // projeto: {
  //   options: [],
  //   model: '',
  //   name: 'projetoid',
  //   nameVisivel: 'Projeto',
  // },

  // usuario: {
  //   options: [],
  //   model: '',
  //   name: 'userid',
  //   nameVisivel: 'Usuario',
  // },
}
const filtros = ref(filtrosDefault)
</script>

<style lang="sass" scoped></style>
