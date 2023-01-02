import { onMounted, watch, ref } from 'vue'
import { LocalStorage, Dark } from 'quasar'

export default function useDarkMode() {
  const darkMode = ref(false)

  onMounted(() => {
    const auto = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storage = LocalStorage.getItem('darkMode')
    const mode = storage === null ? auto : storage // for auto darkmode
    darkMode.value = mode
  })

  watch(darkMode, (newX) => {
    LocalStorage.set('darkMode', darkMode.value)
    Dark.set(darkMode.value)
  })

  return { darkMode }
}
