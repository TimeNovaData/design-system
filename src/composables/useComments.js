import { api } from 'src/boot/axios'
import { computed, ref } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUserStore } from 'src/stores/usuarios/user.store'
import { storeToRefs } from 'pinia'
import { deepUnref } from 'vue-deepunref'

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
      if (data.value.length !== comments.value.length) {
        setComments(data.value)
        return data.value
      }

      return null
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
