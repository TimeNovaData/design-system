import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/usuarios/user.store'
import { onMounted, watch, ref } from 'vue'
// import { LocalStorage } from 'quasar'

export default function useChamadosVisaoExpandida() {
  const user = useUserStore()
  const visaoExpandida = ref(user.userProfile.visao_expandida)

  watch(
    () => user.userProfile.visao_expandida, // fica de olho no profile
    (v) => {
      visaoExpandida.value = v
    }
  )

  watch(visaoExpandida, (v) => {
    if (v !== user.userProfile.visao_expandida)
      user.setProfile({
        ...user.userProfile.value,
        visao_expandida: visaoExpandida.value,
      })
  })

  return { visaoExpandida }
}
