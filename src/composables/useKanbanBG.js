import { onMounted, watch, ref } from 'vue'
import { LocalStorage } from 'quasar'
// import img from 'src/assets/image/kanban-bg.jpg'
import { useUserStore } from 'src/stores/usuarios/user.store'

export default function useChamadosBG() {
  const kanbanBG = ref('')
  const user = useUserStore()

  onMounted(() => {
    const storage = LocalStorage.getItem('kanbanBg')
    storage && (kanbanBG.value = storage)
  })

  watch(kanbanBG, (v) => {
    LocalStorage.set('kanbanBg', v)
    if (v !== user.userProfile.background_url)
      user.setProfile({ ...user.userProfile, background_url: v })
  })

  watch(
    () => user.userProfile.background_url, // fica de olho no profile
    (v) => {
      if (v !== kanbanBG.value) kanbanBG.value = v
    }
  )

  return { kanbanBG }
}
