<template>
  <q-menu class="overflow-x-hidden w-[250px]" padding>
    <p class="px-16 pt-10 text-paragraph-2 text-start opacity-70 pb-8">
      Seja Bem Vindo(a) <span class="capitalize">{{ user.first_name }}</span>
    </p>

    <q-separator />
    <q-list class="select-none min-w-[200px]">
      <q-item tag="label" class="flex items-center flex-row">
        <q-item-section>
          <p class="text-paragraph-2">Modo escuro</p>
        </q-item-section>

        <q-item-section>
          <q-space />
          <q-toggle size="sm" class="ml-auto" v-model="darkMode"></q-toggle>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-item
        tag="label"
        class="flex items-center flex-row hover:text-alert-error"
        ripple
        @click="logout"
      >
        <q-item-section>
          <p class="text-paragraph-2">Sair</p>
        </q-item-section>
        <q-item-section avatar class="">
          <q-icon name="logout"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth.store'
import { useRouter } from 'vue-router'
import { inject, nextTick } from 'vue'

const user = inject('user')

const auth = useAuthStore()

const darkMode = inject('darkMode')

const router = useRouter()
async function logout() {
  auth.logout()
  await nextTick()
  setTimeout(() => window.location.reload(), 100)
}
</script>

<style lang="sass" scoped></style>
