<template>
  <q-scroll-area>
    <div class="max-w-[900px] mx-auto pt-42 px-42 flex flex-col">
      <div class="w-full flex justify-between text-neutral-80">
        <p class="text-title-3">icons.svg</p>
        <OButton
          target="_blank"
          href="https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded&icon.platform=android"
          class="text-end !ml-auto mb-8 text-paragraph-3"
          icon-size="0.875rem"
          icon-right="arrow_forward_ios"
          >Material Symbols Rounded</OButton
        >
      </div>
      <OInput
        class="no-label"
        size="md"
        v-model="search"
        placeholder="Search"
        @update:model-value="handleUpdate"
      ></OInput>
    </div>
    <div class="grid grid-cols-6 max-w-[900px] mx-auto p-42 pt-8 gap-16">
      <q-item
        clickable=""
        v-for="i in symbols"
        :key="i"
        class="flex flex-col border gap-4 p-8 border-neutral-100/10 rounded-md cursor-pointer p-0 justify-center text-center"
        v-ripple
        @click="
          $NotifySucess(`'svguse:/icons.svg#${i}'`) &&
            copyToClipboard(`svguse:/icons.svg#${i}`)
        "
      >
        <q-icon
          class="mx-auto text-neutral-80"
          size="48px"
          :name="'svguse:/icons.svg#' + i"
        ></q-icon>
        <p
          class="text-headline-4 text-center inline-flex justify-center text-neutral-80"
        >
          {{ i }}
        </p>
      </q-item>
    </div>
    <div id="icons_wrapper" v-html="icons"></div>
  </q-scroll-area>
</template>

<script setup>
import OInput from 'src/components/Input/OInput.vue'
import { ref, onMounted, nextTick, toRaw } from 'vue'
import { copyToClipboard } from 'quasar'
import OButton from 'src/components/Button/OButton.vue'

const icons = ref('')
const symbols = ref('')
const backup = ref('')

const search = ref('')

function handleUpdate() {
  console.log(search.value)
  symbols.value = backup.value.filter((i) => i.includes(search.value))
}

onMounted(async () => {
  const svg = await  fetch('icons.svg')
  const text = await svg.text()
  icons.value = text
  await nextTick()
  const s = document.querySelectorAll('#icons_wrapper svg > symbol')
  symbols.value = [...s].map(i => i.getAttribute("id"))
  backup.value = [...s].map(i => i.getAttribute("id"))

})

/* prettier-ignore */
</script>

<style lang="scss" scoped></style>
