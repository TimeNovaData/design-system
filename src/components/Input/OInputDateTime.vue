<template>
  <div>
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
        <q-date v-model="model.data" today-btn>
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
              class="mt-8 ml-auto -mb-8 !min-w-full"
              >Confirmar</OButton
            >
          </div>
        </q-date>
      </q-popup-proxy>

      <template v-slot:append>
        <q-icon :name="icon" class="cursor-pointer" />
      </template>
    </OInput>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { computed, ref, watch } from 'vue'
import OInput from './OInput.vue'
const { FData } = GLOBAL

const props = defineProps({
  data: String,
  label: String,
  icon: {
    type: String,
    default: 'svguse:/icons.svg#icon_date',
  },
})

const emit = defineEmits(['update:date'])

const popUpDate = ref(Element)

const dateComplete = computed(() =>
  model.value.data ? `${FData(model.value.data)} - ${model.value.hora}` : null
)

const initialDate = computed(() => {
  const prop = props.data
  const today = new Date()
  const myDate = date.formatDate(prop, 'YYYY/MM/DD')
  const result = prop ? myDate : null
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

watch(
  () => [model.value.data, model.value.hora],
  ([data, hora]) => {
    const dateTime = new Date(`${data} ${hora}`)
    const dataFinal = date?.formatDate(dateTime)
    emit('update:date', dataFinal)
    console.log(dataFinal)
  }
)
</script>

<style lang="scss" scoped></style>
