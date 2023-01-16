import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { deepUnref } from 'vue-deepunref'
import GLOBAL from 'src/utils/GLOBAL'
import { NotifyError, NotifySucess } from 'src/boot/Notify'
import emitter from 'src/boot/emitter'

const { URLS } = api.defaults

export const useTaskStore = defineStore('taskstore', () => {
  const isLoading = ref(false)
  const tasks = ref([])
  const task = ref({})
  const tasksChamado = ref([])
  const taskTypes = ref([])

  const tasksChamadoConcluido = computed(() =>
    tasksChamado.value.filter((t) => t.status === 'Concluído')
  )

  const tasksChamadoPendente = computed(() =>
    tasksChamado.value.filter(
      (t) => t.status === 'Em andamento' || t.status === 'Aguardando'
    )
  )

  async function getTasks(filtro = '') {
    try {
      const { data } = await api.get(URLS.task + '?x=' + filtro + '&no_loading')
      setTasksChamado(data.results)
      setTasks(data.results)
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
      console.log(data)
      setTaskTypes(data)
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
    } else if (!newTaskUnref) {
      window._red('NENHUM DADO FOI ALTERADO')
      return
    }

    if (objIsEmpty(oldTaskUnref)) {
      window._yellow('CADASTRAR')

      const data = newTaskUnref
      try {
        const newTask = await api.post(URLS.task, data)
        NotifySucess('Task Criada com sucesso')
        emitter.emit('taskCreate')
        return newTask
      } catch (e) {
        NotifyError('Erro ao Criar Tarefa')
        console.log(e)
      }
      //
    } else {
      try {
        const data = GLOBAL.compareAndReturnDiff(oldTaskUnref, newTaskUnref)
        window._yellow('ALTERAR')
        console.log(data)
        const taskEditada = await api.patch(
          URLS.task + task.value.id + '/',
          data
        )

        NotifySucess('Task Alterada com sucesso')
        emitter.emit('taskEdit')

        return taskEditada
      } catch (e) {
        NotifyError('Erro ao Alterar Tarefa')
        console.log(e)
      }
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

  return {
    task,
    tasks,
    taskTypes,
    getTasks,
    getTask,
    setTasks,
    getTaskTypes,
    handleSaveTask,
    tasksChamado,
    tasksChamadoConcluido,
    tasksChamadoPendente,
  }
})
