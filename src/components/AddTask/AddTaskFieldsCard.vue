<template>
  <div class="fields-cards flex flex-col gap-16">
    <OInput
      v-model="titleModel"
      label="Título"
      size="lg"
      class="bg-white dark:!bg-transparent"
    />

    <OSelect
      use-input
      label="Cliente - Projeto / Subprojeto"
      size="lg"
      class="bg-white"
      :options="clientOptions"
      v-model="clientModel"
      option-value="id"
      option-label="nome"
      :loading="!clientOptions.length"
    >
      <template #option="{ itemProps, opt }">
        <q-item v-bind="itemProps">
          <OAvatar :nome="opt.nome" :foto="opt.foto" />
        </q-item>
      </template>

      <template #selected-item="{ itemProps, opt }">
        <q-item v-bind="itemProps" class="translate-y-3">
          <OAvatar :nome="opt.nome" :foto="opt.foto" />
        </q-item>
      </template>
    </OSelect>

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
          mask="##h ##m"
          reverse-fill-mask
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

      <p>data entrega</p>

      <OSelect
        use-input
        label="Responsável"
        size="lg"
        class="bg-white"
        :options="respOptions"
        v-model="respModel"
        option-value="id"
        option-label="nome"
        :loading="!respOptions.length"
      >
        <template #option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <OAvatar :nome="opt.nome" :foto="opt.foto" />
          </q-item>
        </template>

        <template #selected-item="{ itemProps, opt }">
          <q-item v-bind="itemProps" class="translate-y-3">
            <OAvatar :nome="opt.nome" :foto="opt.foto" />
          </q-item>
        </template>
      </OSelect>
    </div>
  </div>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import { ref } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OButton from 'src/components/Button/OButton.vue'
import OAvatar from 'src/components/Avatar/OAvatar.vue'

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
