<template>
  <q-badge
    v-if="counter.get"
    rounded
    floating
    class="bg-alert-error !w-16 !h-16 grid place-items-center text-center p-0"
    ><p class="block m-auto">{{ counter.get }}</p></q-badge
  >
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
          <q-icon size="20px" icon="svguse:/icons.svg#icon_filtros"></q-icon>
        </q-item>

        <!-- <q-item class="px-0">
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
            <template #selected-item="scope">
              <OBadge
                size="sm"
                :badge="true"
                :color="returnRGB(scope.opt.cor_letra)"
                class="rounded-generic h-32 dark:!text-white/90"
                :key="scope.opt.id"
                removable
                @remove="scope.toggleOption(scope.opt)"
              >
                <template #content>
                  <p class="text-center mx-auto" square>
                    {{ scope.opt.nome }}
                  </p>
                </template>
              </OBadge>
            </template>
          </OSelect>
        </q-item> -->

        <q-item class="px-0">
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
            @clear="handleApply"
            @update:model-value="handleApply"
          >
            <template #option="scope">
              <q-item
                v-bind="scope.itemProps"
                class="items-center gap-8"
                :key="scope.opt.id"
              >
                <q-badge
                  rounded
                  class="shrink-0 w-8 h-8"
                  :style="{ background: scope.opt.cor }"
                ></q-badge>
                {{ scope.opt.nome }}
              </q-item>
            </template>
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
            @clear="handleApply"
            @update:model-value="handleApply"
          >
            <template #option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label class="flex items-center gap-8">
                    <AvatarSingle
                      class="!w-32 !h-32"
                      :index="0"
                      :item="opt"
                      side="left"
                    ></AvatarSingle>

                    <p class="!text-neutral-70 dark:!text-white/90 ml-24">
                      {{ opt.nome }}
                    </p>
                  </q-item-label>
                </q-item-section>
                <q-item-section side class="!w-56">
                  <q-toggle
                    size="sm"
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </OSelect>
        </q-item>
      </q-list>

      <q-item class="px-0 flex gap-4 justify-end w-full">
        <OButton size="md" icon="close" tertiary @click="handleRemove">
          Remover Filtros</OButton
        >
        <!-- <OButton size="md" icon="check" primary @click="handleApply"
          >Aplicar</OButton
        > -->
      </q-item>
    </q-form>
  </q-menu>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import { deepUnref } from 'vue-deepunref'
import emitter from 'src/boot/emitter'

const emit = defineEmits(['applyFilters'])

const { returnRGB } = GLOBAL
const filtrosDefault = {
  projeto: {
    options: [],
    model: '',
  },

  usuario: {
    options: [],
    model: '',
  },
}
function handleRemove() {
  filtros.value.projeto.model = ''
  filtros.value.usuario.model = ''
  emit('applyFilters', { ...filtros.value, semFiltros })
  counter.value.set()
}

function handleApply() {
  emit('applyFilters', { ...filtros.value })
  counter.value.set()
}

const counter = ref({
  get: 0,
  set: () => {
    const val = Object.values(filtros.value).filter((i) => i.model).length
    counter.value.get = val
  },
})

emitter.on('reloadDataKanban', () => {
  filtros.value.projeto.model = ''
  filtros.value.usuario.model = ''
  counter.value.set()
})

// const tagsList = inject('tagsList')
// watch(tagsList, (v) => (filtros.value.tags.options = v))

const projetos = inject('projetos')
const usuarios = inject('usuarios')

const semFiltros = ref(true)
const filtros = ref(deepUnref(filtrosDefault))

watch(projetos, (v) => (filtros.value.projeto.options = v))
watch(usuarios, (v) => (filtros.value.usuario.options = v))

watch(
  () => filtros.value,
  () => {
    if (!filtros.value.projeto.model && !filtros.value.usuario.model)
      semFiltros.value = true
    else semFiltros.value = false
  },
  { deep: true }
)
</script>

<style lang="sass" scoped></style>
