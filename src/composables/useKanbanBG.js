import { onMounted, watch, ref } from 'vue'
import { LocalStorage } from 'quasar'
// import img from 'src/assets/image/kanban-bg.jpg'
import { useUserStore } from 'src/stores/usuarios/user.store'

export default function useKanbanBG() {
  const kanbanBG = ref('')
  const user = useUserStore()

  onMounted(() => {
    const bg = user.userProfile.background_url
    const storage = LocalStorage.getItem('BGkanban')
    if (storage) kanbanBG.value = storage
    if (bg) kanbanBG.value = bg
  })

  watch(kanbanBG, (v) => {
    LocalStorage.set('BGkanban', v)
    user.setProfile({ ...user.userProfile, background_url: v })
  })

  watch(
    () => user.userProfile.background_url, // fica de olho no profile
    (v) => {
      kanbanBG.value = v
    }
  )

  return { kanbanBG }
}
