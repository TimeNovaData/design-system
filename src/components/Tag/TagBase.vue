<template>
  <q-badge
    v-if="type === 'sm'"
    class="tag-base"
    :style="{ backgroundColor: cor }"
    :data-tipo="type"
  >
    <q-tooltip
      v-bind="{
        anchor: 'top middle',
        self: 'bottom middle',
        offset: [10, 10],
      }"
      >{{ nome }}
    </q-tooltip>
  </q-badge>

  <OBadge
    v-else-if="type === 'projeto'"
    size="sm"
    :badge="false"
    :color="GLOBAL.returnRGB(cor)"
    square
  >
    <template #content>
      <p class="text-center mx-auto tag-base-projeto" v-html="nome"></p>
    </template>
  </OBadge>
</template>

<script setup>
import OBadge from 'src/components/Badge/OBadge.vue'
import GLOBAL from 'src/utils/GLOBAL'

defineProps({
  nome: [Number, String],
  cor: String,
  type: {
    default: 'sm',
    type: String,
  },
})
</script>

<style lang="sass" scoped>
.tag-base
  width: 20px
  height: 8px

.tag-base,
.tag-base-projeto
  transition:  all .3s ease
  .tag-base,
  .tag-base-projeto
    transition:  all .3s ease
</style>
