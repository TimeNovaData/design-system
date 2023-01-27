<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-hide="fade"
    transition-show="fade"
    duration="150"
    v-model="dialogState"
    class="modal-center"
  >
    <q-card
      class="q-dialog-plugin remove-styles content flex flex-col w-full flex-nowrap"
    >
      <header
        class="h-80 bg-primary-pure flex items-center pl-24 pr-8 w-full shrink-0"
      >
        <TextIcon
          v-if="icon"
          v-bind="{ icon, text }"
          icon-class="text-neutral-100"
          class="text-neutral-100 dark:text-neutral-100"
        ></TextIcon>

        <div v-else class="mr-24">
          <span class="text-caps-3 text-neutral-100/50">{{ text }}</span>
          <h4 class="text-title-4 text-neutral-100">{{ title }}</h4>
        </div>

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
      <section class="flex-1 overflow-y-auto">
        <slot></slot>
        <!-- <q-scroll-area class="fit scroll-area w-full">
        </q-scroll-area> -->
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
  title: String,
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

.modal-center
  // .q-dialog__backdrop
  //   opacity: 0 !important
  .q-dialog__inner
    justify-content: center
    padding: 0 !important
  .content
    // height: 100%
    // min-height: 460px !important
    // max-height: 510px !important
    max-height: 580px !important
    min-width: 460px
    width: max-content
    border-radius: 6px
    overflow: hidden
    display: flex
    flex-direction: column
  .scroll-area
    .q-scrollarea__content
      display: flex
      flex-direction: column



// .modal-center
//   // .q-dialog__backdrop
//   //   opacity: 0 !important
//   .q-dialog__inner
//     justify-content: flex-end
//     padding: 0 !important
//   .content
//     height: 100vh !important
//     // margin-top: var(--top-size
//     max-height: initial !important
//     width: 560px
//     border-radius: 6px 0 0 6px
//     overflow: hidden
//     display: flex
//     flex-direction: column
//   .scroll-area
//     .q-scrollarea__content
//       display: flex
//       flex-direction: column
</style>
