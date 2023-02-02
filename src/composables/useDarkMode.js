import { onMounted, watch, ref, nextTick } from 'vue'
import { LocalStorage, Dark } from 'quasar'
import { useUserStore } from 'src/stores/usuarios/user.store'

export default function useDarkMode() {
  const user = useUserStore()
  const darkMode = ref(user.userProfile.dark_mode)

  watch(darkMode, async (v) => {
    await nextTick()
    if (v === user.userProfile.dark_mode) return
    console.log(v, user.userProfile.dark_mode)
    Dark.set(v)
    LocalStorage.set('darkMode', v)
    user.setProfile({ dark_mode: v })
  })

  watch(
    () => user.userProfile.dark_mode, // fica de olho no profile
    async (v) => {
      if (!user.userProfile.id) return
      if (v === darkMode.value) return
      darkMode.value = v
    }
  )

  onMounted(() => {
    const storage = LocalStorage.getItem('darkMode')
    if (storage) darkMode.value = storage
  })

  return { darkMode }
}
