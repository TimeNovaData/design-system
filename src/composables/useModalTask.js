import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from 'src/stores/tasks/tasks.store'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'

export default function useModalTask(modalRef) {
  // Dados da task
  const taskModal = ref(null)
  // const { getTask } = useTaskStore()
  // const { task: storeTasks } = storeToRefs(useTaskStore())

  // Anexos da task
  const { getAnexos } = useAnexoStore()
  const { anexos } = storeToRefs(useAnexoStore())

  // Modal de visualizar

  async function openViewTaskModal(task) {
    // await getTask(`${taskId}/`)
    await getAnexos(`?task__id=${task.id}`)
    taskModal.value = task
    modalRef.value.showModal()
  }

  // Modal de editar
  // Modal de criar

  return {
    taskModal,
    anexos,
    openViewTaskModal,
  }
}
