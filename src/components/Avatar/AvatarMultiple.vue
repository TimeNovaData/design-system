<template>
  <AvatarSingle
    v-for="(n, index) in visivelList"
    :href="n.foto"
    :side="side"
    :key="index"
    :index="index"
    :nome="n.nome"
  >
  </AvatarSingle>
  <div
    v-if="invisivelList.length"
    class="have-more text-paragraph-4 leading-none"
    :style="`${side}: ${(visivelList.length + 1) * 15}px;  'z-index':-${
      visivelList.length
    }`"
  >
    +{{ invisivelList.length }}
    <q-tooltip
      v-bind="{
        anchor: 'top middle',
        self: 'bottom middle',
        offset: [10, 10],
      }"
    >
      <ul class="flex flex-col gap-4">
        <li v-for="(i, index) in invisivelList" :key="index">
          <OAvatar :nome="i.nome" :foto="i.foto" />
        </li>
      </ul>
    </q-tooltip>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AvatarSingle from './AvatarSingle.vue'
import OAvatar from './OAvatar.vue'

const props = defineProps({
  list: {
    type: Array,
    // default: () => [
    //   {
    //     foto: 'https://cdn.quasar.dev/img/avatar1.jpg',
    //     nome: 'Teste',
    //   },
    //   {
    //     foto: 'https://cdn.quasar.dev/img/avatar2.jpg',
    //     nome: 'Teste',
    //   },
    //   {
    //     foto: 'https://cdn.quasar.dev/img/avatar3.jpg',
    //     nome: 'Teste',
    //   },
    //   {
    //     foto: 'https://cdn.quasar.dev/img/avatar4.jpg',
    //     nome: 'Teste',
    //   },
    //   {
    //     foto: 'https://cdn.quasar.dev/img/avatar5.jpg',
    //     nome: 'Teste',
    //   },
    // ],
  },
  limit: {
    type: Number,
    default: 3,
  },
  side: {
    type: String,
    default: 'left',
  },
})

const visivelList = computed(() => props.list.slice(0, props.limit))
const invisivelList = computed(() =>
  props.list.slice(props.limit, props.list.length + 1)
)
</script>

<style lang="sass" scoped>
.have-more
  width: 2rem
  height: 2rem
  border-radius: 100%
  display: grid
  place-items: center
  overflow: hidden
  text-align: center
  position: absolute
  background: rgba(var(--neutral-30), 1)
  border: 2px solid white
  .body--dark &
    border-color: rgba(var(--d-neutral-10), 1)
    background: rgba(var(--d-neutral-30), 1)
</style>
