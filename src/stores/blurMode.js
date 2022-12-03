import { defineStore } from 'pinia'
import { onMounted, watch, ref, onUpdated } from 'vue'
import { LocalStorage } from 'quasar'
import router from 'src/router'

export const useBlurMode = defineStore('blurMode', () => {
  const blurMode = ref(LocalStorage.getItem('blurMode'))
  const isKanban = ref(false)

  watch(blurMode, () => {
    LocalStorage.set('blurMode', blurMode.value)
    toggleClassBody()
  })

  watch(isKanban, () => toggleClassBody())

  function toggleClassBody() {
    blurMode.value && isKanban.value
      ? document.body.classList.add('blur--mode')
      : document.body.classList.remove('blur--mode')
  }

  return { blurMode, isKanban }
})
