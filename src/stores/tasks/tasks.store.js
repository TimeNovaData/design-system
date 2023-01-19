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
  const taskActive = ref({})

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

      const result = data.map((i) => {
        i.nome_completo = `${
          i.ferramenta?.nome_ferramenta
            ? i.ferramenta?.nome_ferramenta + ' ⠂'
            : ''
        } ${i.nome || ''}`.trim()
        return i
      })

      setTaskTypes(result)
      return data
    } catch (e) {
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
      debugger
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
        // debugger
        const newTask = await api.post(URLS.task, data)
        NotifySucess('Task Criada com sucesso')
        emitter.emit('modal:task:create')
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
        emitter.emit('modal:task:edit')

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
    tasksColaborador,
    getTasks,
    getTask,
    setTasks,
    getTaskTypes,
    handleSaveTask,
    postTempoTask,
    tasksChamado,
    tasksChamadoConcluido,
    tasksChamadoPendente,
    taskActive,
  }
})
