<template>
  <section class="kanban-container">
    <div
      class="kanban-col--wrapper p-16"
      @mousedown="(e) => enableDragScroll(e)"
    >
      <KanbanCol
        v-for="col in colunasWithCards"
        :cards="col.cards"
        :colData="col.coluna"
        :key="col.coluna.id"
        :data-id="col.coluna.id"
        @mouseup="handleColClick"
        @mousedown="handleColClick"
        @newCards="createNewChamado"
      >
        <draggable
          v-bind="dragOptions"
          :list="col.cards"
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null,
            class: 'transition-div',
          }"
          group="a"
          itemKey="name"
          @end="(e) => startAndEndDrag(e, false)"
          @start="(e) => startAndEndDrag(e, true)"
        >
          <template #item="{ element }">
            <KanbanCard
              :item="element"
              :visaoExpandida="visaoExpandida"
              :data-card-id="element.id"
              @cardClick="handleCardClick(element)"
            >
            </KanbanCard>
          </template>

          <!--  -->
        </draggable>
      </KanbanCol>
    </div>
  </section>

  <KanbanModal
    ref="modal"
    :chamado="chamadoAtivo"
    :tags="tags"
    :projetoAndSubProjetoOptions="projetoAndSubProjetoOptions"
    @tagButtonClick="handleGetTags"
    @changed="commitAlt(colunasWithCards)"
  ></KanbanModal>

  <img :src="kanbanBG" aria-hidden="true" class="image-bg" alt="" />
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useKanbanBG } from 'src/stores/kanbanBG'
import { useVisaoExpandida } from 'src/stores/visaoExpandida'
import GLOBAL from 'src/utils/GLOBAL'
import KanbanCol from 'src/components/Kanban/KanbanCol.vue'
import KanbanCard from 'src/components/Kanban/KanbanCard.vue'
import KanbanModal from 'src/components/Kanban/KanbanModal.vue'
import useKanban from 'src/composables/UseKanban'
import draggable from 'vuedraggable'
import { useChamadoStore } from 'src/stores/chamados/chamados.store'
import { useTagsStore } from 'src/stores/tags/tags.store'
import { useProjetoStore } from 'src/stores/projetos/projetos.store'

const { /*  generateRange, modelo1, */ setHeightInCol } = GLOBAL

const { kanbanBG } = storeToRefs(useKanbanBG())
const { visaoExpandida } = storeToRefs(useVisaoExpandida())

const modal = ref(null)
const chamadoAtivo = ref(null)

const {
  colunasWithCards,
  cardAlterado,
  commitAlt,
  returnCardPerID,
  // getDadosAndDeclare,
  startAndEndDrag,

  drag,
} = useKanban()

// Store to refs
const { tags } = storeToRefs(useTagsStore())
const { getTags } = useTagsStore()
const { createChamado } = useChamadoStore()
const {
  getProjetos,
  getSubProjetos,
  /*  */
} = useProjetoStore()
const { projetoAndSubProjetoOptions } = storeToRefs(useProjetoStore())

// Drag

const removeEventsWrapper = ref(false)
const enableDragScroll = GLOBAL.enableDragScroll(removeEventsWrapper)

watch(drag, () => setHeightInCol())
watch(visaoExpandida, () => setTimeout(() => setHeightInCol(), 300))
watch(colunasWithCards, () => setTimeout(() => setHeightInCol(), 300))

function handleCardClick(element) {
  chamadoAtivo.value = returnCardPerID(element.id)
  cardAlterado.value = chamadoAtivo.value
  modal.value.dialogRef.show()
}

function handleColClick(e) {
  e.stopImmediatePropagation()
  removeEventsWrapper.value = true
}

