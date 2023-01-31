<template>
  <ModalCenter
    ref="modalAddPhoto"
    :text="title"
    icon="svguse:/icons.svg#icon_attachment"
    @hide="handleClosePhotoModal"
  >
    <div class="p-16 flex justify-center">
      <div v-if="!loading" class="input-container">
        <div class="input-box">
          <input
            type="file"
            :name="uploadFieldName"
            @change="handleChangeUploadField"
            accept="image/*"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
          <p>Arraste e jogue o arquivo aqui</p>

          <button>Selecione o arquivo</button>
        </div>
      </div>

      <q-spinner
        v-else
        color="primary"
        size="3em"
        :thickness="2"
        class="h-[5.625rem]"
      />
    </div>
  </ModalCenter>
</template>

<script setup>
import { ref } from 'vue'
import ModalCenter from 'src/components/Modal/ModalCenter.vue'

const props = defineProps({
  title: String,
  saveUploadedFile: Function,
  loading: {
    type: Boolean,
    default: false,
  },
  uploadFieldName: {
    type: String,
    default: 'foto',
  },
})

const modalAddPhoto = ref(null)
// const isUploading = ref(false)

function handleChangeUploadField(ev) {
  const fieldName = ev.target.name
  const files = ev.target.files

  if (!files.length) return

  const formData = new FormData()
  formData.append(fieldName, files[0])

  props.saveUploadedFile(formData)
}

function handleClosePhotoModal() {}

defineExpose({ modalAddPhoto })
</script>

<style lang="sass" scoped>

.input-container
  cursor: pointer
  width: 100%

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

.body--dark
  .input-container
    cursor: pointer

    &:hover .input-box
      border-color: rgba(var(--white), 0.7)

  .input-box
    background: rgb(var(--d-neutral-20))
    border: dashed 1px rgba(var(--white), 0.5)

    p
      color: rgba(var(--white), 0.7)

    button
      background: rgba(var(--white), 0.1)
      border-color: transparent
      color: rgb(var(--white))
</style>
