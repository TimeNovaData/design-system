<template>
  <div class="flex items-center gap-8">
    <q-avatar
      :size="size"
      class="!bg-neutral-20 dark:!bg-white/10"
      :class="classAvatar"
      v-bind="attrs"
    >
      <q-img no-transition v-if="foto" :src="foto" no-spinner />
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
import { useAttrs } from 'vue'

const attrs = useAttrs()
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
