<template>
  <div class="fields-cards flex flex-col gap-16">
    <OInput
      v-model="titleModel"
      label="Título"
      size="lg"
      class="bg-white dark:!bg-transparent"
    />

    <OSelectAvatar
      label="Cliente - Projeto / Subprojeto"
      size="lg"
      class="bg-white"
      :options="clientOptions"
      :modelValue="clientModel"
      :loading="!clientOptions.length"
      @update-value="(value) => (clientModel = value)"
    />

    <OSelect
      use-input
      label="Grupo / Tipo"
      size="lg"
      class="bg-white"
      :options="groupOptions"
      v-model="groupModel"
      option-value="val"
      option-label="val"
      :loading="!groupOptions.length"
    ></OSelect>

    <div class="grid grid-cols-2 gap-16">
      <div class="grid grid-cols-2 gap-16">
        <div>
          <OInputNumber
            :modelValue="qtdModel"
            label="Quantidade"
            size="lg"
            class="bg-white dark:!bg-transparent"
            @update-value="(value) => (qtdModel = value)"
          ></OInputNumber>
        </div>

        <OInput
          v-model="timeModel"
          label="Tempo estimado"
          size="lg"
          class="bg-white dark:!bg-transparent"
          mask="##h ##m"
          reverse-fill-mask
          placeholder="00h 00m"
        >
          <template v-slot:prepend>
            <q-icon size="1.5rem" name="svguse:/icons.svg#icon_clock"></q-icon>
          </template>
        </OInput>
      </div>

      <div class="grid grid-cols-2 gap-16">
        <OButton
          secondary
          class="bg-white h-48 w-full opaque-icon dark:!bg-white/10 dark:!border-transparent dark:text-white"
          icon="svguse:/icons.svg#icon_clock_fast"
        >
          Estimar
        </OButton>

        <OButton
          secondary
          class="bg-white h-48 w-full opaque-icon dark:!bg-white/10 dark:!border-transparent dark:text-white"
          icon="svguse:/icons.svg#icon_file_search"
        >
          Referência
        </OButton>
      </div>

      <!-- <OInput
        size="lg"
        class="w-full cursor-pointer"
        label="Data de entrega desejada"
        v-model="dateComplete"
        @keydown.prevent
      >
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="model" landscape>
            <OInput size="md" type="time" />
          </q-date>
        </q-popup-proxy>

        <template v-slot:append>
          <q-icon name="svguse:/icons.svg#icon_calendar" class="cursor-pointer">
          </q-icon>
        </template>
      </OInput> -->
      <div></div>
      <OSelectAvatar
        label="Responsável"
        size="lg"
        class="bg-white"
        :options="respOptions"
        :modelValue="respModel"
        :loading="!respOptions.length"
        @update-value="(value) => (respModel = value)"
      />
    </div>
  </div>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import { ref, computed } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OButton from 'src/components/Button/OButton.vue'
import OInputNumber from 'src/components/Input/OInputNumber.vue'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'

const titleModel = ref('')
const clientModel = ref(null)
const groupModel = ref('')
const respModel = ref(null)

const qtdModel = ref(1)
const timeModel = ref('00:00')

const clientOptions = [
  {
    nome: 'Facebook',
    foto: 'https://www.facebook.com/images/fb_icon_325x325.png',
    id: 1,
  },
  {
    nome: 'Twitter',
    foto: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png',
    id: 2,
  },
]
const groupOptions = [{ val: 'Google' }, { val: 'Apple' }, { val: 'Oracle' }]

const respOptions = [
  {
    nome: 'Marlon',
    foto: 'https://avatars.githubusercontent.com/u/62356988?v=4',
    id: 1,
  },
]

const model = ref('')
const dateComplete = computed(() => {
  return '10/10/2022 - 18h 30m'
  // return `${from && FData(from)} ${to && '  até  '} ${to && FData(to)}`
})
</script>

<style lang="sass" scoped>
.fields-cards
  :deep(input)
    font-size: 1rem

  .q-input
    :deep(.q-field__control)
      padding-left: .75rem
      padding-right: .75rem

    &.text-center :deep(input)
      text-align: center

    &.q-field--float :deep(.q-field__label)
      max-width: none

.body--light
  .opaque-icon .q-icon
    background: red
</style>
