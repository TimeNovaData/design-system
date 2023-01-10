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
  const comments = ref([])
  const commentsReverse = computed(() => comments.value.reverse())

  const { user } = storeToRefs(useUserStore())

  /* 
      {
        "id": 1,
        "dados_usuario": {
            "id": 2,
            "nome": "emanuel morais",
            "foto": "http://localhost:8000/media/avatars/emanuel2/resized/100/arara-azul.jpg"
        },
        "data_amigavel": "9 meses atrás",
        "titulo": "Teste",
        "comentario": "testeeeee",
        "data_criacao": "2022-03-21T16:47:20.647946-03:00",
        "data_atualizacao": "2022-03-21T16:58:14.076872-03:00",
        "projeto": 4,
        "criador": 2,
        "usuario_atualizacao": 2,
        "tipo_etapa": null
    },
  
  */
  const URLReq = (id) => ({
    task: {
      get: URLS.comentario + `?task=${id}&no_loading`,
      post: URLS.comentario,
      data: (message) => ({
        comentario: message,
        task: id,
      }),
    },

    projeto: {
      get: URLS.comentarioprojeto + `?projeto__id=${id}&no_loading`,
      post: URLS.comentarioprojeto,
      data: (message) => ({
        comentario: message,
        projeto: id,
        titulo: 'Acompanhamento do Projeto',
      }),
    },
  })

  async function getComments(tipo) {
    if (!id.value) return
    isLoading.value = true
    const { data, error } = await useAxios(
      URLReq(id.value)[tipo].get,
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
    commentsReverse,
    getComments,
    sendComment,
    setID,
  }
}
