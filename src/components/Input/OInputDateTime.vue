<template>
  <OInput
    size="lg"
    class="bg-white dark:!bg-transparent w-full cursor-pointer label-transparent"
    :label="label"
    v-model="dateComplete"
  >
    <q-popup-proxy
      ref="popUpDate"
      cover
      transition-show="scale"
      transition-hide="scale"
    >
      <q-date v-model="model.data" landscape today-btn>
        <div class="flex flex-col w-full">
          <OInput
            size="md"
            type="time"
            v-model="model.hora"
            class="label-transparent"
          />
          <OButton
            @click="popUpDate.hide()"
            size="md"
            tertiary
            class="mt-8 ml-auto -mb-8"
            >Fechar</OButton
          >
        </div>
      </q-date>
    </q-popup-proxy>

    <template v-slot:append>
      <q-icon name="svguse:/icons.svg#icon_date" class="cursor-pointer" />
    </template>
  </OInput>
</template>

<script setup>
import { date } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { computed, ref } from 'vue'
import OInput from './OInput.vue'
const { FData } = GLOBAL

const props = defineProps({
  data: String,
  label: String,
})

const popUpDate = ref(Element)

const dateComplete = computed(
  () => `${FData(model.value.data)} - ${model.value.hora}`
)

const initialDate = computed(() => {
  const prop = props.data
  const today = new Date()
  const myDate = date.formatDate(prop, 'YYYY/MM/DD')
  const result = prop ? myDate : today.toDateString()
  return result
})

const initialTime = computed(() => {
  const prop = props.data
  return prop ? date.formatDate(prop, 'HH[:]mm') : '12:00'
})

const model = ref({
  data: initialDate.value,
  hora: initialTime.value,
})
</script>

<style lang="scss" scoped></style>
