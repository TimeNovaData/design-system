import { onMounted, watch, ref } from 'vue'
import { LocalStorage } from 'quasar'
import img from 'src/assets/image/kanban-bg.jpg'

export default function useKanbanBG() {
  const kanbanBG = ref(img)

  onMounted(() => {
    if (LocalStorage.has('kanbanBg')) {
      kanbanBG.value = LocalStorage.getItem('kanbanBg')
    } else {
      LocalStorage.set('kanbanBg', kanbanBG.value)
    }
  })

  watch(kanbanBG, (newX) => {
    LocalStorage.set('kanbanBg', kanbanBG.value)
  })

  return { kanbanBG }
}
