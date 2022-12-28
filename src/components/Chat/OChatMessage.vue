<template>
  <div>
    <q-chat-message
      :avatar="data.userImg"
      :text="[data.text]"
      :sent="data.sent"
    ></q-chat-message>

    <div
      class="flex items-center gap-6 text-paragraph-3 mt-4"
      :class="{
        'justify-end mr-[2.75rem]': data.sent,
        'ml-[2.75rem]': !data.sent,
      }"
    >
      <span>{{ data.user }}</span>
      <span class="text-neutral-100/40">•</span>
      <span class="text-neutral-60">{{ data.date }}</span>
      <span class="text-neutral-100/40">•</span>

      <OBadge rounded size="sm" class="h-20 font-semibold">
        <template v-slot:content>{{ data.tag }}</template>
      </OBadge>
    </div>
  </div>
</template>

<script setup>
import OBadge from 'src/components/Badge/OBadge.vue'

const props = defineProps({
  data: Object,
})
</script>

<style lang="sass"></style>
