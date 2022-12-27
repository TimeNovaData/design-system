<template>
  <q-card class="attachment-card p-16">
    <header class="flex justify-between">
      <span class="text-caps-3 dark:text-white/40">ANEXOS</span>

      <OButton
        class="font-normal dark:text-white bg-white/10 dark:!border-transparent"
        size="sm"
        height="sm"
        secondary
      >
        Baixar tudo
      </OButton>
    </header>

    <div class="flex flex-col gap-8 mt-16">
      <AttachmentFile
        :file="{
          name: 'Imagem.jpg',
          size: '132KB',
          src: 'https://cdn.quasar.dev/img/avatar.png',
        }"
        :has-image="true"
      />

      <AttachmentFile
        :file="{ name: 'Imagem2.jpg', size: '132KB' }"
        :has-image="false"
      />
    </div>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import AttachmentFile from './AttachmentFile.vue'
</script>

<style lang="sass" scoped></style>
