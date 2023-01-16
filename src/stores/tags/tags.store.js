import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useTagStore = defineStore('tagStore', () => {
  const tags = ref([])

  async function getTags() {
    try {
      const { data } = await api.get(URLS.tagchamado + '?no_loading')
      setTags(data)
      return data
    } catch (e) {
      console.log(e)
      return e
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
