<template>
  <q-card
    ref="cardChatBox"
    class="q-chat p-16 flex flex-col bg-neutral-20 dark:bg-d-neutral-10 flex-1 flex-nowrap h-full"
  >
    <div
      v-if="!comentariosResult?.length && isLoading"
      class="flex place-content-center h-full flex-1"
    >
      <q-spinner color="primary" class="shrink-0" size="48px" />
    </div>

    <div
      v-else-if="!comentariosResult?.length"
      class="flex place-content-center h-full flex-1"
    >
      <div class="flex flex-col gap-6 opacity-40">
        <q-icon class="block mx-auto" name="fluorescent" size="2.5rem"></q-icon>
        <p>Sem mensagens no momento</p>
      </div>
    </div>
    <q-scroll-area
      @scroll="handleScroll"
      class="flex flex-col gap-8 flex-1 pr-10"
    >
      <OChatMessage
        v-for="data in comentariosResult"
        :key="data.id"
        :data="data"
      />
      <!-- <q-page-sticky
          position="bottom-left"
          :offset="[0, 0]"
          v-show="scroll < 0.88 && scroll !== false"
          @click="scrollChatToBottom(true)"
        >
          <OButton
            secondary
            round
            icon="arrow_forward"
            class="rotate-90 !p-0 !h-32 !w-32 !min-w-0 !min-h-0 bg-white hover:!bg-primary-pure hover:!text-white"
          />
        </q-page-sticky> -->
      <slot name="top"></slot>
    </q-scroll-area>

    <footer class="flex gap-8 pt-16" v-if="showInput">
      <OInput
        v-model="message"
        size="md"
        placeholder="Escreva sua mensagem"
        class="h-40 flex-1 bg-white dark:!bg-transparent no-label"
        autofocus
        @keydown.enter="submitMessage"
      ></OInput>

      <OButton
        secondary
        class="bg-white h-40 dark:!bg-white/10 dark:!border-transparent dark:text-white !min-w-[100px]"
        @click="submitMessage"
      >
        Enviar
      </OButton>
    </footer>
  </q-card>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  useSlots,
  computed,
  unref,
  nextTick,
} from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OChatMessage from 'src/components/Chat/OChatMessage.vue'
import { scroll as qScroll } from 'quasar'
import { deepUnref } from 'vue-deepunref'
// const { getScrollHeight, getVerticalScrollPosition, getScrollTarget } = scroll

const cardChatBox = ref(null)
const props = defineProps({
  comments: Object,
  isLoading: Boolean,
  sendComment: Function,
  getComments: Function,
  filters: String,
  canUpdate: {
    type: Boolean,
    default: true,
  },
  showInput: {
    type: Boolean,
    default: true,
  },
  tipo: {
    type: String,
    default: 'task',
  },
})

const scroll = ref(false)
const comentariosResult = ref(unref(props.comments)?.results)

watch(
  () => props.comments,
  async (v) => {
    comentariosResult.value = unref(v)?.results
    chatContainer = cardChatBox.value.$el.querySelector(
      '.q-scrollarea__container'
    )
    await nextTick()
    scrollChatToBottom()
  },
  { deep: true, flush: 'post' }
)

const message = ref('')
let chatContainer

function scrollChatToBottom(animate) {
  const container = (chatContainer = cardChatBox.value.$el.querySelector(
    '.q-scrollarea__container'
  ))
  if (animate)
    qScroll.setVerticalScrollPosition(container, container.scrollHeight, 300)
  else container?.scrollTo(0, container.scrollHeight)
}
function handleScroll(v) {
  if (v.verticalPercentage) scroll.value = v.verticalPercentage
}
async function submitMessage() {
  const mensagem = message.value
  message.value = ''

  await props.sendComment(mensagem, props.tipo)
  await props.getComments(props.tipo, props.filters)
  // debugger
  scrollChatToBottom()
}

let timeout

async function updateChatInterval(container) {
  clearTimeout(timeout)
  chatContainer = cardChatBox.value.$el.querySelector(
    '.q-scrollarea__container'
  )

  if (props.canUpdate && props.getComments) {
    const newComments = await props.getComments(props.tipo, props.filters)
    // const lastMessage = container.querySelector('.o-chat-message:last-child')
    // const el = getScrollTarget(container)
    // console.log(getVerticalScrollPosition(el), 'getVerticalScrollPosition')
    // console.log(getScrollHeight(el), 'getScrollHeight')
    // console.log(el.clientHeight, 'clientHeight')
    // console.log(newComments)
    // newComments.map()
    const newC = newComments.results.map((i) => i.comentario)
    const oldC = comentariosResult.value.map((i) => i.comentario)
    if (newC.toString() === oldC.toString()) return
    newComments?.length && scrollChatToBottom()
  }

  timeout = setTimeout(() => updateChatInterval(container), 15000)
}

onMounted(() => {
  chatContainer = cardChatBox.value.$el.querySelector(
    '.q-scrollarea__container'
  )

  updateChatInterval(chatContainer)
  scrollChatToBottom()
})

onUnmounted(() => {
  clearTimeout(timeout)
})
defineExpose({ scrollChatToBottom })
</script>

<style lang="sass" scoped>
.q-chat
  &:deep(.q-scrollarea__content)
    display: flex
    flex-direction: column-reverse !important
</style>