async function createNewChamado(colData) {
  const dados = {
    idColuna: colData.id,
  }

  const mockData = (v) => ({
    descricao: 'Sem Descrição',
    titulo: 'Novo Chamado',
    fase: { id: v.idColuna },
    tag: [],
    projeto: {
      cor: '',
      projeto: null,
    },
    data_criacao: '',
  })

  const oi = {
    id: 35,
    projeto: {
      id: 15,
      nome: '#aquipneus#',
      logo: 'http://localhost:8000/media/logos_projetos/download-2-icon.png',
      cor: '#11D276',
      usuarios_com_acesso: [2, 6, 10],
    },
    tag: [],
    titulo: 'teste modal adicionado',
    descricao: '',
    descricao_chamado: null,
    prioridade: null,
    fase: {
      id: 9,
      ultima_atualizacao: '2021-06-17T18:20:52.292709Z',
      nome: 'Standby',
      ordem: 10,
      fase_conclusao: false,
    },
    link: null,
    anexo: null,
    data_prevista: null,
    data_desejada: null,
    tempo_estimado: '00:00:00',
    data_conclusao: null,
    aprovado: false,
    prazo_aprovacao: null,
    data_aprovacao: null,
    responsavel: null,
    data_criacao: '2022-03-09T15:15:39.555117-03:00',
    data_atualizacao: '2022-03-09T15:15:39.555270-03:00',
    usuario_criacao: {
      id: 6,
      password:
        'pbkdf2_sha256$260000$Nav4Mn182aHrua1OLtHedL$aUzZ150OKg+An18jDSk8EraBOGGAqBUFuidWQWPm2S0=',
      last_login: '2022-06-03T07:55:10.057938-03:00',
      is_superuser: false,
      username: 'emanuel4',
      first_name: '',
      last_name: '',
      email: '',
      is_staff: false,
      is_active: true,
      date_joined: '2021-07-28T09:37:32-03:00',
      groups: [2],
      user_permissions: [],
    },
    usuario_atualizacao: {
      id: 2,
      password:
        'pbkdf2_sha256$260000$cmoUIN364AYpSRyE0MF0fD$Wzt5v6I6F0ns/NP5XRIO9JjZw4DxzU9TBYw1CDis30w=',
      last_login: '2022-12-13T09:18:47.225738-03:00',
      is_superuser: true,
      username: 'emanuel2',
      first_name: 'emanuel',
      last_name: 'morais',
      email: 'emanuelbruno2018vasc@gmail.com',
      is_staff: true,
      is_active: true,
      date_joined: '2021-05-06T13:03:42-03:00',
      groups: [],
      user_permissions: [],
    },
    arquivado: false,
    sub_projeto: null,
    coluna_sub_projeto: null,
    ordem: 10,
    descricao_quill_html: '<p>edqwdwqdq</p>',
    tempo_total: '0.0',
    tempo_decorrido: '00:00:00',
  }

  chamadoAtivo.value = mockData(dados)
  modal.value.dialogRef.show()
  const modaal = modal.value.dialogRef

  // try {
  //   await createChamado(data)
  //   getDadosAndDeclare()
  // } catch (e) {
  //   console.log(e)
  // }
}

async function handleGetTags() {
  await getTags()
}

onMounted(() => {
  setHeightInCol()
  document
    .querySelector('.kanban-col--wrapper')
    .dispatchEvent(new Event('mousedown'))
  getProjetos()
  getSubProjetos()
})

const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

provide('chamado', chamadoAtivo)
provide('tags', tags)
provide('projetoAndSubProjetoOptions', projetoAndSubProjetoOptions)
</script>

<style lang="sass">
:root
  --kanban-col-bg: rgba(var(--neutral-20), 1)
  --kanban-col-width: 18rem


.image-bg
  position: fixed
  object-fit: cover
  top: 0
  left: 0
  z-index: -1
  width: 100vw
  height: 100vh
  pointer-events: none
  user-select: none


.kanban
  &-container
    width: 100%
    height: inherit
    user-select: none

  &-col
    background: var(--kanban-col-bg)
    width: var(--kanban-col-width)
    max-height: 100%
    min-height: 330px
    height: max-content
    border-radius: 6px
    display: flex
    flex-direction: column
    flex-shrink: 0


  &-col--wrapper
    height: 100%
    display: flex
    gap: 1rem
    width: 100%
    overflow-x: auto

    &::-webkit-scrollbar
      width: 10px

    &::-webkit-scrollbar-track
      background: rgba(0, 0, 0, 0)
      border-radius: 3px

    &::-webkit-scrollbar-thumb
      background: rgba(255, 255, 255, 0.2)
      border-radius: 3px

    &::-webkit-scrollbar-thumb:hover
      background: rgba(255, 255, 255, 0.4)


.cards-wrapper
  display: flex
  flex-direction: column
  // flex: 1 0 auto
  flex: initial
  height: 100%
  min-height: 270px

  .transition-div
    display: flex
    flex-direction: column
    gap: .5rem
    flex: 1
    height: 100%
    padding: 8px 8px 0
    min-height: 260px
    margin-bottom: .5rem


//qscrollbar dentro da coluna
.q-scrollarea
  display: flex
  flex-direction: column
  height: 100%
  flex: 1


.q-scrollarea__container
  display: flex
  flex-direction: column
  height: 100%
  flex: 1


.q-scrollarea__bar--v, .q-scrollarea__thumb--v
  right: 0
  width: 6px


//Dark & Light Mode
.body--light
  .kanban-col--wrapper
    &::-webkit-scrollbar-thumb
      background: rgba(255, 255, 255, 0.5)

    &::-webkit-scrollbar-thumb:hover
      background: rgba(255, 255, 255, 0.65)


.body--dark
  --kanban-col-bg: rgb(var(--d-neutral-10))
</style>
