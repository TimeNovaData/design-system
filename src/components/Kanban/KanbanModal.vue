<template>
  <q-dialog
    ref="dialogRef"
    transition-hide="slide-down"
    v-model="dialogState"
    @hide="onDialogHide"
    @before-show="beforeshow"
    @before-hide="beforehide"
  >
    <q-card class="kanban-modal q-dialog-plugin remove-styles">
      <header class="bg-neutral-30 dark:bg-d-neutral-10">
        <div>
          <div class="px-24 pt-24 pb-6 flex items-center gap-12">
            <q-icon
              class="w-24 h-24"
              name="svguse:/icons.svg#icon_screen"
            ></q-icon>

            <KanbanItemEditable
              class="!text-title-2 !p-0 !bg-transparent"
              popup-class="!min-w-[18.75rem]"
              :editable="true"
              :value="data.titulo"
              @update="(v) => updateValue('titulo')(v)"
            ></KanbanItemEditable>
          </div>

          <div
            class="ml-[3.75rem] pr-24 w-max no-label editavel group inline-flex items-center"
          >
            <div class="" v-if="data.projeto.nome">
              <!-- <p>Squad Logbit</p> -->
              <OBadge
                size="sm"
                :badge="false"
                :color="returnRGB(data.projeto.cor)"
                square
              >
                <template #content>
                  <p class="text-center mx-auto">{{ data.projeto.nome }}</p>
                </template>
              </OBadge>
            </div>
            <div v-else>Selecione um projeto</div>
            <q-icon
              class="opacity-0 group-hover:opacity-100 relative -right-16"
              name="expand_more"
            ></q-icon>
            <q-popup-edit
              anchor="top left"
              class="w-[26.875rem] p-8"
              @update="(v) => updateValue('projeto')(v)"
              :model-value="projetoSelected"
              ref="popupUpProjeto"
            >
              <p class="mb-16">Selecione um projeto</p>
              <OSelect
                option-value="id"
                option-label="nome"
                size="md"
                behavior="menu"
                label="Projeto"
                use-input
                :auto-save="true"
                v-model="projetoSelected"
                :options="projetoAndSubProjetoOptions"
                @update:model-value="handleProjetoUpdate"
              ></OSelect>
            </q-popup-edit>
          </div>
        </div>

        <q-tabs
          v-model="tab"
          class="text-neutral-100 dark:text-white/90 text-paragraph-2 w-max mt-24 px-24"
          active-color="primary-pure"
          secondary
        >
          <q-tab :ripple="false" name="info" label="Informações gerais"></q-tab>
          <q-tab :ripple="false" name="tarefas" label="Tarefas"></q-tab>
          <q-tab :ripple="false" name="anexos" label="Anexos" disable></q-tab>
          <q-tab :ripple="false" name="chat" label="Chat" disable></q-tab>
        </q-tabs>
      </header>

      <Transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="200"
      >
        <q-tab-panels
          v-if="showTabs"
          v-model="tab"
          animated
          class="flex-1 h-full"
          key="tabs"
        >
          <q-tab-panel name="info">
            <q-scroll-area class="fit">
              <article class="grid-info px-24 pt-24">
                {{ data.projeto }}
                <div>
                  <KanbanSectionHeader
                    text="Tags"
                    icon="svguse:/icons.svg#icon_tags"
                  />

                  <div class="flex gap-8 flex-wrap mt-6">
                    <OBadge
                      size="lg"
                      v-for="tag in data.tag"
                      :badge="true"
                      :key="tag.id"
                      :color="returnRGB(tag.cor_letra)"
                      class="rounded-generic h-32 dark:!text-white/90"
                    >
                      <template #content>
                        <p class="text-center mx-auto" square>{{ tag.nome }}</p>
                      </template>
                    </OBadge>
                    <OButton
                      size="sm"
                      class="!p-0 !w-32 !h-32 bg-neutral-20 dark:bg-white/10 dark:hover:bg-white/20"
                      tertiary
                      @click="$emit('tagButtonClick')"
                    >
                      <q-icon size="20px" name="add"></q-icon>

                      <!-- @update="(v) => updateValue('projeto')(v)" -->
                      <!-- <q-popup-edit
                        anchor="top left"
                        class="w-[26.875rem] p-8"
                        :model-value="tagSelected"
                        ref="popUpTags"
                      >
                        <p class="mb-16">Selecione uma Tag</p>
                        <OSelect
                          option-value="id"
                          option-label="nome"
                          size="md"
                          behavior="menu"
                          label="Projeto"
                          use-input
                          :auto-save="true"
                          v-model="tagSelected"
                          :options="tags"
                          @update:model-value="handleProjetoUpdate"
                        ></OSelect>
                      </q-popup-edit> -->
                    </OButton>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="flex flex-col">
                    <!--  -->
                    <div class="relative flex-1">
                      <KanbanSectionHeader
                        text="Solicitante"
                        icon="svguse:/icons.svg#icon_user"
                      />
                      <div class="mt-4">
                        <AvatarMultiple :items="1" />
                      </div>
                    </div>
                  </div>

                  <div class="relative flex-1">
                    <KanbanSectionHeader
                      text="Responsaveis"
                      icon="svguse:/icons.svg#icon_user"
                    />
                    <div class="mt-4">
                      <AvatarMultiple :items="3" />
                    </div>
                  </div>
                </div>
              </article>
              <span class="kanban-modal-separator"></span>

              <section class="px-24 grid-info">
                <div class="flex gap-16 items-start">
                  <div>
                    <KanbanSectionHeader
                      text="Solicitado"
                      icon="svguse:/icons.svg#icon_date"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable
                        type="date"
                        :value="FData(data.data_criacao)"
                      />
                    </div>
                  </div>
                  <div>
                    <KanbanSectionHeader
                      text="Desejado"
                      icon="svguse:/icons.svg#icon_date"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable
                        :value="FData(data.data_desejada)"
                        @update="
                          (v) =>
                            updateValue('data_desejada')(GLOBAL.FDateBRtoEU(v))
                        "
                        type="date"
                        :editable="true"
                      />
                    </div>
                  </div>
                  <div>
                    <KanbanSectionHeader
                      text="Previsto"
                      icon="svguse:/icons.svg#icon_date"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable
                        :value="FData(data.data_prevista)"
                        @update="
                          (v) =>
                            updateValue('data_prevista')(GLOBAL.FDateBRtoEU(v))
                        "
                        type="date"
                        :editable="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex gap-16 items-start">
                  <div class="flex-1">
                    <KanbanSectionHeader
                      text="Orçado"
                      icon="svguse:/icons.svg#icon_hours"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable
                        :value="FTime(data.tempo_estimado)"
                        :editable="true"
                        :notFormat="true"
                        type="time"
                        @update="(v) => updateValue('tempo_estimado')(v)"
                      />
                    </div>
                  </div>
                  <div class="flex-1">
                    <KanbanSectionHeader
                      text="Decorrido"
                      icon="svguse:/icons.svg#icon_hours"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable
                        :value="FTime(data.tempo_decorrido)"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <span class="kanban-modal-separator"></span>

              <section class="px-24">
                <KanbanSectionHeader
                  text="Descrição"
                  icon="svguse:/icons.svg#icon_descricao"
                  fonte="text-title-3"
                  class="!text-16 !text-neutral-100 dark:!text-white/90"
                />
                <div
                  class="ml-24 pt-16 text-neutral-70 text-paragraph-2 dark:text-white/80"
                >
                  <div class="descricao-content">
                    <div v-html="data.descricao"></div>
                  </div>

                  <div class="flex w-full mt-8 justify-end">
                    <OButton class="" size="md" secondary icon="edit_note">
                      Editar
                      <q-popup-edit
                        anchor="top left"
                        class="w-[800px]"
                        @update="(v) => updateValue('descricao')(v)"
                        :model-value="data.descricao"
                      >
                        <q-editor v-model="data.descricao" min-height="5rem" />
                      </q-popup-edit>
                    </OButton>
                  </div>
                </div>
              </section>

              <span class="kanban-modal-separator"></span>

              <section class="p-24 py-8">
                <div class="flex justify-between">
                  <div
                    class="inline-flex items-center gap-8 text-title-3 !text-16 dark:!text-white/90 text-neutral-100"
                  >
                    <q-icon
                      class="opacity-40"
                      size="20px"
                      name="svguse:/icons.svg#icon_historic"
                    ></q-icon>
                    <p class="">Histórico de atividade</p>
                  </div>

                  <OButton size="sm" secondary>Mostrar Detalhes</OButton>
                </div>
              </section>
              <span class="kanban-modal-separator"></span>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="tarefas">
            <div class="flex-flex-col gap-16">
              <div class="flex justify-between p-24">
                <div class="flex items-center gap-8">
                  <OBadge
                    size="lg"
                    :badge="false"
                    square
                    :clickable="true"
                    class="h-32 cursor-pointer bg-white border border-neutral-100/10 badge-change text-neutral-70 dark:!bg-white/5 dark:text-white/90"
                    :class="{ active: taskActive === 'andamento' }"
                    @click="changeTask"
                  >
                    <template #content>
                      <q-icon
                        size="1.25rem"
                        name="svguse:/icons.svg#icon_andamento"
                      ></q-icon>
                      <p class="font-normal">Tarefas em andamento</p>
                    </template>
                  </OBadge>
                  <OBadge
                    size="lg"
                    :badge="false"
                    square
                    :clickable="true"
                    class="h-32 cursor-pointer bg-white border border-neutral-100/10 badge-change text-neutral-70 dark:!bg-white/5 dark:text-white/90"
                    :class="{ active: taskActive === 'concluidas' }"
                    @click="changeTask"
                  >
                    <template #content>
                      <q-icon
                        size="1.25rem"
                        name="svguse:/icons.svg#icon_concluido"
                      ></q-icon>
                      <p class="font-normal">Tarefas Concluidas</p>
                    </template>
                  </OBadge>
                </div>
              </div>
              <Transition
                :duration="200"
                mode="out-in"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <section v-if="taskActive === 'andamento'" key="andamento">
                  andamento
                </section>
                <section
                  v-else-if="taskActive === 'concluidas'"
                  key="concluidas"
                >
                  concluidas
                </section>
              </Transition>
            </div>
          </q-tab-panel>

          <q-tab-panel name="anexos">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="chat">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sijjt amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </Transition>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed, inject, toRaw } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import OBadge from 'src/components/Badge/OBadge.vue'
