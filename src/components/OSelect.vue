<template>
  <q-select
    ref="selectRef"
    :class="'size-' + attrs.size"
    :size="null"
    v-bind="attrs"
    popup-content-class="select-menu"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </q-select>
</template>

<script>
export default { inheritAttrs: false };
</script>

<script setup>
import { useSlots, useAttrs, ref, onMounted } from "vue";

const slots = useSlots();
const attrs = useAttrs();
const selectRef = ref(null);

onMounted(() => {
  console.log(slots);
});
defineExpose({ selectRef });
</script>

<style lang="sass"></style>
