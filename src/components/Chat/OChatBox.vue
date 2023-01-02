<template>
  <q-card
    class="q-chat p-16 flex flex-col bg-neutral-20 dark:bg-d-neutral-10 flex-1 flex-nowrap"
  >
    <div
      v-if="!comments.length && isLoading"
      class="flex place-content-center h-full"
    >
      <q-spinner color="primary" class="shrink-0" size="48px" />
    </div>

    <div v-else-if="!comments.length" class="flex place-content-center h-full">
      <div class="flex flex-col gap-6">
        <q-icon class="block mx-auto" name="fluorescent" size="2.5rem"></q-icon>
        <p>Sem mensagens no momento</p>
      </div>
    </div>

    <q-scroll-area v-else>
      <div class="flex flex-col gap-8 flex-1 pr-10" js-chat>
        <OChatMessage v-for="data in comments" :key="data.id" :data="data" />
      </div>
    </q-scroll-area>

    <footer class="flex gap-8 pt-16">
      <OInput
        v-model="message"
        size="md"
        placeholder="Escreva sua mensagem"
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
import { ref, onMounted, onUnmounted } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OChatMessage from 'src/components/Chat/OChatMessage.vue'
import { scroll } from 'quasar'

// const { getScrollHeight, getVerticalScrollPosition, getScrollTarget } = scroll

const props = defineProps({
  comments: Array,
  isLoading: Boolean,
  sendComment: Function,
  getComments: Function,
})

const message = ref('')
let chatContainer

function scrollChatToBottom(container) {
  container?.scrollTo(0, container.scrollHeight)
}

async function submitMessage() {
  const mensagem = message.value
  message.value = ''

  await props.sendComment(mensagem)
  await props.getComments()

  scrollChatToBottom(chatContainer)
}

let timeout

async function updateChatInterval(container) {
  clearTimeout(timeout)

  const newComments = await props.getComments()
  // const lastMessage = container.querySelector('.o-chat-message:last-child')
  // const el = getScrollTarget(container)
  // console.log(getVerticalScrollPosition(el), 'getVerticalScrollPosition')
  // console.log(getScrollHeight(el), 'getScrollHeight')
  // console.log(el.clientHeight, 'clientHeight')
  newComments?.length && scrollChatToBottom(chatContainer)

  timeout = setTimeout(() => updateChatInterval(container), 15000)
}

onMounted(() => {
  chatContainer = document.querySelector('.q-chat .q-scrollarea__container')

  updateChatInterval(chatContainer)
  scrollChatToBottom(chatContainer)
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<style lang="sass" scoped></style>
