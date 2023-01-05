import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { deepUnref } from 'vue-deepunref'
import GLOBAL from 'src/utils/GLOBAL'

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
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.task + '?x=' + filtro + '&no_loading',
      { method: 'GET' },
      api
    )
    try {
      setTasksChamado(data.value.results)
      setTasks(data.value.results)

      return data.value.results
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getTask(id) {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.task + id + '?x=' + '&no_loading',
      { method: 'GET' },
      api
    )
    try {
      setTask(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getTaskTypes() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.tipotask + '?no_loading',
      { method: 'GET' },
      api
    )
    try {
      setTaskTypes(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
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
      console.log(newTaskUnref)
    } else {
      const data = GLOBAL.compareAndReturnDiff(oldTaskUnref, newTaskUnref)

      window._yellow('ALTERAR')
      console.log(data)
      // api.patch(URLS.task + task.value.id + '/', data)
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
