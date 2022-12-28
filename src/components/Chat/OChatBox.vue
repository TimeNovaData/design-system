<template>
  <q-card class="p-16 flex flex-col bg-neutral-20 dark:bg-d-neutral-10 flex-1">
    <div class="flex flex-col gap-8 flex-1">
      <OChatMessage v-for="data in messages" :key="data.id" :data="data" />
    </div>

    <footer class="flex gap-8 pt-16">
      <OInput
        v-model="login.value"
        size="md"
        placeholder="Escreva sua mensagem"
        ref="login"
        class="h-40 flex-1 bg-white dark:!bg-transparent no-label"
        @keydown.enter="submitMessage"
      ></OInput>

      <OButton
        secondary
        class="bg-white h-40 dark:!bg-white/10 dark:!border-transparent dark:text-white"
        @click="submitMessage"
      >
        Enviar mensagem
      </OButton>
    </footer>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OChatMessage from 'src/components/Chat/OChatMessage.vue'

const login = ref('')

const messages = [
  {
    id: 1,
    user: 'Andrei',
    userImg: 'https://cdn.quasar.dev/img/avatar4.jpg',
    text: 'Cara, como faz pra ser ruim nisso?',
    sent: true,
    date: '14h 3m',
    tag: 'Dúvida',
  },
  {
    id: 2,
    user: 'Bernardo',
    userImg: 'https://cdn.quasar.dev/img/avatar1.jpg',
    text: 'Sei lá bro, Oss.',
    sent: false,
    date: '15h 6m',
    tag: 'Revisão',
  },
  {
    id: 3,
    user: 'Andrei',
    userImg: 'https://cdn.quasar.dev/img/avatar4.jpg',
    text: 'Então perfeito.',
    sent: true,
    date: '16h 2m',
    tag: 'Update',
  },
]

function submitMessage() {
  console.warn(login.value)
}
</script>

<style lang="sass" scoped></style>
