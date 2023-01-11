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
      <div class="flex flex-col gap-6 opacity-40">
        <q-icon class="block mx-auto" name="fluorescent" size="2.5rem"></q-icon>
        <p>Sem mensagens no momento</p>
      </div>
    </div>

    <q-scroll-area
      v-else
      @scroll="handleScroll"
      class="flex flex-col gap-8 flex-1 pr-10"
    >
      <OChatMessage v-for="data in comments" :key="data.id" :data="data" />
      <q-page-sticky
        position="bottom-left"
        :offset="[0, 0]"
        v-show="scroll !== 0 && scroll < 0.88"
        @click="scrollChatToBottom"
      >
        <OButton
          secondary
          round
          icon="arrow_forward"
          class="rotate-90 !p-0 !h-32 !w-32 !min-w-0 !min-h-0 bg-white"
        />
      </q-page-sticky>
    </q-scroll-area>

    <footer class="flex gap-8 pt-16" v-if="showInput">
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OChatMessage from 'src/components/Chat/OChatMessage.vue'

// const { getScrollHeight, getVerticalScrollPosition, getScrollTarget } = scroll

const props = defineProps({
  comments: Array,
  isLoading: Boolean,
  sendComment: Function,
  getComments: Function,
  showInput: {
    type: Boolean,
    default: true,
  },
  tipo: {
    type: String,
    default: 'task',
  },
})

const scroll = ref(0)

watch(
  () => props.comments,
  () => {
    chatContainer = document.querySelector('.q-chat .q-scrollarea__container')
    scrollChatToBottom()
  },
  { deep: true, flush: 'post' }
)

const message = ref('')
let chatContainer

function scrollChatToBottom() {
  const container = (chatContainer = document.querySelector(
    '.q-chat .q-scrollarea__container'
  ))
  container?.scrollTo(0, container.scrollHeight)
}
function handleScroll(v) {
  scroll.value = v.verticalPercentage
}
async function submitMessage() {
  const mensagem = message.value
  message.value = ''

  await props.sendComment(mensagem, props.tipo)
  await props.getComments(props.tipo)
  // debugger
  scrollChatToBottom()
}

let timeout

async function updateChatInterval(container) {
  clearTimeout(timeout)
  chatContainer = document.querySelector('.q-chat .q-scrollarea__container')

  const newComments = await props.getComments(props.tipo)
  // const lastMessage = container.querySelector('.o-chat-message:last-child')
  // const el = getScrollTarget(container)
  // console.log(getVerticalScrollPosition(el), 'getVerticalScrollPosition')
  // console.log(getScrollHeight(el), 'getScrollHeight')
  // console.log(el.clientHeight, 'clientHeight')
  console.log(newComments)
  newComments?.length && scrollChatToBottom()

  timeout = setTimeout(() => updateChatInterval(container), 15000)
}

onMounted(() => {
  chatContainer = document.querySelector('.q-chat .q-scrollarea__container')

  updateChatInterval(chatContainer)
  scrollChatToBottom()
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<style lang="sass" scoped></style>
