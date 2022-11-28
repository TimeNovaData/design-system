<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-hide="slide-down"
    v-model="dialogState"
    @before-show="beforeshow"
    @before-hide="beforehide"
  >
    <q-card class="kanban-modal q-dialog-plugin remove-styles">
      <header class="bg-neutral-30 dark:bg-d-neutral-20">
        <div>
          <div class="text-title-2 px-24 pt-24 pb-6 flex items-center gap-12">
            <q-icon
              class="w-24 h-24"
              name="svguse:/icons.svg#icon_screen"
            ></q-icon>
            <p class="">BUGS e melhorias gerais já priorizadas</p>
          </div>
          <div class="flex items-center ml-[2.25rem] gap-12 px-24">
            <p>Squad Logbit</p>
            <OBadge size="sm" :badge="false" bg="--d-success" square class="">
              <template #content>
                <p class="text-center mx-auto">Assessment coolers</p>
              </template>
            </OBadge>
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
          <q-tab :ripple="false" name="anexos" label="Anexos"></q-tab>
          <q-tab :ripple="false" name="chat" label="Chat"></q-tab>
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
                <div>
                  <KanbanSectionHeader
                    text="Tags"
                    icon="svguse:/icons.svg#icon_tags"
                  />

                  <div class="flex gap-8 flex-wrap mt-6">
                    <OBadge
                      size="lg"
                      v-for="item in 9"
                      :badge="true"
                      :key="item"
                      bg="--alert-warning"
                      class="rounded-generic h-32"
                    >
                      <template #content>
                        <p class="text-center mx-auto" square>Tag</p>
                      </template>
                    </OBadge>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="flex flex-col">
                    <!--  -->
                    <div class="relative">
                      <KanbanSectionHeader
                        text="Solicitante"
                        icon="svguse:/icons.svg#icon_user"
                      />
                      <div>
                        <AvatarMultiple :items="1" />
                      </div>
                    </div>
                  </div>

                  <div class="relative">
                    <KanbanSectionHeader
                      text="Responsaveis"
                      icon="svguse:/icons.svg#icon_user"
                    />
                    <AvatarMultiple :items="3" />
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
                        value="16/09/2022"
                        :editable="true"
                        type="date"
                      />
                    </div>
                  </div>
                  <div>
                    <KanbanSectionHeader
                      text="Desejado"
                      icon="svguse:/icons.svg#icon_date"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable value="17/09/2022" />
                    </div>
                  </div>
                  <div>
                    <KanbanSectionHeader
                      text="Previsto"
                      icon="svguse:/icons.svg#icon_date"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable value="18/09/2022" />
                    </div>
                  </div>
                </div>
                <div class="flex gap-16 items-start">
                  <div>
                    <KanbanSectionHeader
                      text="Orçado"
                      icon="svguse:/icons.svg#icon_hours"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable
                        value="19h 30m"
                        :editable="true"
                        type="time"
                      />
                    </div>
                  </div>
                  <div>
                    <KanbanSectionHeader
                      text="Decorrido"
                      icon="svguse:/icons.svg#icon_hours"
                    />

                    <div class="mt-6">
                      <KanbanItemEditable value="1h 24m" />
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
                  <p>
                    Cálculo do meu score da tela home tá errado(tem que ser a
                    média do score dos módulos e o score dos módulos tem que ser
                    a média do score dos itens)
                  </p>
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
                      size="1.25rem"
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
                        size="20px"
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
                        size="20px"
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
import { ref, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import OBadge from 'src/components/Badge/OBadge.vue'
import KanbanSectionHeader from './KanbanSectionHeader.vue'
import AvatarMultiple from 'src/components/Avatar/AvatarMultiple.vue'
import KanbanItemEditable from './KanbanItemEditable.vue'
import OButton from 'src/components/Button/OButton.vue'

const tab = ref('info')
const dialogState = ref(false)
const props = defineProps({
  // ...your custom props
})
const taskActive = ref('andamento')

const beforeshow = (e) =>
  setTimeout(() => document.body.classList.add('kanban-modal-show'), 300)
const beforehide = (e) => document.body.classList.remove('kanban-modal-show')

const changeTask = () => {
  console.log(taskActive.value)
  taskActive.value =
    taskActive.value === 'andamento' ? 'concluidas' : 'andamento'
}

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
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
  backdrop-filter: blur(5px)
</style>

<style lang="sass" scoped>
.kanban-modal
  height: 95vh
  width: 880px
  background: var(--kanban-modal-bg)
  border-radius: 6px
  overflow: hidden
  display: flex
  flex-direction: column

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
</style>
