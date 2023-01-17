<template>
  <TaskCreateAttachmentCard
    class="h-full flex-1"
    @processfile="handleEmit"
    :server="{
      url: API_URL,
      timeout: 7000,
      process: {
        url: server.url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        ondata: (formData) => {
          formData.append(server.key, server.id)
          return formData
        },
      },
      revert: (uniqueFileId) => {
        return {
          url: server.url + uniqueFileId,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      },
    }"
  />
</template>

<script setup>
import { Cookies } from 'quasar'
import TaskCreateAttachmentCard from 'src/components/Task/TaskCreate/TaskCreateAttachmentCard.vue'
import emitter from 'src/boot/emitter'

const API_URL = process.env.API_URL
const TOKEN = Cookies.get('NDT_TOKEN')

const props = defineProps({
  server: {
    type: Object,
  },
})

function handleEmit(obj) {
  emitter.emit(`filepond:${props.server.key}`)
}
</script>

<style lang="scss" scoped></style>
