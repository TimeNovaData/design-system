<template>
  <li
    class="task-item list-none bg-white border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden px-16 py-[7px] mb-2"
    :class="{
      'border-l-0': hideDragIcon,
      'border-r-0': hideDragIcon,
      'rounded-none': hideDragIcon,
    }"
  >
    <div class="base-grid">
      <div class="flex justify-between items-center">
        <q-icon
          id="drag-id"
          class="cursor-grab"
          :class="{ 'opacity-0': hideDragIcon }"
          name="svguse:/icons.svg#icon_drag"
          size="22px"
        ></q-icon>

        <q-icon name="svguse:/icons.svg#icon_check_circle" size="22px"></q-icon>
      </div>

      <div class="pl-16">
        <p class="text-paragraph-2 text-neutral-100 one-line">
          {{ task.titulo }}
        </p>
        <p class="text-paragraph-3 text-neutral-70">
          Projeto: {{ task?.projeto?.nome }}
        </p>
      </div>

      <div class="pl-16 relative">
        <div class="flex items-center">
          <div class="relative w-40 h-40 mr-8">
            <AvatarSingle
              class="!w-40 !h-40"
              :index="0"
              side="left"
              :href="
                task?.responsavel_task.profile.foto
                  ? task?.responsavel_task.profile.foto
                  : placeholderImg
              "
            />
          </div>
          <div>
            <p class="text-paragraph-2 text-neutral-100">
              {{ task?.responsavel_task.get_full_name }}
            </p>
            <p class="text-paragraph-3 text-neutral-70">
              <!-- Criado por: {{ task?.usuario_criacao?.get_full_name }} -->
            </p>
          </div>
        </div>
      </div>

      <div class="pl-16">
        <!-- <UrgenciaStatus text="Moderada" /> -->
        <o-badge
          size="lg"
          square
          class="!px-32"
          :badge="false"
          :color="GLOBAL.returnRGB('#E92C2C')"
        >
          <template v-slot:content>Urgente</template>
        </o-badge>
      </div>
      <!-- <div class="pl-16">
        <div class="flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_calendar_create"
            size="24px"
            class="mr-8"
          >
          </q-icon>
          <div>
            <p class="text-paragraph-2 text-neutral-100">09/12/2022</p>
            <p class="text-paragraph-3 text-neutral-70">Sexta</p>
          </div>
        </div>
      </div> -->
      <div class="pl-16">
        <div class="flex items-center">
          <q-icon
            name="svguse:/icons.svg#icon_calendar_heart"
            size="24px"
            class="mr-8"
          >
          </q-icon>
          <div>
            <p class="text-paragraph-2 text-neutral-100">{{ dataDesejada }}</p>
            <p class="text-paragraph-3 text-neutral-70">
              {{ dataDesejadaDia }}
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
            <p class="text-paragraph-2">{{ dataPrevista }}</p>
            <p class="text-paragraph-3 text-neutral-70">
              {{ dataPrevistadaDia }}
            </p>
          </div>
        </div>
      </div>
      <div class="pl-16">
        <TimerTask />
      </div>
    </div>
  </li>
</template>

<script setup>
import UrgenciaStatus from 'src/components/Urgencia/UrgenciaStatus.vue'
import OBadge from 'src/components/Badge/OBadge.vue'
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import TimerTask from 'src/components/TimerTask/TimerTask.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { date } from 'quasar'
import { ref, computed } from 'vue'
import placeholderImg from 'src/assets/image/gravatar.jpg'

const props = defineProps(['task', 'hideDragIcon'])

const dataDesejada = computed(() => {
  return GLOBAL.FData(props.task.entrega_data_desejada, 'DD/MM')
})

const dataDesejadaDia = computed(() => {
  return GLOBAL.FData(props.task.entrega_data_desejada, 'dddd')
})
const dataPrevista = computed(() => {
  return GLOBAL.FData(props.task.data_final_previsto, 'DD/MM')
})

const dataPrevistadaDia = computed(() => {
  return GLOBAL.FData(props.task.data_final_previsto, 'dddd')
})
</script>

<style lang="sass" scoped>

.base-grid
  display: grid
  grid-template-columns: minmax(55px, 65px)  minmax(200px, 1fr) minmax(170px, 230px) minmax(120px, 130px)  repeat(2, 100px) minmax(120px, 130px)
  align-items: center
</style>
