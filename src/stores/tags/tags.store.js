import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useTagStore = defineStore('tagStore', () => {
  const tags = ref([])

  async function getTags() {
    const { data, error } = await useAxios(
      URLS.tagchamado + '?no_loading',
      { method: 'GET' },
      api
    )
    try {
      setTags(data.value)
      return data.value
    } catch (e) {
      return error
    }
  }

  function setTags(value) {
    tags.value = value
  }

  return {
    getTags,
    setTags,
    tags,
  }
})
