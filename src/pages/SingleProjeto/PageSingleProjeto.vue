<template>
  <q-img class="w-full h-[10rem]" :src="bg"></q-img>
  <div class="container">
    <header>
      <div class="flex relative -top-32" style="box-sizing: initial">
        <OAvatar
          :foto="avatar"
          size="160px"
          class-avatar="border-2 border-white"
        ></OAvatar>

        <!-- mt pra compensar o relative -->
        <div class="flex flex-col gap-16 mt-32 pt-24 pl-24">
          <div class="flex flex-col">
            <p class="text-caps-2 text-primary-pure">criteria</p>
            <p
              class="item-editavel text-title-3 flex items-center gap-8 cursor-pointer p-2 rounded-generic border border-transparent hover:border-neutral-30"
            >
              Tercerização Squad Criteria
              <q-icon name="expand_more"></q-icon>
            </p>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import bg from 'src/assets/image/bg-single-projeto.png'
import avatar from 'src/assets/image/gravatar.jpg'
import OAvatar from 'src/components/Avatar/OAvatar.vue'
</script>

<style lang="sass" scoped>
.container
  max-width: 1448px
  margin: 0 auto
  padding: 0 32px

.item-editavel
  display: flex
  align-items: center
  gap:.5rem
  cursor: pointer
  padding: 2px
  border-radius: 3px
  border: 1px solid transparent
  transition: .3s ease
  &:hover
    border-color: rgb(var(--neutral-30))
</style>
