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
      v-if="type === 'tag'"
      v-bind="selectProps"
      v-model="projetoSelected"
      use-input
      ref="select"
      size="md"
      behavior="menu"
      :option-value="optionValue"
      :option-label="optionLabel"
      :options="opt"
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

    <OSelectAvatar
      v-else
      ref="select"
      use-input
      size="md"
      class="w-full"
      :modelValue="projetoSelected"
      :loading="!opt"
      clearable
      @updateValue="handleEmit"
      @clear="handleEmit"
      fotoKey="logo"
      :options="opt"
      :label="selectLabel"
      v-bind="selectProps"
    >
    </OSelectAvatar>
  </q-popup-edit>
</template>

<script setup>
import {
  onUpdated,
  ref,
  watch,
  onMounted,
  useSlots,
  nextTick,
  computed,
} from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OSelectAvatar from 'src/components/Select/OSelectAvatar.vue'
const slots = useSlots()

const props = defineProps({
  value: String,
  text: String,
  options: Array,
  type: String,

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

const opt = ref(props.options)

watch(
  () => props.options,
  (v) => {
    opt.value = v
  },
  { deep: true }
)
watch(
  () => props.selected,
  (v) => {
    projetoSelected.value = v
  },
  { deep: true }
)

const popupUpProjeto = ref(null)

const emit = defineEmits(['updateValue'])
const select = ref(null)

const projetoSelected = ref(props.selected)

function handleEmit(v) {
  emit('updateValue', v)
  props.closeOnSelect && popupUpProjeto.value.hide()
}

async function showPopup() {
  setTimeout(async () => {
    popupUpProjeto.value.show()
    await nextTick()
    select.value.componentRef.componentRef.showPopup()
  }, 100)
}

function selectShow(e) {
  if (props.type === 'tag') {
    select.value.componentRef.showPopup()
    return
  }
  select.value.componentRef.componentRef.showPopup()
}

defineExpose({ showPopup })
</script>
<style lang="sass"></style>
<style lang="sass" scoped></style>
