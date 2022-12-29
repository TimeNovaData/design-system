<template>
  <div class="flex items-center flex-nowrap gap-8 mt-6">
    <q-avatar size="1.75rem" color="primary">
      <q-img v-if="item.foto" :src="item.foto" />
      <!-- <q-img :src="GLOBAL.imgSrc(item.foto)" /> -->
    </q-avatar>

    <p class="text-paragraph-1 capitalize one-line">{{ item.nome }}</p>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
})
</script>

<style lang="scss" scoped></style>
