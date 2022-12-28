<template>
  <div>
    <q-chat-message
      :avatar="userImg"
      :text="[data.comentario]"
      :sent="sender"
    ></q-chat-message>

    <div
      class="flex items-center gap-6 text-paragraph-3 mt-4"
      :class="{
        'justify-end mr-[2.75rem]': sender,
        'ml-[2.75rem]': !sender,
      }"
    >
      <span>{{ data.usuario_criacao }}</span>
      <span class="text-neutral-100/40 dark:text-white/10">•</span>
      <span class="text-neutral-60 dark:text-white/40">{{ date }}</span>
    </div>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'

const props = defineProps({
  data: Object,
  userId: Number,
})

const date = GLOBAL.FData(props.data.data_criacao)
const sender = props.data.usuario_criacao === props.userId
const userImg = 'https://cdn.quasar.dev/img/avatar4.jpg'
</script>

<style lang="sass"></style>
