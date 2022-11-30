<template>
  <q-card
    class="p-16 w-full !shadow-transparent border border-neutral-30 rounded-md flex items-center"
  >
    <div class="flex items-center">
      <div
        class="icone grid place-items-center rounded-full bg-primary-pure-10 h-48 w-48 mr-12"
      >
        <q-icon size="1.5rem" :name="name"></q-icon>
      </div>
      <h1 class="text-title-6 text-neutral-100">{{ title }}</h1>
    </div>
    <div class="arrow ml-auto">
      <svg
        width="7"
        height="10"
        viewBox="0 0 7 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.33337 9L5.33337 5L1.33337 1"
          stroke="#3377FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps({
  name: String,
  title: String,
})
</script>

<style lang="sass" scoped>
.q-card
  box-shadow: none
</style>
