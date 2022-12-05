import { defineStore } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { LocalStorage, Dark } from 'quasar'

export const useDarkMode = defineStore('darkMode', () => {
  const darkMode = ref(false)

  onMounted(() => {
    const auto = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storage = LocalStorage.getItem('darkMode')
    console.log(storage, 'storage')
    const mode = storage === null ? auto : storage // for auto darkmode
    // const mode = storage  // for manual
    darkMode.value = mode
  })

  watch(darkMode, (newX) => {
    LocalStorage.set('darkMode', darkMode.value)
    Dark.set(darkMode.value)
  })

  return { darkMode }
})
