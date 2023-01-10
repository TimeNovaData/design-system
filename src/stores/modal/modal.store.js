import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'
import useComments from 'src/composables/useComments'

export const useModalStore = defineStore('modalStore', () => {
  // Estado dos modais
  const modalTaskState = ref(false)
  const modalEditTaskState = ref(false)

  // Valores da task puxada da api
  const taskModalObj = ref(null)
  const taskModalAnexos = ref(null)
  const taskModalCommentObj = ref(null)

  const taskStore = useTaskStore()
  const anexosStore = useAnexoStore()

  const resetValues = () => {
    taskModalObj.value = null
    taskModalAnexos.value = null
    taskModalCommentObj.value = null
    console.warn('resetou')
  }

  async function openTaskViewModal(taskId) {
    const taskRes = await taskStore.getTask(taskId)
    const anexosRes = await anexosStore.getAnexos(`?task__id=${taskId}`)

    taskModalObj.value = taskRes
    taskModalAnexos.value = anexosRes
    modalTaskState.value = true

    const { isLoading, commentsReverse, getComments, sendComment, setID } =
      useComments()

    setID(taskId)

    await getComments('task')

    taskModalCommentObj.value = {
      isLoading: isLoading.value,
      comments: computed(() => commentsReverse.value),
      getComments,
      sendComment,
    }
  }

  function openTaskEditModal() {
    modalEditTaskState.value = true
  }

  const closeTaskViewModal = () => {
    modalTaskState.value = false
    resetValues()
  }

  const closeTaskEditModal = () => {
    modalEditTaskState.value = false
  }

  return {
    modalTaskState,
    modalEditTaskState,
    taskModalObj,
    taskModalAnexos,
    taskModalCommentObj,
    openTaskViewModal,
    openTaskEditModal,
    closeTaskViewModal,
    closeTaskEditModal,
  }
})
