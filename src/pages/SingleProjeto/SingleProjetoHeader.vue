<template>
  <header
    :class="{ 'opacity-0': headerMinify }"
    v-scroll="onScroll"
    ref="header"
    class="header-single"
  >
    <div class="flex relative -top-32 gap-32 flex-nowrap justify-between">
      <div class="flex flex-nowrap w-full">
        <OAvatar
          v-if="projeto.logo"
          :foto="projeto.logo"
          size="160px"
          class-avatar="border-2 border-white"
          class="shadow-lg"
          style="box-sizing: initial"
        ></OAvatar>

        <div v-else class="w-[165px] h-[165px] rounded-full bg-neutral-20">
          <q-skeleton type="circle" size="165px" />
        </div>

        <!-- mt pra compensar o relative -->
        <section class="flex flex-col gap-16 mt-32 pt-24 pl-24 shrink-0 flex-1">
          <div class="flex flex-col">
            <div class="text-caps-2 !font-medium text-primary-pure">
              <div
                class="h-16"
                :class="{ 'opacity-100': projeto.nome_cliente }"
              >
                {{ projeto.nome_cliente }}
              </div>
            </div>
            <div class="item-editavel text-title-3 h-40">
              <div v-if="$route.params.id === '0'">
                Selecione um projeto
                <q-icon name="expand_more"></q-icon>
              </div>

              <q-skeleton
                v-else-if="!projeto.id"
                type="text"
                width="100%"
                height="2.3rem"
              >
              </q-skeleton>

              <div v-else>
                {{ projeto.nome }}
              </div>

              <KanbanItemEditableSelect
                text="Selecione um Projeto"
                selectLabel="Projeto"
                :options="projetos"
                :selected="projeto !== {} ? projeto : null"
                @updateValue="(v) => $emit('select:update', v)"
                :selectProps="{
                  clearable: false,
                  loading: !projetos.length,
                  nomeKey: 'nome_completo',
                }"
                option-label="nome_completo"
                ref="itemEditableSelect"
                @clear:select="handleClear"
                :clearActive="false"
              ></KanbanItemEditableSelect>
            </div>
          </div>

          <section class="flex gap-32 flex-nowrap">
            <div class="flex flex-col">
              <p class="text-caps-3 text-neutral-70">Responsáveis</p>
              <div class="relative max-w-[128px] h-32">
                <!--   <AvatarSingle :index="index" :item="item"></AvatarSingle> -->
                <AvatarMultiple
                  v-if="projeto.responsaveis"
                  :list="projeto.responsaveis"
                ></AvatarMultiple>
                <q-skeleton v-else type="circle" size="32px" />
              </div>
            </div>

            <div class="flex flex-col">
              <p class="text-caps-3 text-neutral-70">Atendimento</p>
              <div class="relative max-w-[128px] h-32">
                <!--   <AvatarSingle :index="index" :item="item"></AvatarSingle> -->
                <AvatarMultiple
                  v-if="projeto.atendimento"
                  :list="projeto.atendimento"
                ></AvatarMultiple>
                <q-skeleton v-else type="circle" size="32px" />
              </div>
            </div>

            <div class="flex flex-col min-w-[83px]">
              <p class="text-caps-3 text-neutral-70">Prazo</p>

              <OBadge
                size="lg"
                square
                color="var(--alert-success)"
                v-if="projeto.id"
              >
                <template v-slot:content>{{
                  FData(projeto.fim_contrato)
                }}</template>
              </OBadge>
              <q-skeleton v-else type="rect" height="24px" width="100%" />
            </div>

            <div class="flex flex-col min-w-[83px]">
              <p class="text-caps-3 text-neutral-70">Status</p>

              <OBadge
                v-if="projeto.status"
                size="lg"
                square
                color="var(--neutral-100)"
                class="dark:!bg-white/10"
              >
                <template v-slot:content>{{ projeto.status }}</template>
              </OBadge>

              <q-skeleton v-else type="rect" height="24px" width="100%" />
            </div>
          </section>
        </section>
      </div>

      <div
        class="flex items-end gap-6 ml-auto flex-nowrap w-full !mt-[8.43rem] h-max justify-end"
        :class="{ 'pointer-events-none': !projeto.id }"
      >
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          size="md"
          secondary
          icon="svguse:/icons.svg#icon_paper"
          @click="$emit('click:escopo')"
          icon-size="1.25rem"
        >
          Escopo</OButton
        >
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          size="md"
          secondary
          icon="svguse:/icons.svg#icon_docs"
          @click="$emit('click:briefing')"
          icon-size="1.25rem"
        >
          Briefing</OButton
        >
        <hr
          class="w-1 h-24 my-auto mx-4 bg-neutral-100/10 dark:bg-white/10 border-[0]"
        />
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          size="md"
          secondary
          icon="svguse:/icons.svg#icon_attach"
          icon-size="1.25rem"
          @click="$emit('click:anexo')"
        >
          Anexos</OButton
        >
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          icon-size="1.25rem"
          icon="svguse:/icons.svg#icon_cadeado"
          size="md"
          secondary
          @click="$emit('click:acessos')"
        >
          <q-tooltip>Acessos</q-tooltip>
        </OButton>
        <OButton
          class="dark:!bg-white/10 dark:shadow-[initial] dark:!border-0 !h-40 btn-header bg-white"
          icon-size="1.25rem"
          icon="svguse:/icons.svg#icon_users"
          size="md"
          secondary
          @click="$emit('click:contatos')"
          ><q-tooltip>Contatos</q-tooltip>
        </OButton>
      </div>
    </div>
  </header>
  <SingleProjetoHeaderMinify
    :class="{ 'opacity-0': !headerMinify }"
    :projeto="projeto"
    @select:update="(v) => $emit('select:update', v)"
    @click:anexo="$emit('click:anexo')"
    @click:contatos="$emit('click:contatos')"
    @click:acessos="$emit('click:acessos')"
    @click:briefing="$emit('click:briefing')"
    @click:escopo="$emit('click:escopo')"
  ></SingleProjetoHeaderMinify>
</template>

<script setup>
import avatar from 'src/assets/image/gravatar.jpg'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'
import KanbanItemEditableSelect from 'src/components/Kanban/KanbanItemEditableSelect.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { inject, ref, onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SingleProjetoHeaderMinify from './SingleProjetoHeaderMinify.vue'
const { FData } = GLOBAL

const emit = defineEmits([
  'select:update',
  'click:anexo',
  'click:escopo',
  'click:briefing',
  'click:contatos',
  'click:acessos',
])
const header = ref(null)

const itemEditableSelect = ref(null)
const projetos = inject('projetos')
const headerMinify = ref(false)

defineProps({
  projeto: Object,
})

function show() {
  itemEditableSelect.value.showPopup()
}

function onScroll(position) {
  if (position > 250) {
    headerMinify.value = true
  } else {
    headerMinify.value = false
  }
}

function handleClear(e) {
  // debugger
}

defineExpose({ itemEditableSelect, show })
</script>

<style lang="sass" scoped>


.item-editavel
  display: flex
  align-items: center
  gap:.5rem
  cursor: pointer
  padding: 2px
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

// .header-single
//   transition: opacity 0.3s ease-out
  // &.fixa
</style>
