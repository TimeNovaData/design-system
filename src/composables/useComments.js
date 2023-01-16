import { api } from 'src/boot/axios'
import { computed, nextTick, ref, watch } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUserStore } from 'src/stores/usuarios/user.store'
import { storeToRefs } from 'pinia'
import { deepUnref } from 'vue-deepunref'

const { URLS } = api.defaults

export default function useComments() {
  const id = ref(null)
  const isLoading = ref(false)
  const comments = ref({ results: [] })

  const { user } = storeToRefs(useUserStore())

  const URLReq = (id, filters = '') => ({
    task: {
      get: URLS.comentario + `?task=${id}&no_loading${filters}`,
      post: URLS.comentario,
      data: (message) => ({
        comentario: message,
        task: id,
      }),
    },

    projeto: {
      get: URLS.comentarioprojeto + `?projeto__id=${id}&no_loading${filters}`,
      post: URLS.comentarioprojeto,
      data: (message) => ({
        comentario: message,
        projeto: id,
        titulo: 'Acompanhamento do Projeto',
      }),
    },
  })

  async function getComments(tipo, filters) {
    if (!id.value) return
    isLoading.value = true

    try {
      const { data } = await api.get(URLReq(id.value, filters)[tipo].get)
      // API nao esta vindo paginada
      if (data.results.length !== comments.value.length) {
        setComments(data)
        return data
      }
      return null
    } catch (e) {
      console.log(e)
      return e
    } finally {
      isLoading.value = false
    }
  }

  async function sendComment(message, tipo) {
    if (!id.value || !message.length) return

    isLoading.value = true

    try {
      await api.post(
        URLReq(id.value)[tipo].post /*  */,
        URLReq(id.value)[tipo].data(message)
      )
    } catch (err) {
      console.log(err)
    }
  }

  function setComments(value) {
    comments.value = value
  }

  async function setID(value) {
    id.value = value
  }

  return {
    id,
    isLoading,
    comments,
    getComments,
    sendComment,
    setID,
  }
}
