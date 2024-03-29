<template>
  <q-dialog
    v-model="dialogState"
    ref="dialogRef"
    transition-hide="fade"
    transition-duration="200"
    @before-hide="beforehide"
    @hide="onDialogHide"
    @before-show="beforeshow"
    @show="onShow"
  >
    <q-card class="kanban-modal q-dialog-plugin remove-styles">
      <header class="bg-neutral-30 dark:bg-d-neutral-10">
        <div>
          <div
            class="px-24 pt-24 pb-6 flex items-center gap-12 group flex-nowrap"
          >
            <q-icon
              class="w-24 h-24"
              name="svguse:/icons.svg#icon_screen"
            ></q-icon>

            <KanbanItemEditable
              class="!text-title-2 !p-0 !bg-transparent !pl-4 relative -l-4 left !pr-32 !h-max"
              popup-class="!min-w-[300px]"
              :editable="true"
              :value="data.titulo"
              @update="(v) => updateValue('titulo')(v)"
              popupClass="w-[31.25rem]"
              placeholder="Titulo"
            ></KanbanItemEditable>
          </div>

          <div>
            <!-- SUBPROJETO -->
            <div
              v-if="data.projeto.tem_subprojetos"
              class="ml-[60px] w-max no-label relative editavel group inline-flex items-center pr-24 mr-4 px-4"
            >
              <div class="triangulo-editavel"></div>
              <div
                v-if="data.sub_projeto?.nome"
                class="text-neutral-100/70 dark:text-white/70 text-paragraph-1"
              >
                {{ data.sub_projeto.nome }}
              </div>

              <div
                v-else-if="
                  data.projeto.tem_subprojetos &&
                  !data.sub_projeto &&
                  subProjetosProjetoAtivo?.length
                "
              >
                Selecione um Subprojeto
              </div>

              <q-icon
                class="opacity-0 group-hover:opacity-100 absolute right-4"
                name="expand_more"
              ></q-icon>

              <KanbanItemEditableSelect
                @updateValue="(v) => updateValue('sub_projeto')(v)"
                text="Selecione um Subprojeto"
                :options="subProjetosProjetoAtivo"
                selectLabel="Subprojeto"
                :selected="data.sub_projeto"
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

            <!--   PROJETO -->
            <div
              class="w-max no-label relative editavel group inline-flex items-center pr-40"
              :class="`${!data.projeto.tem_subprojetos && 'ml-[60px]'}`"
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
                :options="projetos"
                selectLabel="Projeto"
                :selected="data.projeto"
              >
              </KanbanItemEditableSelect>
            </div>
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
                    >
                      <q-tooltip v-bind="tooltipProps"
                        >Adicionar/Remover</q-tooltip
                      >
                      <q-icon
                        size="1.25rem"
                        name="svguse:/icons.svg#icon_edit"
                      ></q-icon>
                      <KanbanItemEditableSelect
                        type="tag"
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
                    <div class="flex-1">
                      <KanbanSectionHeader
                        text="Solicitante"
                        icon="svguse:/icons.svg#icon_user"
                      />
                      <div class="mt-4 flex relative h-32 w-[6.25rem]">
                        <AvatarSingle
                          :index="0"
                          :item="data.user_criacao"
                          side="left"
                        >
                          <q-tooltip anchor="top middle" self="center middle">{{
                            data.user_criacao.nome
                          }}</q-tooltip>
                        </AvatarSingle>
                      </div>
                    </div>
                  </div>

                  <div class="relative flex-1 group">
                    <KanbanSectionHeader
                      text="Responsaveis"
                      icon="svguse:/icons.svg#icon_user"
                    />
                    <div
                      class="mt-4 flex items-center justify-start flex-nowrap"
                    >
                      <div class="flex relative h-32 w-[6.25rem]">
                        <!-- <div
                          v-for="(item, index) in data.responsaveis"
                          :key="item.id"
                        >
                          <AvatarSingle :index="index" :item="item" side="left">
                            <q-tooltip
                              anchor="top middle"
                              self="center middle"
                              >{{ item.nome }}</q-tooltip
                            >
                          </AvatarSingle>
                        </div> -->

                        <AvatarMultiple
                          side="left"
                          :list="data.responsaveis"
                        ></AvatarMultiple>
                      </div>

                      <OButton
                        v-if="false"
                        size="sm"
                        class="!p-0 !w-32 !h-32 bg-neutral-20 dark:bg-white/10 dark:hover:bg-white/20 shrink-0 opacity-0 group-hover:opacity-100"
                        tertiary
                      >
                        <q-tooltip v-bind="tooltipProps"
                          >Adicionar/Remover</q-tooltip
                        >
                        <q-icon
                          size="1.25rem"
                          name="svguse:/icons.svg#icon_edit"
                        ></q-icon>
                        <KanbanItemEditableSelect
                          :options="usuarios"
                          text="Selecione os Responsaveis"
                          @updateValue="
                            (v) => updateValue('responsaveis')(unref(v))
                          "
                          :selectProps="{
                            multiple: true,
                            'use-chips': true,
                            fotoKey: 'foto',
                          }"
                          :selected="data.responsaveis"
                          :closeOnSelect="false"
                        >
                          <template #selected-item="scope">
                            <OBadge
                              size="sm"
                              class="rounded-generic h-32 dark:!text-white/90"
                              :key="scope.opt.id"
                              removable
                              @remove="scope.toggleOption(scope.opt)"
                            >
                              <template #content>
                                <AvatarSingle
                                  class="!w-24 !h-24"
                                  :index="0"
                                  :item="scope.opt"
                                  side="left"
                                ></AvatarSingle>
                                <p class="text-center mx-auto pl-20" square>
                                  {{ scope.opt.nome }}
                                </p>
                              </template>
                            </OBadge>
                          </template>

                          <template
                            #option="{ itemProps, opt, selected, toggleOption }"
                          >
                            <q-item v-bind="itemProps">
                              <q-item-section>
                                <q-item-label class="flex items-center gap-8">
                                  <AvatarSingle
                                    class="!w-32 !h-32"
                                    :index="0"
                                    :item="opt"
                                    side="left"
                                  ></AvatarSingle>

                                  <p
                                    class="!text-neutral-70 dark:!text-white/90 ml-24"
                                  >
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
                        </KanbanItemEditableSelect>
                      </OButton>
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
                        :editable="user.is_staff"
                      />
                      <!-- :editable="user.is_staff" -->
                      <!-- //uswer.stagg -->
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
                        @updateValue="
                          (v) => updateValue('descricao')(sanitizeHTML(v))
                        "
                        text="Descrição"
                      ></KanbanItemEditableEditor>
                    </OButton>
                  </div>
                </div>
              </section>

              <div>
                <span class="kanban-modal-separator"></span>

                <section class="p-24 py-8">
                  <div class="flex justify-between">
                    <div
                      class="inline-flex items-center gap-8 text-title-3 !text-16 dark:!text-white/90 text-neutral-100"
                    >
                      <q-icon
                        class="opacity-40"
                        size="1.25rem"
                        name="svguse:/icons.svg#icon_historic"
                      ></q-icon>
                      <p class="">Histórico de atividade</p>
                    </div>

                    <OButton
                      size="sm"
                      secondary
                      v-if="!historicoAtividade"
                      @click="handleHistorico"
                      icon="expand_more"
                      >Mostrar Detalhes</OButton
                    >
                    <OButton
                      @click="handleHiddeAtividade"
                      size="sm"
                      icon="expand_less"
                      secondary
                      v-else
                      >Ocultar</OButton
                    >

                    <div
                      class="w-full shrink-0 mt-16"
                      v-if="historicoAtividade && logAlt.length"
                    >
                      <q-virtual-scroll
                        style="max-height: 100%"
                        :items="logAltReverse"
                        v-slot="{ item }"
                        class="flex flex-col gap-16 w-full virtual-scroll"
                      >
                        <div class="flex items-start gap-4 flex-nowrap">
                          <OAvatar
                            size="2rem"
                            :foto="item.dados_usuario.foto"
                          ></OAvatar>

                          <div class="flex flex-col">
                            <div class="flex gap-4 text-paragraph-2">
                              <p class="font-medium capitalize">
                                {{ item.dados_usuario.nome }}
                              </p>
                              <div class="opacity-70">
                                {{ removeHTMLFromString(item.frase) }}
                              </div>
                            </div>

                            <p class="opacity-70 text-paragraph-3">
                              {{ FDataAndTime(item.data) }}
                            </p>
                          </div>
                        </div>
                      </q-virtual-scroll>
                    </div>
                    <div
                      v-else-if="
                        historicoAtividade && !logAlt.length && !logLoading
                      "
                      class="w-full mt-16"
                    >
                      <div>
                        <q-icon
                          class="block opacity-30 mx-auto"
                          name="fluorescent"
                          size="2.5rem"
                        ></q-icon>
                        <p class="text-paragraph-2 text-center opacity-40">
                          Sem Alterações para exibir.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <span class="kanban-modal-separator"></span>
              </div>
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
                        size="20px"
                        name="svguse:/icons.svg#icon_andamento"
                      ></q-icon>
                      <p class="font-normal">Tarefas em andamento</p>
                      <span>{{ tasksChamadoPendente.length }}</span>
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
                        size="20px"
                        name="svguse:/icons.svg#icon_concluido"
                      ></q-icon>
                      <p class="font-normal">Tarefas Concluidas</p>
                      <span>{{ tasksChamadoConcluido.length }}</span>
                    </template>
                  </OBadge>
                </div>
              </div>

              <Transition
                :duration="100"
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
                    <div v-if="taskLoading" class="flex flex-col gap-4 mx-24">
                      <q-skeleton type="rect" class="h-[4rem]" />
                      <q-skeleton type="rect" class="h-[4rem]" />
                      <q-skeleton type="rect" class="h-[4rem]" />
                      <q-skeleton type="rect" class="h-[4rem]" />
                    </div>
                    <div
                      v-else-if="!taskLoading && !tasksChamadoPendente.length"
                      class="text-paragraph-2 text-center mt-12"
                    >
                      <div>
                        <q-icon
                          class="block mx-auto opacity-30"
                          name="fluorescent"
                          size="2.5rem"
                        ></q-icon>
                        <p class="opacity-40">Sem Tarefas para exibir.</p>
                      </div>
                    </div>

                    <div
                      v-else
                      class="task-wrapper dark:border-transparent border rounded-generic mx-24 border-neutral-30"
                    >
                      <KanbanTaskItem
                        v-for="item in tasksChamadoPendente"
                        :key="item.id"
                        :task="item"
                        :openTaskViewModal="openTaskViewModal"
                      ></KanbanTaskItem>
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
                    <div v-if="taskLoading" class="flex flex-col gap-4 mx-24">
                      <q-skeleton type="rect" class="h-[4rem]" />
                      <q-skeleton type="rect" class="h-[4rem]" />
                      <q-skeleton type="rect" class="h-[4rem]" />
                      <q-skeleton type="rect" class="h-[4rem]" />
                    </div>

                    <div
                      v-else-if="!taskLoading && !tasksChamadoConcluido.length"
                      class="text-paragraph-2 text-center mt-12"
                    >
                      <div>
                        <q-icon
                          class="block mx-auto opacity-30"
                          name="fluorescent"
                          size="2.5rem"
                        ></q-icon>
                        <p class="opacity-40">Sem Tarefas para exibir.</p>
                      </div>
                    </div>

                    <div
                      v-else
                      class="task-wrapper dark:border-transparent border rounded-generic mx-24 border-neutral-30"
                    >
                      <KanbanTaskItem
                        v-for="task in tasksChamadoConcluido"
                        :key="task.id"
                        :task="task"
                        :openTaskViewModal="openTaskViewModal"
                      ></KanbanTaskItem>
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
import { storeToRefs } from 'pinia'
import { useDialogPluginComponent } from 'quasar'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import OButton from 'src/components/Button/OButton.vue'

