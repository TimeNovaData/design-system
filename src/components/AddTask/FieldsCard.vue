<template>
  <div class="fields-cards flex flex-col gap-16">
    <OInput
      v-model="titleModel"
      label="Título"
      size="lg"
      class="bg-white dark:!bg-transparent"
    />

    <div class="grid grid-cols-2 gap-16">
      <div class="grid grid-cols-2 gap-16">
        <OInput
          v-model.number="qtdModel"
          label="Quantidade"
          size="lg"
          class="bg-white dark:!bg-transparent text-center"
        >
          <template v-slot:prepend>
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_minus_circle"
              class="cursor-pointer"
              :class="{ 'cursor-not-allowed': qtdModel === 1 }"
              @click="qtdModel > 1 ? qtdModel-- : (qtdModel = 1)"
            ></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_plus_circle"
              class="cursor-pointer"
              @click="qtdModel++"
            ></q-icon>
          </template>
        </OInput>

        <OInput
          v-model="timeModel"
          label="Tempo estimado"
          size="lg"
          class="bg-white dark:!bg-transparent"
          mask="##:##"
          placeholder="00:00"
        >
          <template v-slot:prepend>
            <q-icon size="1.5rem" name="svguse:/icons.svg#icon_clock"></q-icon>
          </template>
        </OInput>
      </div>

      <div class="grid grid-cols-2 gap-16">
        <OButton
          secondary
          class="bg-white h-48 w-full dark:!bg-white/10 dark:!border-transparent dark:text-white"
          icon="svguse:/icons.svg#icon_clock_fast"
        >
          Estimar
        </OButton>

        <OButton
          secondary
          class="bg-white h-48 w-full dark:!bg-white/10 dark:!border-transparent dark:text-white"
          icon="svguse:/icons.svg#icon_file_search"
        >
          Referência
        </OButton>
      </div>
    </div>

    <!-- <OSelect
      ref="clientRef"
      v-model="clientModel"
      label="Cliente - Projeto / Subprojeto"
      size="lg"
      :options="options3"
    /> -->
  </div>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import { ref } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OButton from 'src/components/Button/OButton.vue'

const titleModel = ref('')
const clientModel = ref('')
const clientRef = ref('')

const qtdModel = ref(1)
const timeModel = ref('00:00')

const options3 = [
  {
    label: 'Google',
    img: 'https://files.tecnoblog.net/wp-content/uploads/2021/09/logotipo_da_empresa_google.jpg',
    value: 1,
  },
  {
    label: 'Facebook',
    img: 'https://www.facebook.com/images/fb_icon_325x325.png',
    value: 2,
  },
  {
    label: 'Twitter',
    img: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png',
    value: 3,
  },
  {
    label: 'Apple',
    img: 'https://files.tecnoblog.net/wp-content/uploads/2020/11/apple-logo.jpg',
    value: 4,
  },
  {
    label: 'Oracle',
    img: 'https://yt3.ggpht.com/bf3tO-EefcSglyKMZUBp_o-GuBfd0PGm_U6f7L_64CyKd3iMPiAfRkHeLfrCwLfMmCc3IMlk=s900-c-k-c0x00ffffff-no-rj',
    value: 5,
  },
]
</script>

<style lang="sass" scoped>
.fields-cards
  :deep(input)
    font-size: 1rem

  .q-input :deep(.q-field__control)
    padding-left: .75rem
    padding-right: .75rem

  .q-input.text-center :deep(input)
    text-align: center
</style>
