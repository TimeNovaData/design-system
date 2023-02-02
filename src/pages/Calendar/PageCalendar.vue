<template>
  <q-scroll-area>
    <div class="container relative">
      <q-card
        class="p-16 mt-48 dark:border-white/10 dark:border overflow-hidden"
      >
        <div class="flex justify-between">
          <TextIcon
            class="text-title-4"
            text="Agenda"
            icon="svguse:/icons.svg#icon_calendar"
          />

          <OButton secondary size="md" icon="svguse:/icons.svg#icon_filtros"
            >Filtros
            <q-menu
              ref="menu"
              class="p-12"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-form ref="form">
                <q-list class="w-[376px]">
                  <q-item
                    class="px-0 text-headline-3 text-neutral-60 dark:text-white/60 justify-between flex items-center w-full"
                    dense
                  >
                    Filtros
                    <q-icon
                      size="1.25rem"
                      name="svguse:/icons.svg#icon_filtros"
                    ></q-icon>
                  </q-item>
                </q-list>
              </q-form>
            </q-menu>
          </OButton>
        </div>

        <div class="mt-24">
          <BaseCalendar />
        </div>
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, inject } from 'vue'

import OButton from 'src/components/Button/OButton.vue'
import TextIcon from 'src/components/Text/TextIcon.vue'

import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'
import BaseCalendar from 'src/components/Calendar/BaseCalendar.vue'

const menu = ref(null)
const form = ref(null)
const user = inject('user')

const openTaskViewModal = inject('openTaskViewModal')

const { getTasks } = useTaskStore()
const { tasks } = storeToRefs(useTaskStore())

onMounted(async () => {
  await getTasks(
    `&responsavel_task__id=${user.value.id}&page_size=100&status=abertas`
  )
  /*  {
    id: 166,
    chamado: null,
    tag: [],
    projeto: {
      id: 1,
      nome: '#dicasolar#',
      nome_completo: 'Adriano O cliente - #dicasolar#',
      cor: '#0D0FD2',
      tem_subprojetos: false,
    },
    sub_projeto: null,
    tipo_task: null,
    ordem: 1,
    ordem_caso: 2,
    titulo: 'teste 123',
    observacoes: null,
    tempo_estimado: '00:00:00',
    link: null,
    entrega_data_desejada: null,
    data_inicial_previsto: null,
    data_conclusao: '2021-08-27',
    responsavel_task: {
      id: 2,
      username: 'emanuel2',
      get_full_name: 'emanuel morais',
      profile: {
        id: 7,
        foto: 'http://localhost:8000/media/avatars/emanuel2/resized/500/arara-azul.jpg',
      },
    },
    data_criacao: '2021-08-19T13:49:19.304865-03:00',
    is_playing: false,
    ultima_contagem: null,
    data_atualizacao: '2021-08-27T08:30:22.486585-03:00',
    quantidade: 1,
    usuario_criacao: {
      id: 2,
      username: 'emanuel2',
      get_full_name: 'emanuel morais',
      profile: {
        id: 7,
        foto: 'http://localhost:8000/media/avatars/emanuel2/resized/500/arara-azul.jpg',
      },
    },
    usuario_atualizacao: 2,
    status: 'Concluído',
    tempo_total: '00:00:00',
    data_final_previsto: null,
    tempo_ao_vivo_formatado_hora_minuto_segundo: '1:00:17',
  } */
  // console.log(
  //   tasks.value.filter(
  //     (i) => i.data_inicial_previsto && i.entrega_data_desejada
  //   ),
  //   'filtradas'
  // )
  // const final = tasks.value
  //   .filter((i) => i.data_inicial_previsto && i.entrega_data_desejada)
  //   .map((i, index) => ({
  //     id: i.id,
  //     title: i.titulo,
  //     details: i.titulo,
  //     start: date.formatDate(i.data_inicial_previsto, 'YYYY-MM-DD'),
  //     end: date.formatDate(i.entrega_data_desejada, 'YYYY-MM-DD'),
  //     bgcolor: 'orange',
  //     icon: 'fas fa-birthday-cake',
  //   }))

  // console.log('diff', final, events.value)

  // events.value = final
  // calendar.value.updateCurrent()
})
</script>

<style lang="sass" scoped></style>
