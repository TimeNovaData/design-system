<template>
  <header class="h-[404px]">
    <div class="h-full">
      <img class="h-full object-cover w-full object-right" :src="bg" alt="" />
    </div>
  </header>
  <div class="container relative">
    <div class="flex items-start mt-[-255px] mb-32">
      <div class="mr-24">
        <OAvatar
          :foto="avatar"
          size="160px"
          class-avatar="border-2 border-white"
          style="box-sizing: initial"
        ></OAvatar>
      </div>
      <div class="usuarios">
        <div class="user-name">
          <div></div>

          <p class="text-caps-2 text-primary-pure">Usuário</p>

          <div class="colaborador flex">
            <p class="text-white">Andrei Muniz</p>
            <div class="icon">X</div>
            <!-- <KanbanItemEditableSelect
                text="Selecione um Projeto"
                selectLabel="Projeto"
                :options="projetos"
                :selected="projeto !== {} ? projeto : null"
                :clearable="false"
                @updateValue="(v) => $emit('updateSelect', v)"
                ref="itemEditableSelect"
              ></KanbanItemEditableSelect> -->
          </div>
        </div>
        <div class="user-infos flex gap-32">
          <div class="flex flex-col justify-between">
            <p class="text-caps-3 text-white/70 mb-2">TRABALHANDO EM</p>

            <div class="flex items-center">
              <q-icon
                name="svguse:/icons.svg#icon_suitcase"
                class="text-primary-pure mr-8"
                size="1.5rem"
              >
              </q-icon>
              <p class="text-headline-4 text-white">
                Design System + Telas HUB | Novadata
              </p>
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <p class="text-caps-3 text-white/70 mb-2">Data de aniversário</p>
            <div class="flex items-center">
              <q-icon
                name="svguse:/icons.svg#icon_calendar_check"
                class="text-primary-pure mr-8"
                size="1.5rem"
              >
              </q-icon>
              <p class="text-headline-4 text-white">07/07/2000</p>
            </div>
          </div>

          <div class="flex flex-col justify-between">
            <p class="text-caps-3 text-white/70 mb-2">Equipe</p>
            <div class="relative h-[30px]">
              <AvatarMultipleVue :list="listAvatar"></AvatarMultipleVue>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="tasks" class="bg-neutral-10">
      <div class="header-wrapper flex items-center justify-between p-16">
        <div class="item-1 flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_menu_tasks"
            class="text-primary-pure mr-6"
            size="1.5rem"
          ></q-icon>
          <p class="text-title-4">Minhas Tasks</p>
        </div>
        <div class="item-2">
          <OButton size="md" primary>
            <q-icon
              name="svguse:/icons.svg#icon_add_task"
              size="1.5rem"
              color="text-neutral-100 "
            ></q-icon>
            Nova Task
          </OButton>
          <OButton class="ml-8" size="md" secondary>
            <q-icon name="svguse:/icons.svg#icon_filtros"></q-icon>

            Filtrar
          </OButton>
        </div>
      </div>

      <div class="tasks-grid">
        <div class="flex w-full">
          <div class="flex items-center w-full">
            <div class="mx-auto w-full">
              <div class="grid grid-cols-1 gap-2 py-4">
                <div class="">
                  <div class="base-grid px-16">
                    <p class="empty-col"></p>
                    <p class="text-headline-3 pl-16">Task</p>
                    <p class="text-headline-3 pl-16">Responsável</p>
                    <p class="text-headline-3 pl-16">Urgência</p>
                    <p class="text-headline-3 pl-16">Data de Criação</p>
                    <p class="text-headline-3 pl-16">Data Desejada</p>
                    <p class="text-headline-3 pl-16">Data Prevista</p>
                  </div>

                  <ul>
                    <li
                      class="task-item bg-white border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden px-16 py-[7px]"
                    >
                      <div class="base-grid">
                        <div class="flex justify-between items-center">
                          <q-icon
                            name="svguse:/icons.svg#icon_drag"
                            size="22px"
                          ></q-icon>
                          <q-icon
                            name="svguse:/icons.svg#icon_check_circle"
                            size="22px"
                          ></q-icon>
                        </div>

                        <div class="pl-16">
                          <p class="text-paragraph-2 text-neutral-100">
                            Design System + Telas HUB | Novadata
                          </p>
                          <p class="text-paragraph-3 text-neutral-70">
                            Projeto: HUB
                          </p>
                        </div>
                        <div class="pl-16 relative">
                          <div class="flex items-center">
                            <div class="relative w-40 h-40 mr-8">
                              <AvatarSingle
                                class="!w-40 !h-40"
                                :index="0"
                                side="left"
                                :item="listAvatar[0]"
                              />
                            </div>
                            <div>
                              <p class="text-paragraph-2 text-neutral-100">
                                Você
                              </p>
                              <p class="text-paragraph-3 text-neutral-70">
                                Criado por: Bernardo
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="pl-16">
                          <UrgenciaStatus text="Moderada" />
                        </div>
                        <div class="pl-16">
                          <div class="flex items-center">
                            <q-icon
                              name="svguse:/icons.svg#icon_calendar_create"
                              size="24px"
                              class="mr-8"
                            >
                            </q-icon>
                            <div>
                              <p class="text-paragraph-2 text-neutral-100">
                                09/12/2022
                              </p>
                              <p class="text-paragraph-3 text-neutral-70">
                                Sexta
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="pl-16">
                          <div class="flex items-center">
                            <q-icon
                              name="svguse:/icons.svg#icon_calendar_heart"
                              size="24px"
                              class="mr-8"
                            >
                            </q-icon>
                            <div>
                              <p class="text-paragraph-2 text-neutral-100">
                                12/12/2022
                              </p>
                              <p class="text-paragraph-3 text-neutral-70">
                                Terça
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="pl-16">
                          <div class="flex items-center">
                            <q-icon
                              name="svguse:/icons.svg#icon_date_time"
                              size="24px"
                              class="mr-8 text-neutral-100/40"
                            >
                            </q-icon>
                            <div>
                              <p class="text-paragraph-2">12/12/2022</p>
                              <p class="text-paragraph-3 text-neutral-70">
                                Terça
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="pl-16">
                          <TimerTask />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="tasks-finalizadas">
      <o-accordion
        class="border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden"
      >
        <template v-slot:header>
          <div class="flex items-center flex-1">
            <q-item-section avatar class="w-32">
              <q-icon
                name="svguse:/icons.svg#icon_concluido"
                size="sm"
                class="text-primary-pure mr-6"
              />
            </q-item-section>
            <q-item-section>Tasks Finalizadas </q-item-section>
          </div>
        </template>

        <p>TODO</p>
      </o-accordion>
    </section>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import bg from 'src/assets/image/bg-single-usuario.png'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import avatar from 'src/assets/image/gravatar.jpg'
import KanbanItemEditableSelect from 'src/components/Kanban/KanbanItemEditableSelect.vue'
import AvatarMultipleVue from 'src/components/Avatar/AvatarMultiple.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OButton from 'src/components/Button/OButton.vue'
import UrgenciaStatus from 'src/components/Urgencia/UrgenciaStatus.vue'
import TimerTask from 'src/components/TimerTask/TimerTask.vue'

const { usuarios } = inject('usuarios')

const listAvatar = ref([
  {
    foto: 'https://cdn.quasar.dev/img/avatar1.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar2.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar3.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar4.jpg',
    nome: 'Teste',
  },
  {
    foto: 'https://cdn.quasar.dev/img/avatar5.jpg',
    nome: 'Teste',
  },
])
</script>

<style lang="sass" scoped>
#tasks
  border-radius: 6px 6px 0 0

.base-grid
  display: grid
  grid-template-columns: 70px 1fr 0.5fr 144px 144px 144px 144px 144px
  align-items: center

  .task-item
</style>
