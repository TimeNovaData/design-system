import { api } from 'src/boot/axios'
import { computed, ref } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUserStore } from 'src/stores/usuarios/user.store'
import { storeToRefs } from 'pinia'

const { URLS } = api.defaults

export default function useComments(taskId) {
  const isLoading = ref(false)
  const comments = ref([])
  const commentsReverse = computed(() => comments.value.reverse())

  const { user } = storeToRefs(useUserStore())

  async function getComments() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.comentario + `?task=${taskId}&no_loading`,
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
    isLoading.value = true

    try {
      await api.post(URLS.comentario + `?task=${taskId}`, {
        comentario: message,
        task: taskId,
        usuario_atualizacao: user.value.id,
        usuario_criacao: user.value.id,
      })
    } catch (err) {
      console.log(err)
    }
  }

  function setComments(value) {
    comments.value = value
  }

  return {
    isLoading,
    comments,
    commentsReverse,
    getComments,
    sendComment,
  }
}
