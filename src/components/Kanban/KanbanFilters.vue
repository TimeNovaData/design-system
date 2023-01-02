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
    class="p-12 pb-0"
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <q-form ref="form">
      <q-list class="w-[23.5rem]">
        <q-item
          class="px-0 text-headline-3 text-neutral-60 dark:text-white/60 justify-between flex items-center w-full mb-8"
          dense
        >
          Filtros
        </q-item>

        <q-item class="px-0">
          <OSelectAvatar
            use-input
            label="Projeto"
            size="md"
            class="w-full"
            :modelValue="filtros.projeto.model"
            :options="projetos"
            :loading="!projetos"
            clearable
            @updateValue="(v) => (filtros.projeto.model = v) && handleApply()"
            @clear="handleApply"
          >
          </OSelectAvatar>
        </q-item>

        <q-item class="px-0 flex gap-4">
          <OSelectAvatar
            use-input
            label="Usuário"
            size="md"
            class="w-full"
            :modelValue="filtros.usuario.model"
            :options="usuarios"
            :loading="!usuarios"
            clearable
            @updateValue="(v) => (filtros.usuario.model = v) && handleApply()"
            @clear="handleApply"
          >
          </OSelectAvatar>
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
import { ref, inject, watch, computed, onMounted } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import GLOBAL from 'src/utils/GLOBAL'
import OButton from 'src/components/Button/OButton.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import { deepUnref } from 'vue-deepunref'
import emitter from 'src/boot/emitter'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'

const emit = defineEmits(['applyFilters'])

const { returnRGB } = GLOBAL
const filtrosDefault = {
  projeto: {
    model: '',
  },

  usuario: {
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

const projetos = inject('projetos')
const usuarios = inject('usuarios')

const semFiltros = ref(true)
const filtros = ref(deepUnref(filtrosDefault))

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
