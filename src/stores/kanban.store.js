import { defineStore } from 'pinia'
import { onMounted, watch, ref, onUpdated } from 'vue'
// import { LocalStorage } from 'quasar'
// import router from 'src/router'

export const useKanbanStore = defineStore('kanbanStore', () => {
  const cardsCached = ref([])

  return { cardsCached }
})
