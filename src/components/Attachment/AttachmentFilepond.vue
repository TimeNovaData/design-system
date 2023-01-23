<template>
  <TaskCreateAttachmentCard
    class="h-full flex-1"
    @processfile="handleEmit"
    @processfilerevert="handleEmitRevert"
    :server="serverOpt"
    :openModal="false"
    :filePondFiles="filaAnexos"
  />
</template>

<script setup>
import { Cookies } from 'quasar'
import TaskCreateAttachmentCard from 'src/components/Task/TaskCreate/TaskCreateAttachmentCard.vue'
import emitter from 'src/boot/emitter'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { NotifySucess } from 'src/boot/Notify'
import { useAnexoStore } from 'src/stores/anexos/anexos.store'

const API_URL = process.env.API_URL
const TOKEN = Cookies.get('NDT_TOKEN')

const props = defineProps({
  server: {
    type: Object,
  },
})

const { filaAnexos } = useAnexoStore()

const serverOpt = {
  url: API_URL,
  timeout: 7000,

  process: {
    url: props.server.url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    ondata: (formData) => {
      formData.append(props.server.key, props.server.id)
      return formData
    },
    onerror: (response) => {
      console.log(response)
    },
  },

  revert: async (uniqueID) => {
    const id = JSON.parse(uniqueID)
    if (id.id) {
      await api.delete(props.server.url + id.id)
      handleEmitRevert()
      NotifySucess('Anexo removido com sucesso')
    }
  },
}

const uniqueFileId = ref(null)

function handleEmit(obj) {
  emitter.emit(`filepond:${props.server.key}`)
}
function handleEmitRevert() {
  emitter.emit(`filepond:${props.server.key}:revert`)
}
</script>

<style lang="scss" scoped></style>