import { useTaskStore } from 'src/stores/tasks/tasks.store'
import GLOBAL from 'src/utils/GLOBAL'
import { inject, ref, unref, watch, computed, nextTick } from 'vue'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import KanbanItemEditable from './KanbanItemEditable.vue'
import KanbanItemEditableEditor from './KanbanItemEditableEditor.vue'
import KanbanItemEditableSelect from './KanbanItemEditableSelect.vue'
import KanbanSectionHeader from './KanbanSectionHeader.vue'
import KanbanTaskItem from './KanbanTaskItem.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
// import emitter from 'src/boot/emitter'

// emitter.on('createTask', () => {})
const openTaskViewModal = inject('openTaskViewModal')

const {
  returnRGB,
  FData,
  FTime,
  FDataAndTime,
  sanitizeHTML,
  removeHTMLFromString,
} = GLOBAL

const data = inject('chamado')
const tagsList = inject('tagsList')
const usuarios = inject('usuarios')
const user = inject('user')

const projetos = inject('projetos')
const subProjetos = inject('subProjetos')

const logAlt = inject('logAlt')
const getLogAlt = inject('getLogAlt')
const historicoAtividade = ref(false)
const logLoading = ref(false)

const logAltReverse = computed(() => [...logAlt.value].reverse())

const subProjetosProjetoAtivo = computed(() =>
  subProjetos.value.filter((p) => p.caso_pai === data.value.projeto.id)
)

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
    emit('changed')
    setTimeout(() => getLogAlt(data.value.id), 500)
  }
}