import KanbanSectionHeader from './KanbanSectionHeader.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
import KanbanItemEditable from './KanbanItemEditable.vue'
import OButton from 'src/components/Button/OButton.vue'
import GLOBAL from 'src/utils/GLOBAL'
// import KanbanPopoupEdit from './KanbanPopoupEdit.vue'
import OSelect from 'src/components/Select/OSelect.vue'

const { returnRGB, FData, FTime } = GLOBAL

const data = inject('chamado')
const tags = inject('tags')
const projetoAndSubProjetoOptions = inject('projetoAndSubProjetoOptions')
const popupUpProjeto = ref(null)
const tab = ref('info')
const dialogState = ref(false)
const projetoSelected = ref('')
// const projetoOptions = projetoAndSubProjetoOptions

const taskActive = ref('andamento')

const beforeshow = (e) =>
  setTimeout(() => document.body.classList.add('kanban-modal-show'), 300)
const beforehide = (e) => document.body.classList.remove('kanban-modal-show')

const changeTask = () => {
  console.log(taskActive.value)
  taskActive.value =
    taskActive.value === 'andamento' ? 'concluidas' : 'andamento'
}

function updateValue(type) {
  return function (value) {
    data.value[type] = value
    emit('changed')
  }
}

// function updateProjeto(v) {
//   data.value.projeto = v
//   emit('changed')

