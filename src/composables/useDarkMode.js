import { onMounted, watch, ref } from 'vue'
import { LocalStorage, Dark } from 'quasar'
import { useUserStore } from 'src/stores/usuarios/user.store'

export default function useDarkMode() {
  const user = useUserStore()
  const darkMode = ref(user.userProfile.dark_mode)

  onMounted(() => {
    const storage = LocalStorage.getItem('darkMode')
    storage && (darkMode.value = storage)
  })

  watch(darkMode, (v) => {
    if (v !== user.userProfile.dark_mode) {
      Dark.set(darkMode.value)
      LocalStorage.set('darkMode', v)
      user.setProfile({ ...user.userProfile, dark_mode: v })
    }
  })

  watch(
    () => user.userProfile.dark_mode, // fica de olho no profile
    (v) => {
      if (v !== darkMode.value) darkMode.value = v
    }
  )

  return { darkMode }
}
