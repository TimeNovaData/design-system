import { defineStore } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { LocalStorage, Dark } from 'quasar'

export const useDarkMode = defineStore('darkMode', () => {
  const darkMode = ref(false)

  onMounted(() => {
    if (LocalStorage.has('darkMode')) {
      const mode = LocalStorage.getItem('darkMode')
      darkMode.value = mode
    } else {
      LocalStorage.set('darkMode', darkMode.value)
    }
  })

  watch(darkMode, (newX) => {
    LocalStorage.set('darkMode', darkMode.value)
    Dark.set(darkMode.value)
  })

  return { darkMode }
})
