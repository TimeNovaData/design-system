<template>
  <ModalCenter
    ref="modalAddPhoto"
    :text="title"
    icon="svguse:/icons.svg#icon_attachment"
    @hide="handleClosePhotoModal"
  >
    <div class="p-16">
      <div class="input-container">
        <div class="input-box">
          <input
            type="file"
            :name="uploadFieldName"
            @change="handleChangeUploadField"
            accept="image/*"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
          <p v-if="isUploading">Enviando o arquivo...</p>
          <p v-else>Arraste e jogue o arquivo aqui</p>

          <button>Selecione o arquivo</button>
        </div>
      </div>
    </div>
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import ModalCenter from 'src/components/Modal/ModalCenter.vue'

const { URLS } = api.defaults

const props = defineProps({
  title: String,
  profileId: Number,
  uploadFieldName: {
    type: String,
    default: 'foto',
  },
})

const modalAddPhoto = ref(null)
const isUploading = ref(false)

function handleChangeUploadField(ev) {
  const fieldName = ev.target.name
  const files = ev.target.files

  if (!files.length) return

  const formData = new FormData()
  formData.append(fieldName, files[0])

  saveUploadedFile(formData)
}

async function saveUploadedFile(formData) {
  isUploading.value = true
  const reqUrl = URLS.profile + `${props.profileId}/`

  try {
    const req = await api.patch(reqUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    console.log(req)
  } catch (err) {
    console.log(err)
  } finally {
    isUploading.value = false
  }

  // for (const pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1])
  // }
}

function handleClosePhotoModal() {}

defineExpose({ modalAddPhoto })
</script>

<style lang="sass" scoped>

.input-container
  cursor: pointer

  &:hover .input-box
    border-color: rgba(var(--neutral-100), 0.3)

.input-box
  background: rgb(var(--neutral-10))
  border: dashed 1px rgba(var(--neutral-100), 0.1)
  padding: .75rem
  height: 5.625rem
  border-radius: 3px
  transition: all .2s
  position: relative

  p
    text-align: center
    font-size: 14px
    line-height: 157%
    color: rgb(var(--neutral-70))

  button
    display: flex
    align-items: center
    margin: .75rem auto 0
    background: rgb(var(--white))
    padding: .375rem
    height: 2rem
    border: solid 1px rgba(var(--neutral-100), 0.1)
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06)
    border-radius: 3px
    font-size: 12px
    color: rgb(var(--neutral-100))
    line-height: 167%
    pointer-events: none
</style>