// }

const emit = defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
  'tagButtonClick',
  'changed',
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel, onDialogShow } =
  useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

// function filterFn(val, update) {
//   debugger
//   update(() => {
//     const needle = val.toLowerCase()
//     options.value = options.value.filter(
//       (v) => v.toLowerCase().indexOf(needle) > -1
//     )
//   })
// }

function handleProjetoUpdate(v) {
  popupUpProjeto.value.hide()
  updateValue('projeto')(v)
}

const showTabs = ref(false)

watch(dialogState, () => {
  let time
  if (dialogState.value) {
    time = setTimeout(() => (showTabs.value = true), 100)
  } else {
    clearTimeout(time)
    showTabs.value = false
    tab.value = 'info'
  }
})

defineExpose({ dialogRef })
</script>

<style lang="sass">
:root
  --kanban-modal-bg: rgb(var(--neutral-10))
.body--dark
  --kanban-modal-bg: rgb(var(--d-neutral-30))

.body--dark
  .kanban-modal .q-tab--active
    background: rgb(var(--d-neutral-30)) !important
    color: white !important
    border-color: rgba(var(--white),0.05)

.q-dialog__backdrop
  backdrop-filter: blur(.3125rem)
</style>

<style lang="sass" scoped>
@import "src/css/quasar/variables.sass"
.kanban-modal
  height: 95vh
  width: 55rem
  background: var(--kanban-modal-bg)
  border-radius: .375rem
  overflow: hidden
  display: flex
  flex-direction: column
  .descricao-content
    :deep(img)
      max-height: 220px
      margin: 8px 0
      border-radius: $generic-border-radius
      object-fit: contain
.kanban-modal-separator
  height: .0625rem
  width: 100%
  background: rgba(var(--neutral-100), 0.1)
  margin: 16px 0
  border: 0
  display: block
  .body--dark &
    background: rgba(var(--white), 0.05)


.grid-info
   display: grid
   grid-template-columns: minmax(35rem,1fr) minmax( 16rem,1fr)
   column-gap: 16px


.kanban-modal
  .editavel
    cursor: pointer
    border: .0625rem solid transparent
    transition: .3s
    border-radius: .1875rem
    &:hover
      border-color: rgba(var(--neutral-100), 0.3)
      background: rgba(var(--neutral-30),1)

  .body--dark &
    .editavel
      &:hover
        border-color: rgba(var(--white), 0.1)
        background: rgba(var(--white), 0.2) !important
</style>
