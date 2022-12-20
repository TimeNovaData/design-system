<template>
  <q-dialog
    v-model="dialogState"
    ref="dialogRef"
    transition-hide="slide-down"
    @hide="onDialogHide"
    @before-show="beforeshow"
    @before-hide="beforehide"
    @show="onShow"
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
              class="!text-title-2 !p-0 !bg-transparent min-w-[500px] !pl-4 relative -l-4"
              popup-class="!min-w-[18.75rem]"
              :editable="true"
              :value="data.titulo"
              @update="(v) => updateValue('titulo')(v)"
            ></KanbanItemEditable>
          </div>

          <!--   PROJETO -->
          <div
            class="ml-[3.75rem] w-max no-label relative editavel group inline-flex items-center pr-40"
          >
            <div class="" v-if="data.projeto.nome">
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
              class="opacity-0 group-hover:opacity-100 absolute right-4"
              name="expand_more"
            ></q-icon>

            <KanbanItemEditableSelect
              @updateValue="(v) => updateValue('projeto')(v)"
              text="Selecione um projeto"
              :options="projetoAndSubProjetoOptions"
              selectLabel="Projeto"
              :selected="data.projeto"
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
            </KanbanItemEditableSelect>
          </div>
        </div>

        <q-tabs
          v-model="tab"
          class="text-neutral-100 dark:text-white/90 text-paragraph-2 w-max mt-24 px-24"
          active-color="primary-pure"
          secondary
        >
          <q-tab :ripple="false" name="info" label="Informações gerais"></q-tab>
          <q-tab :ripple="false" name="tarefas" label="Tarefas">
            <q-badge
              v-if="data.quantidade_tasks_pendentes"
              floating
              class="w-16 h-16 rounded-full place-items-center p-0 flex bg-neutral-100/30 justify-center text-10"
              >{{ data.quantidade_tasks_pendentes }}
            </q-badge>
          </q-tab>
          <q-tab
            :ripple="false"
            name="anexos"
            label="Anexos"
            disable
            class="!opacity-10"
          ></q-tab>
          <q-tab
            :ripple="false"
            name="chat"
            label="Chat"
            disable
            class="!opacity-10"
          ></q-tab>
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
            <q-scroll-area class="fit overflow-x-hidden">
              <article class="grid-info px-24 pt-24">
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
                      <q-tooltip v-bind="tooltipProps"
                        >Adicionar/Remover</q-tooltip
                      >
                      <q-icon size="20px" name="add"></q-icon>
                      <KanbanItemEditableSelect
                        :options="tagsList"
                        text="Selecione uma Tag"
                        @updateValue="(v) => updateValue('tag')(unref(v))"
                        :selectProps="{
                          multiple: true,
                          'use-chips': true,
                        }"
                        :selected="data.tag"
                        :closeOnSelect="false"
                      >
                        <!-- <template #option="scope">
                          <q-item
                            v-bind="scope.itemProps"
                            class="items-center gap-8"
                            :key="scope.opt.id"
                          >
                            <q-badge
                              rounded
                              class="shrink-0 w-8 h-8"
                              :style="{ background: scope.opt.cor_letra }"
                            ></q-badge>
                            {{ scope.opt.nome }}
                          </q-item>
                        </template> -->

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
                      </KanbanItemEditableSelect>
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
                        <AvatarSingle :index="1" :item="data.user_criacao">
                          <q-tooltip anchor="top middle" self="center middle">{{
                            data.user_criacao.nome
                          }}</q-tooltip>
                        </AvatarSingle>
                      </div>
                    </div>
                  </div>

                  <div class="relative flex-1">
                    <KanbanSectionHeader
                      text="Responsaveis"
                      icon="svguse:/icons.svg#icon_user"
                    />
                    <div class="mt-4">
                      <div
                        v-for="(item, index) in data.responsaveis"
                        :key="item.id"
                      >
                        <AvatarSingle :index="index" :item="item">
                          <q-tooltip anchor="top middle" self="center middle">{{
                            item.nome
                          }}</q-tooltip>
                        </AvatarSingle>
                      </div>
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
                        :notFormat="true"
                        type="time"
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
                  <div class="descricao-content break-words">
                    <div v-html="data.descricao"></div>
                  </div>

                  <div class="flex w-full mt-8 justify-end">
                    <OButton
                      class="!p-4 !px-8"
                      size="sm"
                      secondary
                      icon="edit_note"
                      tabindex="0"
                    >
                      Editar
                      <KanbanItemEditableEditor
                        :data="data.descricao"
                        @updateValue="(v) => updateValue('descricao')(v)"
                        text="Descrição"
                      ></KanbanItemEditableEditor>
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
            <div class="flex flex-col gap-16 h-full">
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
                <section
                  class="flex-1"
                  v-if="taskActive === 'andamento'"
                  key="andamento"
                >
                  <q-scroll-area>
                    <div
                      v-if="tasksChamadoPendente.length"
                      class="task-wrapper border rounded-generic mx-24 border-neutral-30"
                    >
                      <div v-for="task in tasksChamadoPendente" :key="task.id">
                        <KanbanTaskItem :task="task"></KanbanTaskItem>
                      </div>
                    </div>
                    <div
                      v-else
                      class="text-neutral-60 text-paragraph-2 text-center mt-12"
                    >
                      Sem Tarefas para exibir.
                    </div>
                    <span class="block h-42"></span>
                  </q-scroll-area>
                </section>

                <section
                  class="flex-1"
                  v-else-if="taskActive === 'concluidas'"
                  key="concluidas"
                >
                  <q-scroll-area>
                    <div
                      v-if="tasksChamadoConcluido.length"
                      class="task-wrapper border rounded-generic mx-24 border-neutral-30"
                    >
                      <div v-for="task in tasksChamadoConcluido" :key="task.id">
                        <KanbanTaskItem :task="task"></KanbanTaskItem>
                      </div>
                    </div>
                    <div
                      v-else
                      class="text-neutral-60 text-paragraph-2 text-center mt-12"
                    >
                      Sem Tarefas para exibir.
                    </div>
                    <span class="block h-42"></span>
                  </q-scroll-area>
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
import { ref, watch, onMounted, inject, toRaw, unref, onUnmounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import OBadge from 'src/components/Badge/OBadge.vue'
import KanbanSectionHeader from './KanbanSectionHeader.vue'
import KanbanItemEditable from './KanbanItemEditable.vue'
import OButton from 'src/components/Button/OButton.vue'
import GLOBAL from 'src/utils/GLOBAL'
// import KanbanPopoupEdit from './KanbanPopoupEdit.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import KanbanItemEditableSelect from './KanbanItemEditableSelect.vue'
import KanbanItemEditableEditor from './KanbanItemEditableEditor.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import OCounter from 'src/components/Counter/OCounter.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import { storeToRefs } from 'pinia'
import KanbanTaskItem from './KanbanTaskItem.vue'

const { returnRGB, FData, FTime } = GLOBAL

const data = inject('chamado')
const tagsList = inject('tagsList')

const projetoAndSubProjetoOptions = inject('projetoAndSubProjetoOptions')
const tab = ref('info')
const dialogState = ref(false)

const { getTasks } = useTaskStore()
const { tasksChamado, tasksChamadoPendente, tasksChamadoConcluido } =
  storeToRefs(useTaskStore())

const taskActive = ref('andamento')

const changeTask = () => {
  console.log(taskActive.value)
  taskActive.value =
    taskActive.value === 'andamento' ? 'concluidas' : 'andamento'
}

function updateValue(type) {
  return function (value) {
    data.value[type] = value
    console.log('value', value)
    console.log('type', type)
    console.log('data.value[type]', data.value[type])
    emit('changed')
  }
}

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

const beforeshow = (e) =>
  setTimeout(() => document.body.classList.add('kanban-modal-show'), 300)
const beforehide = (e) => document.body.classList.remove('kanban-modal-show')

function onShow() {
  getTasks(`&chamado__id=${data.value.id}`)
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

const tooltipProps = {
  anchor: 'top middle',
  self: 'bottom middle',
  offset: [10, 10],
}

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
  max-height: 1000px
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
    :deep(ul)
        li
          list-style: circle !important
          margin-left: 12px !important

    :deep(ol)
      li
        list-style: auto
        margin-left: 12px
    :deep(a[href])
      color: rgb(var(--neutral-100))
      cursor: pointer !important
      &:hover
        color: rgb(var(--primary-pure)) !important
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

    .descricao-content :deep(a[href])
      color: white
      text-decoration: underline
</style>