const emit = defineEmits([
  ...useDialogPluginComponent.emits,
  'tagButtonClick',
  'changed',
])

// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel, onDialogShow } =
  useDialogPluginComponent()

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

const beforehide = (e) => {
  document.body.classList.remove('kanban-modal-show')
  tasksChamado.value = []
  historicoAtividade.value = false
  logAlt.value = []
}

const taskLoading = ref(true)
async function handleGetTasks() {
  taskLoading.value = true
  await getTasks(`&chamado__id=${data.value.id}&ordering=entrega_data_desejada`)
  taskLoading.value = false
}

function onShow() {
  handleGetTasks()
}

async function handleHistorico() {
  logLoading.value = true
  historicoAtividade.value = true
  await getLogAlt(data.value.id)
  logLoading.value = false
}

function handleHiddeAtividade() {
  historicoAtividade.value = false
  logAlt.value = []
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

// .q-dialog__backdrop
//   backdrop-filter: blur(5px)
</style>

<style lang="sass" scoped>
@import "src/css/quasar/variables.sass"
.kanban-modal
  height: 95vh
  max-height: 62.5rem
  width: 880px
  background: var(--kanban-modal-bg)
  border-radius: 6px
  overflow: hidden
  display: flex
  flex-direction: column
  .descricao-content
    :deep(img)
      max-height: 13.75rem
      margin: .5rem 0
      border-radius: $generic-border-radius
      object-fit: contain
    :deep(ul)
        li
          list-style: circle !important
          margin-left: .75rem !important

    :deep(ol)
      li
        list-style: auto
        margin-left: .75rem
    :deep(a[href])
      color: rgb(var(--neutral-100))
      cursor: pointer !important
      &:hover
        color: rgb(var(--primary-pure)) !important
    :deep(hr)
      border-color: rgba(var(--neutral-100),0.1)

.kanban-modal-separator
  height: 1px
  width: 100%
  background: rgba(var(--neutral-100), 0.1)
  margin: 1rem 0
  border: 0
  display: block
  .body--dark &
    background: rgba(var(--white), 0.05)


.grid-info
   display: grid
   grid-template-columns: minmax(560px,1fr) minmax( 256px,1fr)
   column-gap: 1rem


.kanban-modal
  .editavel
    cursor: pointer
    border: 1px solid transparent
    transition: .3s
    border-radius: 3px
    &:hover
      border-color: rgba(var(--neutral-100), 0.3)
      background: rgba(var(--neutral-30),1)

  .body--dark &
    .editavel
      &:hover
        border-color: rgba(var(--white), 0.1)
        background: rgba(var(--white), 0.2) !important

    .descricao-content
      :deep(a[href])
        color: white
        text-decoration: underline
      :deep(hr)
        border-color: rgba(var(--white),0.1)


.virtual-scroll
  :deep(.q-virtual-scroll__content)
    display: flex
    flex-direction: column
    gap:0.5rem
    widt:100%
</style>
