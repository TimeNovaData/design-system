import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useUsuarioStore = defineStore('usuarioStore', () => {
  const usuarios = ref([])
  const isLoading = ref(false)

  const usuariosOptions = computed(() =>
    usuarios.value.map((i) => ({ label: i.nome, value: i.id }))
  )

  async function getUsuarios() {
    isLoading.value = true

    const { data, error } = await useAxios(URLS.cliente, { method: 'GET' }, api)

    try {
      setUsuarios(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setUsuarios(value) {
    usuarios.value = value
  }

  return {
    getUsuarios,
    setUsuarios,
    usuarios,
    usuariosOptions,
  }
})
