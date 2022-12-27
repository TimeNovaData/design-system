<template>
  <q-popup-edit
    anchor="top left"
    class="w-[26.875rem] p-8"
    :model-value="projetoSelected"
    ref="popupUpProjeto"
    @show="selectShow"
  >
    <p class="mb-16 text-title-5">{{ text }}</p>

    <OSelect
      v-bind="selectProps"
      v-model="projetoSelected"
      use-input
      ref="select"
      size="md"
      behavior="menu"
      :option-value="optionValue"
      :option-label="optionLabel"
      :options="options"
      :label="selectLabel"
      :auto-save="true"
      @update:model-value="handleEmit"
    >
      <template v-for="slot in Object.keys(slots)" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps"></slot>
      </template>

      <template #option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label class="flex items-center gap-8">
              <q-badge
                rounded
                class="shrink-0 w-8 h-8"
                :style="{ background: opt.cor_letra }"
              ></q-badge>
              <p class="!text-neutral-70 dark:!text-white/90">{{ opt.nome }}</p>
            </q-item-label>
          </q-item-section>
          <q-item-section side class="!w-56">
            <q-toggle
              size="sm"
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
          </q-item-section>
        </q-item>
      </template>
    </OSelect>
  </q-popup-edit>
</template>

<script setup>
import { onUpdated, ref, watch, onMounted, useSlots } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
const slots = useSlots()

const props = defineProps({
  value: String,
  text: String,
  options: Array,
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  optionValue: {
    type: String,
    default: 'id',
  },

  optionLabel: {
    type: String,
    default: 'nome',
  },
  selectLabel: String,
  selected: Object,
  selectProps: Object,
})

// watch(
//   () => props.options,
//   () => {
//     console.log(props.options, 'props.options')
//     console.log(typeof props.options)
//   },
//   { deep: true }
// )

const popupUpProjeto = ref(null)

const emit = defineEmits(['updateValue'])
const select = ref(null)
const projetoSelected = ref(props.selected)

function handleEmit() {
  emit('updateValue', projetoSelected)
  props.closeOnSelect && popupUpProjeto.value.hide()
}

function selectShow(e) {
  select.value.componentRef.showPopup()
}
</script>
<style lang="sass"></style>
<style lang="sass" scoped></style>
