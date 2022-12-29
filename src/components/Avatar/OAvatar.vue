<template>
  <div class="flex items-center gap-8">
    <q-avatar :size="size" class="bg-neutral-20 dark:white/10">
      <q-img v-if="foto" :src="foto" no-spinner />
    </q-avatar>

    <p class="text-paragraph-1 capitalize" v-if="nome">{{ nome }}</p>
  </div>
</template>
<script>
export default { inheritAttrs: false }
</script>
<script setup>
import GLOBAL from 'src/utils/GLOBAL'

defineProps({
  foto: String,
  nome: String,
  size: {
    type: String,
    default: '1.75rem',
  },
})
</script>

<style lang="scss" scoped></style>
