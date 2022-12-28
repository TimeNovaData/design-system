import { api } from 'src/boot/axios'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export default function useComments(taskId) {
  const isLoading = ref(false)
  const comments = ref([])
  const logUser = ref('')

  async function getUser() {
    const { data, error } = await useAxios(
      URLS.usuario + 'usuario_logado',
      { method: 'GET' },
      api
    )

    try {
      logUser.value = data.value

      return data.value
    } catch (e) {
      return error
    }
  }

  async function getComments() {
    isLoading.value = true
    await getUser()

    const { data, error } = await useAxios(
      URLS.comentario + `?task=${taskId}`,
      { method: 'GET' },
      api
    )

    try {
      setComments(data.value)

      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function sendComment(message) {
    console.warn({
      comentario: message.value,
      task: taskId,
      usuario_atualizacao: logUser.value.id,
      usuario_criacao: logUser.value.id,
    })

    // try {
    //   await api.post(URLS.comentario + `?task=${taskId}`, {
    //     comentario: 'string',
    //     task: 0,
    //     usuario_atualizacao: 0,
    //     usuario_criacao: 0,
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
  }

  function setComments(value) {
    comments.value = value
  }

  return {
    isLoading,
    logUser,
    comments,
    getComments,
    sendComment,
  }
}
