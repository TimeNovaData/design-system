<template>
  <q-card class="detail-card px-16">
    <div class="detail-line">
      <span class="text-caps-3">TÍTULO</span>
      <p>Telas do Hub</p>
    </div>

    <hr />

    <div class="detail-line">
      <span class="text-caps-3">CLIENTE - PROJETO / SUBPROJETO</span>
      <p>Telas do Hub</p>
    </div>

    <hr />

    <div class="grid grid-cols-2">
      <div class="detail-line">
        <span class="text-caps-3">GRUPO / TIPO</span>
        <p>Telas do Hub</p>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OInput from 'src/components/Input/OInput.vue'
</script>

<style lang="sass" scoped>
:deep(.q-field__native)
  background: red !important

.detail-line
  display: flex
  flex-direction: column
  padding: 1.25rem 0

  // span
  //   display: block
  //   color: rgb(var(--neutral-60))
  //   font-weight: 600
  //   font-size: .625rem
  //   line-height: 160%
  //   letter-spacing: 0.04em
  //   margin-bottom: .375rem

  // p
  //   font-size: 1rem
  //   line-height: 150%
  //   color: rgb(var(--neutral-70))

hr
  border-color: rgba(var(--neutral-100), 0.1)
</style>
