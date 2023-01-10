import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { LocalStorage } from 'quasar'
import { useUserStore } from './usuarios/user.store'

export const useBlurMode = defineStore('blurMode', () => {
  const blurMode = ref(false)
  const pageWithBlur = ref(false)

  const user = useUserStore()

  watch(
    () => user.userProfile.blur_mode, // fica de olho no profile
    (v) => {
      if (v !== blurMode.value) blurMode.value = v
    }
  )

  watch(blurMode, (v) => {
    toggleClassBody()
    if (v !== user.userProfile.blur_mode)
      user.setProfile({ ...user.userProfile, blur_mode: v })
  })

  watch(pageWithBlur, () => toggleClassBody())

  function toggleClassBody() {
    blurMode.value && pageWithBlur.value
      ? document.body.classList.add('blur--mode')
      : document.body.classList.remove('blur--mode')
  }

  return { blurMode, pageWithBlur }
})
