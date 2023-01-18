<template>
  <header
    v-scroll="onScroll"
    ref="header"
    class="header-single bg-neutral-10 border-b border-neutral-100/10 dark:bg-d-neutral-10 dark:border-b-white/10"
  >
    <div
      class="flex relative gap-32 flex-nowrap justify-between w-full max-w-[1448px] mx-auto py-10 items-center"
    >
      <div class="flex flex-nowrap w-full items-start">
        <OAvatar
          :foto="avatar"
          size="3.1rem"
          class-avatar="border-2 border-white"
          style="box-sizing: initial"
        ></OAvatar>

        <!-- mt pra compensar o relative -->
        <section class="flex gap-16 pl-8 shrink-0 flex-1 flex-nowrap">
          <div class="flex flex-col">
            <p class="text-caps-3 !font-medium text-primary-pure">
              {{ projeto.nome_cliente || '' }}
            </p>
            <p class="text-title-4 item-editavel !p-0">
              {{ projeto.nome || 'Selecione um projeto' }}

              <KanbanItemEditableSelect
                text="Selecione um Projeto"
                selectLabel="Projeto"
                :options="projetos"
                :selected="projeto !== {} ? projeto : null"
                :clearable="false"
                @updateValue="(v) => $emit('updateSelect', v)"
              ></KanbanItemEditableSelect>
            </p>
          </div>

          <section class="flex gap-32 flex-nowrap">
            <div class="flex flex-col min-w-[83px]" v-if="projeto.atendimento">
              <p class="text-caps-3 text-neutral-70">Prazo</p>

              <OBadge size="lg" square color="var(--alert-success)">
                <template v-slot:content>{{ FData(projeto) }}</template>
              </OBadge>
            </div>

            <div class="flex flex-col min-w-[83px]" v-if="projeto.status">
              <p class="text-caps-3 text-neutral-70">Status</p>

              <OBadge
                class="dark:!bg-white/10"
                size="lg"
                square
                color="var(--neutral-100)"
              >
                <template v-slot:content>{{ projeto.status }}</template>
              </OBadge>
            </div>
          </section>
        </section>
      </div>

      <div
        class="flex items-end gap-6 ml-auto flex-nowrap w-full h-max justify-end"
        :class="{ 'pointer-events-none': !projeto.id }"
      >
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          size="md"
          secondary
          icon="svguse:/icons.svg#icon_paper"
          @click="$emit('escopoClick')"
          icon-size="1.25rem"
        >
          Escopo</OButton
        >
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          size="md"
          secondary
          icon="svguse:/icons.svg#icon_docs"
          @click="$emit('briefingClick')"
          icon-size="1.25rem"
        >
          Briefing</OButton
        >
        <hr class="w-1 h-24 my-auto mx-4 bg-neutral-100/10" />
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          size="md"
          secondary
          icon="svguse:/icons.svg#icon_attach"
          icon-size="1.25rem"
          @click="$emit('anexoClick')"
        >
          Anexos</OButton
        >
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          icon-size="1.25rem"
          icon="svguse:/icons.svg#icon_cadeado"
          size="md"
          secondary
          @click="$emit('acessosClick')"
        >
          <q-tooltip>Acessos</q-tooltip>
        </OButton>
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          icon-size="1.25rem"
          icon="svguse:/icons.svg#icon_users"
          size="md"
          secondary
          @click="$emit('contatosClick')"
          ><q-tooltip>Contatos</q-tooltip>
        </OButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import avatar from 'src/assets/image/gravatar.jpg'

import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import KanbanItemEditableSelect from 'src/components/Kanban/KanbanItemEditableSelect.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { inject, ref, onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const { FData } = GLOBAL

const emit = defineEmits([
  'updateSelect',
  'anexoClick',
  'escopoClick',
  'briefingClick',
  'contatosClick',
  'acessosClick',
])
const header = ref(null)

const itemEditableSelect = ref(null)
const projetos = inject('projetos')

defineProps({
  projeto: Object,
})

function show() {
  itemEditableSelect.value.showPopup()
}

function onScroll(position) {
  if (position > 200) {
    header.value.classList.add('fixa')
  } else {
    header.value.classList.remove('fixa')
  }
}

defineExpose({ itemEditableSelect, show })
</script>

<style lang="sass" scoped>


.item-editavel
  display: flex
  align-items: center
  gap:.5rem
  cursor: pointer
  border-radius: 3px
  border: 1px solid transparent
  transition: .3s ease
  &:hover
    border-color: rgba(var(--neutral-100),0.1)
  .body--dark &
    &:hover
      border-color: rgba(var(--white),0.2)

.btn-header
  // flex: 1 1 100%
  // height: 108px !important
  &:deep(.q-btn__content)
    flex-wrap: nowrap

.header-single
  position: fixed
  top: 0px
  margin: 0 auto
  width: 100%
  padding: 0 32px
  justify-content: center
  transition: transform 0.2s !important
  left: 0
  left: 0
  right: 0
  z-index: 999
  transform: translateY(-80px)
  &.fixa
    transform: translateY(0)
</style>
