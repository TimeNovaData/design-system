<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-hide="slide-right"
    transition-show="slide-left"
    v-model="dialogState"
    class="modal-side"
  >
    <q-card
      class="q-dialog-plugin remove-styles content flex flex-col w-full flex-nowrap"
    >
      <header
        class="h-80 bg-primary-pure flex items-center px-24 w-full shrink-0"
      >
        <TextIcon
          v-bind="{ icon, text }"
          icon-class="text-neutral-100"
          class="text-neutral-100 dark:text-neutral-100"
        ></TextIcon>
        <q-space></q-space>
        <OButton
          tertiary
          class="!p-0 place-items-center grid dark:text-neutral-100"
          icon-size="48px"
          @click="dialogState = false"
        >
          <q-icon name="svguse:/icons.svg#icon_close"></q-icon
        ></OButton>
      </header>
      <section class="flex-1">
        <q-scroll-area class="fit scroll-area">
          <slot></slot>
        </q-scroll-area>
      </section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import TextIcon from 'src/components/Text/TextIcon.vue'
import OButton from 'src/components/Button/OButton.vue'

const props = defineProps({
  open: Boolean,
  text: String,
  icon: String,
})
const dialogState = ref(props.open)

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide } = useDialogPluginComponent()

watch(
  () => props.open,
  (v) => {
    dialogState.value = props.open
    if (props.open) dialogRef.show()
  }
)

defineExpose({ dialogRef, dialogState })
</script>

<style lang="sass">

.modal-side
  // .q-dialog__backdrop
  //   opacity: 0 !important
  .q-dialog__inner
    justify-content: flex-end
    padding: 0 !important
  .content
    height: 100vh !important
    // margin-top: var(--top-size
    max-height: initial !important
    width: 560px
    border-radius: 6px 0 0 6px
    overflow: hidden
    display: flex
    flex-direction: column
  .scroll-area
    .q-scrollarea__content
      display: flex
      flex-direction: column
</style>
