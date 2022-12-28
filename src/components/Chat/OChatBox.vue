<template>
  <q-card class="p-16 flex flex-col bg-neutral-20 dark:bg-d-neutral-10 flex-1">
    <div v-if="isLoading" class="flex-1 grid place-content-center">
      Carregando...
    </div>

    <q-scroll-area v-else>
      <div class="flex flex-col gap-8 flex-1 pr-10">
        <OChatMessage
          v-for="data in comments"
          :key="data.id"
          :data="data"
          :userId="userId"
        />
      </div>
    </q-scroll-area>

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

const props = defineProps({
  comments: Array,
  userId: Number,
  isLoading: Boolean,
  sendComment: Function,
})

console.log(props.comments)

function submitMessage() {
  props.sendComment(login.value)
  console.log('aqui foi')
}
</script>

<style lang="sass" scoped></style>
