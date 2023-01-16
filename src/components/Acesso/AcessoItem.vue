<template>
  <article v-if="type === 'acess'" :class="acessItemClass">
    <p class="text-headline-2">{{ name }}</p>
    <div class="flex items-center gap-6">
      <q-icon
        class="text-neutral-70 h-24 w-24"
        name="svguse:/icons.svg#icon_user_circle"
      ></q-icon>
      <p class="text-paragraph-2">{{ login }}</p>

      <q-space />
      <OButton
        tertiary
        class="!opacity-70 !p-0 !h-32 !w-32"
        @click="copyAndAlert(login)"
        ><q-icon name="file_copy"></q-icon
      ></OButton>
    </div>

    <div class="flex items-center gap-6">
      <q-icon
        class="text-neutral-70 h-24 w-24"
        name="svguse:/icons.svg#icon_pass"
      ></q-icon>
      <Transition name="fade" mode="out-in">
        <p v-if="visivel" class="text-paragraph-2 min-w-[250px]">{{ senha }}</p>
        <q-skeleton
          v-else
          class="h-24 rounded-full w-[250px] cursor-not-allowed"
          animation-speed="20000"
        />
      </Transition>
      <OButton
        tertiary
        class="!p-0 !h-32 !w-32 opacity-70"
        @click="visivel = !visivel"
        ><q-icon :name="visivel ? 'visibility' : 'visibility_off'"></q-icon
      ></OButton>

      <q-space />
      <OButton
        tertiary
        class="!opacity-70 !p-0 !h-32 !w-32"
        @click="copyAndAlert(senha)"
        ><q-icon name="file_copy"></q-icon
      ></OButton>
    </div>
  </article>

  <article v-else-if="type === 'link'" :class="acessItemClass">
    <p class="text-headline-2">{{ name }}</p>
    <div class="flex items-center gap-6">
      <q-icon
        class="text-neutral-70 h-24 w-24"
        name="svguse:/icons.svg#icon_link"
      ></q-icon>
      <a
        :href="link"
        target="_blank"
        class="text-paragraph-2 hover:text-primary-pure"
        >{{ link }}</a
      >

      <q-space />
      <OButton
        tertiary
        class="!opacity-70 !p-0 !h-32 !w-32"
        @click="copyAndAlert(link)"
        ><q-icon name="file_copy"></q-icon
      ></OButton>
    </div>
  </article>
</template>

<script setup>
import { copyToClipboard } from 'quasar'
import { NotifyError, NotifySucess } from 'src/boot/Notify'
import OButton from 'src/components/Button/OButton.vue'
import { ref } from 'vue'

const acessItemClass =
  'p-8 border border-neutral-100/10 dark:border-white/10 rounded-generic flex flex-col gap-8 dark:hover:bg-white/5 transition bg-white shadow-sm dark:!bg-d-neutral-20'
const visivel = ref(false)

defineProps({
  type: String,
  login: String,
  senha: String,
  name: String,
  link: String,
})

async function copyAndAlert(text) {
  try {
    await copyToClipboard(text)
    NotifySucess('Sucesso ao Copiar')
  } catch (e) {
    console.log(e)
    NotifyError('Erro ao Copiar')
  }
}
</script>

<style lang="scss" scoped></style>
