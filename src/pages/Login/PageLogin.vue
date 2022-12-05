<template>
  <q-layout class="grid place-items-center">
    <q-form @submit="onSubmit">
      <q-card
        class="max-w-[300px] mx-auto my-auto p-24 flex flex-col gap-16 form"
      >
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDarkMode } from 'src/stores/darkMode'
import { storeToRefs } from 'pinia'
const dark = useDarkMode()

const router = useRouter()

const data = ref({
  login: 'edsondelimajunior',
  senha: 'Analiaedson10.',
})

onMounted(() => {
  console.log(dark)
})

async function onSubmit() {
  const authStore = useAuthStore()

  const logged = await authStore.login(data.value.login, data.value.senha)
  if (logged) router.push({ path: '/' })
}
</script>

<style lang="sass"></style>
