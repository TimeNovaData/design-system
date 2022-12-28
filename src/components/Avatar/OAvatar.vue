<template>
  <div class="flex items-center gap-8 mt-6">
    <q-avatar size="1.75rem">
      <q-img :src="GLOBAL.imgSrc(item.foto)" />
    </q-avatar>

    <p class="text-paragraph-1 capitalize">{{ item.nome }}</p>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'

defineProps({
  item: Object,
})
</script>

<style lang="scss" scoped></style>
