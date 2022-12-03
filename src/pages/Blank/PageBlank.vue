<template>
  <div>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} {{ user.lastName }}
      </li>
    </ul>
    <div v-if="users.loading" class="spinner-border spinner-border-sm"></div>
    <div v-if="users.error" class="text-danger">
      Error loading users: {{ users.error }}
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth.store'
import { useUsersStore } from 'src/stores/users.store'

const authStore = useAuthStore()
const { user: authUser } = storeToRefs(authStore)

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
</script>

<style lang="scss" scoped></style>
