<template>
  <div class="flex items-center gap-8">
    <q-avatar
      :size="size"
      class="!bg-neutral-20 dark:!bg-white/10"
      :class="classAvatar"
    >
      <q-img v-if="foto" :src="foto" no-spinner />
    </q-avatar>

    <p class="text-paragraph-2 capitalize" :class="classText" v-if="nome">
      {{ nome }}
    </p>
  </div>
</template>
<script>
export default { inheritAttrs: false }
</script>

<script setup>
defineProps({
  foto: String,
  nome: String,
  classText: String,
  classAvatar: String,
  size: {
    type: String,
    default: '1.75rem',
  },
})
</script>

<style lang="scss" scoped></style>
