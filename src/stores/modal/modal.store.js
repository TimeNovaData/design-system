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
    taskStore.setOpenTask(null)
    console.warn('resetou')
  }

  async function getTaskAnexos(taskId) {
    const anexosRes = await anexosStore.getAnexos(
      `&task__id=${taskId}`,
      false,
      'task'
    )

    taskModalAnexos.value = anexosRes
  }

  async function openTaskViewModal(taskId) {
    const taskRes = await taskStore.getTask(taskId)

    taskModalObj.value = taskRes
    modalTaskState.value = true

    const { isLoading, comments, getComments, sendComment, setID } =
      useComments()

    setID(taskId)
    taskStore.setOpenTask(taskId)

    getComments('task')
    getTaskAnexos(taskId)

    taskModalCommentObj.value = {
      isLoading: isLoading.value,
      comments: computed(() => comments),
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

  const setTaskModalAnexos = (val) => {
    taskModalAnexos.value = val
  }

  const setNewValueModal = async (taskId) => {
    console.log('id', taskId)
    const taskRes = await taskStore.getTask(taskId)
    getTaskAnexos(taskId)

    taskModalObj.value = taskRes
  }

  return {
    modalTaskState,
    modalEditTaskState,
    taskModalObj,
    taskModalAnexos,
    taskModalCommentObj,
    getTaskAnexos,
    openTaskViewModal,
    openTaskEditModal,
    closeTaskViewModal,
    closeTaskEditModal,
    setTaskModalAnexos,
    setNewValueModal,
  }
})
