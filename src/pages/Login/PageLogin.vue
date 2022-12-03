<template>
  <q-layout class="grid place-items-center">
    <q-form @submit="onSubmit">
      <q-card class="max-w-[300px] mx-auto my-auto p-24 flex flex-col gap-16">
        <OInput
          v-model="data.login"
          :rules="[(val) => !!val || 'Campo Obrigatorio']"
          size="md"
          label="Login"
        ></OInput>
        <OInput
          v-model="data.senha"
          :rules="[(val) => !!val || 'Campo Obrigatorio']"
          size="md"
          label="Senha"
          type="password"
        ></OInput>
        <OButton size="md" type="submit" primary class="w-full">Login</OButton>
      </q-card>
    </q-form>
  </q-layout>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { useAuthStore } from 'src/stores/auth.store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = ref({
  login: 'edsondelimajunior',
  senha: 'Analiaedson10.',
})

async function onSubmit() {
  const authStore = useAuthStore()

  const logged = await authStore.login(data.value.login, data.value.senha)
  if (logged) router.push({ path: '/' })
}
</script>

<style lang="scss" scoped></style>
