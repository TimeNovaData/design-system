import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useTagsStore = defineStore('tagStore', () => {
  const isLoading = ref(false)
  const tags = ref([])

  async function getTags() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.tagchamado + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setTags(data)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
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
