<template>
  <q-card
    class="border border-neutral-100/10 shadow-sm rounded-md overflow-hidden dark:!bg-d-neutral-40 dark:border-white/5"
  >
    <div class="border-wrapper" :class="cardType">
      <div class="bg-white dark:!bg-d-neutral-40">
        <h3 class="text-headline-3 px-16 pt-16 pb-8">
          {{ cardTitle }}
        </h3>
      </div>
    </div>

    <h1 class="text-title-3 px-16 py-8">{{ cardValue }}</h1>
  </q-card>
</template>

<script setup>
const props = defineProps({
  cardTitle: {
    type: String,
    default: '-',
  },
  cardValue: {
    type: Number,
    default: 0,
  },
  cardType: {
    type: String,
    default: 'success',
  },
})
</script>

<style lang="sass" scoped>
.border-wrapper
  position: relative
  padding-bottom: 1px

  &::before
    content: ''
    height: .25rem
    width: 1.5rem
    position: absolute
    top: 0
    left: 1rem
    border-radius: 0px 4px 4px 4px

.border-wrapper.success
  background: linear-gradient(90deg, rgba(0, 128, 36, 0.2) 0%, rgba(0, 128, 36, 0) 100.06%)

  &::before
    background: rgb(var(--alert-success))

  h3
    color: rgb(var(--alert-success))
    background: linear-gradient(104.44deg, #008024 -29.9%, rgba(0, 128, 36, 0.1) -29.89%, rgba(0, 128, 36, 0) 60.26%)

.border-wrapper.error
  background: linear-gradient(90deg, rgba(233, 44, 44, 0.2) 0%, rgba(233, 44, 44, 0) 100.06%)

  &::before
    background: rgb(var(--alert-error))

  h3
    color: rgb(var(--alert-error))
    background: linear-gradient(104.44deg, rgba(233, 44, 44, 0.1) -29.89%, rgba(233, 44, 44, 0) 60.26%)

.body--dark
  .border-wrapper.success
    background: linear-gradient(90deg, rgba(0, 186, 97, 0.2) 0%, rgba(0, 186, 97, 0) 100.06%)

    h3
      background: linear-gradient(104.44deg, #00BA61 -29.9%, rgba(0, 128, 36, 0.1) -29.89%, rgba(0, 186, 97, 0) 60.26%)

  .border-wrapper.error
    background: linear-gradient(90deg, rgba(233, 44, 44, 0.2) 0%, rgba(233, 44, 44, 0) 100.06%)

    h3
      background: linear-gradient(104.44deg, rgba(233, 44, 44, 0.1) -29.89%, rgba(233, 44, 44, 0) 60.26%)
</style>
