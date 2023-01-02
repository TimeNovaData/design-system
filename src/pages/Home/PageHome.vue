<template>
  <div class="max-w-[960px] mx-auto pt-42">
    <div class="grid grid-cols-3 gap-24 w-full">
      <q-item
        v-for="item in menuList.filter((_, n) => n !== 0)"
        :key="item.href"
        :to="item.href"
        class="hover:text-primary-pure rounded-generic justify-center inline-flex flex-col p-12 border border-neutral-100/10 dark:border-white/5 h-[72px] cursor-pointer"
      >
        <div class="flex items-center gap-8 opacity-80">
          <q-icon :name="item.icon"> </q-icon>
          <p class="block text-headline-2">{{ item.title }}</p>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script setup>
import menuList from 'src/utils/menuList'
</script>

<style lang="sass" scoped></style>
