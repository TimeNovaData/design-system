import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUserStore } from './user.store'

const { URLS } = api.defaults

export const useUsuarioStore = defineStore('usuarioStore', () => {
  const usuarios = ref([])

  async function getUsuarios() {
    try {
      const { data } = await api.get(URLS.fotoUsuario + '?no_loading')
      const usuarios = data.map((i) => {
        i.foto = i.profile?.foto
        return i
      })
      setUsuarios(usuarios)
      return usuarios
    } catch (e) {
      console.log(e)
      return e
    }
  }

  function setUsuarios(value) {
    usuarios.value = value
  }

  function $reset() {
    usuarios.value = []
  }
  return {
    getUsuarios,
    setUsuarios,
    usuarios,
    $reset,
  }
})
