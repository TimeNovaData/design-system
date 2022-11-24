import { defineStore } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { LocalStorage} from 'quasar'

export const useBlurMode = defineStore('blurMode', () => {
  const blurMode = ref(false)

  onMounted(() => {
    if (LocalStorage.has('blurMode')) {
      const mode = LocalStorage.getItem('blurMode')
      blurMode.value = mode
    } else {
      LocalStorage.set('blurMode', blurMode.value)
    }
  })

  watch(blurMode, (newX) => {
    LocalStorage.set('blurMode', blurMode.value)
    blurMode.value
        ? document.body.classList.add("blur--mode")
        : document.body.classList.remove("blur--mode")
  })

  return { blurMode }
})
