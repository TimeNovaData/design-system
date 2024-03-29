import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { deepUnref } from 'vue-deepunref'
import GLOBAL from 'src/utils/GLOBAL'
import { NotifyError, NotifySucess } from 'src/boot/Notify'
import emitter from 'src/boot/emitter'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'

const { URLS } = api.defaults

export const useTaskStore = defineStore('taskstore', () => {
  const isLoading = ref(false)
  const tasks = ref([])
  const task = ref({})
  const tasksChamado = ref([])
  const taskTypes = ref([])
  const tasksReference = ref([])
  const taskActive = ref({})
  const openTask = ref(null)

  const newTaskFiles = ref([])

  const tasksColaborador = ref({
    concluidas: [],
    pendentes: [],
  })

  const tasksChamadoConcluido = computed(() =>
    tasksChamado.value.filter((t) => t.status === 'Concluído')
  )

  const tasksChamadoPendente = computed(() =>
    tasksChamado.value.filter(
      (t) => t.status === 'Em andamento' || t.status === 'Aguardando'
    )
  )

  async function getTasks(filtro = '', set = true) {
    try {
      const { data } = await api.get(URLS.task + '?x=' + filtro + '&no_loading')
      set && setTasksChamado(data.results)
      set && setTasks(data.results)
      return data.results
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function getTask(id) {
    try {
      const { data } = await api.get(URLS.task + id + '?x=' + '&no_loading')
      setTask(data)

      data.responsavel_task.foto = data.responsavel_task.profile?.foto

      return data
    } catch (e) {
      console.log(e)
      return e
    } finally {
      isLoading.value = false
    }
  }

  async function getTaskTypes() {
    try {
      const { data } = await api.get(URLS.tipotask + '?no_loading')

      setTaskTypes(data)
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function deleteTaskType(id) {
    try {
      await api.delete(URLS.tipotask + id)
      await getTaskTypes()

      NotifySucess('Tipo de task Excluido com sucesso')
    } catch (e) {
      NotifyError('Erro ao Deletar tipo de task')
      console.log(e)
      return e
    }
  }

  async function postTempoTask(filters, task) {
    try {
      const { data } = await api.post(
        URLS.tempotask + '?x=&no_loading' + filters,
        {
          task: task.id,
        }
      )
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function getTempoTask(id) {
    try {
      const { data } = await api.get(
        URLS.tempotask + id + '/continue_marcacao/?x=&no_loading'
      )
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async function handleSaveTask(oldTask, newTask) {
    const oldTaskUnref = deepUnref(oldTask)
    const newTaskUnref = deepUnref(newTask)
    const objIsEmpty = (obj) => Object.keys(obj).length === 0

    if (!newTaskUnref && objIsEmpty(oldTaskUnref)) {
      window._red('PREENCHA OS CAMPOS')
      return
    } else if (!newTaskUnref && !newTaskFiles.value.length) {
      console.log('ARR FILES dentro else', newTaskFiles)
      window._red('NENHUM DADO FOI ALTERADO')
      return
    }

    if (objIsEmpty(oldTaskUnref)) {
      window._yellow('CADASTRAR')

      const data = newTaskUnref
      try {
        const newTask = await api.post(URLS.task, data)
        NotifySucess('Task Criada com sucesso')
        emitter.emit('modal:task:create')

        newTaskFiles.value.forEach(async (meta) => {
          const formData = new FormData()
          formData.append('task', newTask.data.id)
          formData.append('attachments', meta.file)
          await api.post(URLS.anexo, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        })

        return newTask
      } catch (e) {
        NotifyError('Erro ao Criar Tarefa')
        console.log(e)
      }
    } else {
      try {
        const data = GLOBAL.compareAndReturnDiff(oldTaskUnref, newTaskUnref)

        window._yellow('ALTERAR')
        console.log(data)
        console.log('ARR FILES', newTaskFiles)

        let taskEditada
        if (data) {
          taskEditada = await api.patch(URLS.task + task.value.id + '/', data)
        }

        newTaskFiles.value.forEach(async (meta) => {
          const formData = new FormData()
          formData.append('task', task.value.id)
          formData.append('attachments', meta.file)
          await api.post(URLS.anexo, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        })

        NotifySucess('Task Alterada com sucesso')
        emitter.emit('modal:task:edit')

        return taskEditada
      } catch (e) {
        NotifyError('Erro ao Alterar Tarefa')
        console.log(e)
      }
    }
  }

  async function pathTask(id, patchData) {
    try {
      const { data } = await api.patch(URLS.task + id + '/', patchData)
      return data
    } catch (e) {
      console.log(e)
      return e
    } finally {
      isLoading.value = false
    }
  }

  let cacheOrder
  async function updateTaskOrder(listTasksId) {
    if (cacheOrder !== listTasksId) {
      cacheOrder = listTasksId
      await api.post(`${URLS.atualizar_ordem_task}?no_loading`, {
        id_tasks: listTasksId,
      })
    }
  }

  function setTasks(value) {
    tasks.value = value
  }
  function setTasksChamado(value) {
    tasksChamado.value = value
  }
  function setTask(value) {
    task.value = value
  }
  function setTaskTypes(value) {
    taskTypes.value = value
  }
  function setOpenTask(value) {
    // Passar o id da task para o ModalAddAnexo da App
    openTask.value = value
  }
  function setNewTaskFiles(value) {
    newTaskFiles.value = value
  }
  function setTasksReference(value) {
    tasksReference.value = value
  }

  return {
    task,
    tasks,
    taskTypes,
    tasksColaborador,
    tasksReference,
    openTask,
    getTasks,
    getTask,
    setTasks,
    getTaskTypes,
    deleteTaskType,
    handleSaveTask,
    pathTask,
    postTempoTask,
    getTempoTask,
    tasksChamado,
    tasksChamadoConcluido,
    tasksChamadoPendente,
    taskActive,
    setOpenTask,
    setNewTaskFiles,
    setTasksReference,
    updateTaskOrder,
  }
})
