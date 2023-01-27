<template>
  <div class="max-w-[960px] mx-auto pt-42">
    <div class="grid grid-cols-3 gap-24 w-full">
      <q-item
        v-for="item in menuAfterPermission
          .filter((_, n) => n !== 0)
          .filter((n) => n.type !== 'dev')"
        :key="item.href"
        :to="item.href"
        class="dark:bg-d-neutral-30 hover:text-primary-pure rounded-generic justify-center inline-flex flex-col p-16 border border-neutral-100/10 dark:border-white/5 h-[92px] cursor-pointer"
      >
        <div class="flex flex-col gap-4 opacity-80">
          <q-icon :name="item.icon" size="24px"> </q-icon>
          <p class="block text-headline-2">{{ item.title }} - dev</p>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script setup>
import menuList from 'src/utils/menuList'
import { inject, computed } from 'vue'

const user = inject('user')

const menuAfterPermission = computed(() => {
  return menuList.filter((i) => {
    if (!user.value.is_staff && i.permissions === 'staff') return false
    else return i
  })
})
</script>

<style lang="sass" scoped></style>
