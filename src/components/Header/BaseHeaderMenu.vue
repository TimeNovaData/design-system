<template>
  <q-menu class="overflow-x-hidden">
    <q-list padding class="select-none min-w-[200px]">
      <q-item dense class="items-center">
        <p class="text-headline-3">Settings</p>
      </q-item>

      <q-item tag="label" class="flex items-center flex-row">
        <q-item-section>
          <p class="text-paragraph-2">Dark Mode</p>
        </q-item-section>

        <q-item-section>
          <q-space></q-space>
          <q-toggle size="sm" class="ml-auto" v-model="darkMode"></q-toggle>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>
      <q-item
        v-if="dev"
        class="flex items-center flex-row"
        tag="label"
        ripple
        to="/design-system"
        :active="false"
      >
        <q-item-section>
          <p class="text-paragraph-2">Design System</p>
        </q-item-section>
        <q-item-section avatar class="">
          <q-icon name="design_services"></q-icon>
        </q-item-section>
      </q-item>
      <q-item
        tag="label"
        class="flex items-center flex-row"
        ripple
        @click="logout"
      >
        <q-item-section>
          <p class="text-paragraph-2">Logout</p>
        </q-item-section>
        <q-item-section avatar class="">
          <q-icon name="logout"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDarkMode } from 'src/stores/darkMode'
import { useAuthStore } from 'src/stores/auth.store'
import OInput from 'src/components/Input/OInput.vue'
import { useRouter } from 'vue-router'
const dev = process.env.development
const auth = useAuthStore()
const dark = useDarkMode()

const { darkMode } = storeToRefs(dark)
const router = useRouter()
async function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style lang="sass" scoped></style>
