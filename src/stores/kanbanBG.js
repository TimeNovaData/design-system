import { defineStore } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useKanbanBG = defineStore('kanbanBg', () => {
  const kanbanBG = ref("https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")

  onMounted(() => {
    if (LocalStorage.has('kanbanBg')) {
      const url = LocalStorage.getItem('kanbanBg')
      kanbanBG.value = url
    } else {
      LocalStorage.set('kanbanBg',kanbanBG.value)
    }
  })

  watch(kanbanBG, (newX) => {
    LocalStorage.set('kanbanBg', kanbanBG.value)
  })

  return { kanbanBG }
})
