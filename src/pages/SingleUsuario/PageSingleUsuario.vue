<template>
  <q-scroll-area>
    <header class="h-[404px]">
      <div class="h-full">
        <img class="h-full object-cover w-full object-right" :src="bg" alt="" />
      </div>
    </header>
    <div class="container relative">
      <div class="flex items-end mt-[-255px] mb-32">
        <div class="mr-24">
          <OAvatar
            :foto="userActive.foto"
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

      <section id="tasks" class="bg-neutral-10 mb-16">
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
            <OButton size="md" primary @click="openTaskEditModal">
              <q-icon
                name="svguse:/icons.svg#icon_add_task"
                size="1.5rem"
                color="text-neutral-100 "
              ></q-icon>
              Nova Task
            </OButton>
            <OButton class="ml-8" disable size="md" secondary>
              <q-icon name="svguse:/icons.svg#icon_filtros"></q-icon>

              Filtrar
            </OButton>
          </div>
        </div>

        <!-- 🟡 TASK PENDENTES -->

        <div class="tasks-grid">
          <div class="flex w-full">
            <div class="flex items-center w-full">
              <div class="mx-auto w-full">
                <div class="grid grid-cols-1 gap-2 py-4">
                  <div class="">
                    <div class="base-grid px-16">
                      <p class="empty-col"></p>
                      <p class="text-headline-3 pl-16">Task</p>
                      <p class="text-headline-3 pl-16">Solicitante</p>
                      <p class="text-headline-3 pl-16">Urgência</p>
                      <!-- <p class="text-headline-3 pl-16">Data de Criação</p> -->
                      <p class="text-headline-3 pl-16">Desejada</p>
                      <p class="text-headline-3 pl-16">Prevista</p>
                    </div>
                    <div
                      v-if="!tasksTodo.length & loading"
                      class="flex flex-col gap-4 mt-10"
                    >
                      <q-skeleton type="rect" class="h-[3.75rem]" />
                      <q-skeleton type="rect" class="h-[3.75rem]" />
                      <q-skeleton type="rect" class="h-[3.75rem]" />
                      <q-skeleton type="rect" class="h-[3.75rem]" />
                    </div>
                    <ul class="overflow-hidden relative" v-else>
                      <!-- <template v-for="(task, index) in tasks" :key="task.id"> -->
                      <draggable
                        v-bind="dragOptions"
                        :list="tasksTodo"
                        item-key="id"
                        :handle="'#drag-id'"
                        :component-data="{
                          tag: 'div',
                          type: 'transition-group',
                          name: 'flip-list',
                          class: `transition-div `,
                        }"
                      >
                        <template #item="{ element }">
                          <TaskColaborador :task="element" />
                        </template>
                      </draggable>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ✅ TASK FINALIZADAS -->
      <section id="tasks-finalizadas" class="bg-white">
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

          <q-virtual-scroll
            style="max-height: 450px"
            :items="tasks"
            separator
            v-slot="{ item: task }"
            class="relative"
          >
            <TaskColaborador
              :task="task"
              :hideDragIcon="true"
              :completed="true"
            />
          </q-virtual-scroll>
        </o-accordion>
      </section>

      <section class="my-160">
        <div>CONSUMO DE HORAS</div>
      </section>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import bg from 'src/assets/image/bg-single-usuario.png'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
import avatar from 'src/assets/image/gravatar.jpg'
import AvatarMultipleVue from 'src/components/Avatar/AvatarMultiple.vue'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OButton from 'src/components/Button/OButton.vue'
import TaskColaborador from 'src/components/TaskColaborador/TaskColaborador.vue'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import emitter from 'src/boot/emitter'

import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useUsuarioStore } from 'src/stores/usuarios/usuarios.store'

const route = useRoute()

const user = inject('user')
const { usuarios } = storeToRefs(useUsuarioStore())
const { getUsuarios } = useUsuarioStore()
const userFoto = inject('usuarios')
const loading = ref(true)

const openTaskEditModal = inject('openTaskEditModal')
const userActiveID = ref(null)

const { getTasks } = useTaskStore()
const { tasks } = storeToRefs(useTaskStore())

const userActive = computed(() =>
  usuarios.value.filter((i) => i.id === Number(userActiveID.value))
)

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

emitter.on('taskCreate', () => {
  // atualizar a lista
  console.log('CRIOU')
  getTasksPaged(userActiveID.value)
})

const tasksTodo = computed(() =>
  tasks.value.filter((t) => t.status !== 'Concluído')
)

const tasksfinished = computed(() =>
  tasks.value.filter((t) => t.status === 'Concluído')
)
console.log(tasksfinished)
const dragOptions = computed(() => ({
  animation: 400,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

const getTasksPaged = async (userId) => {
  return await getTasks(`&=responsavel_task__id=${userId}&?page_size=10`)
}

onMounted(async () => {
  userActiveID.value = route.params.id
  await getTasksPaged(userActiveID)
  // await getUsuarios()
  loading.value = false
})
</script>

<style lang="sass" scoped>
#tasks
  border-radius: 6px 6px 0 0

.base-grid
  display: grid
  grid-template-columns: minmax(55px, 65px)  minmax(200px, 1fr) minmax(170px, 230px) minmax(120px, 130px)  repeat(2, 100px) minmax(120px, 130px)
  align-items: center
</style>
