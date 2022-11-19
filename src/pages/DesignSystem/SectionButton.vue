<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Buttons</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/button#introduction"
          target="_blank"
          icon-right="svguse:#arrow_rounded_up"
          >QDocs
        </o-button>
      </div>

      <div>
        <p>Primary</p>
        <div class="flex gap-8">
          <o-button size="sm" primary>Button SM</o-button>
          <o-button size="md" primary>Button MD</o-button>
          <o-button size="lg" primary disable>Button LG</o-button>
          <o-button size="lg" primary icon-right="svguse:#icon_menu"
            >With Icon</o-button
          >
        </div>
      </div>

      <div>
        <p>Secondary</p>
        <div class="flex gap-8">
          <o-button size="sm" secondary>Secondary SM</o-button>
          <o-button size="sm" secondary loading>Button SM</o-button>
        </div>
      </div>

      <div>
        <p>Tertiary</p>
        <div class="flex gap-8">
          <o-button size="sm" tertiary>Tertiary SM</o-button>
          <o-button
            size="sm"
            tertiary
            :loading="progress.loading"
            @click="startComputing"
            :percentage="progress.percentage"
            >Click to Loading
          </o-button>
        </div>
      </div>
      <syntax-highlight :code="code"></syntax-highlight>

      <!--  <pre class="mt-32" v-highlightjs="codeBTN"><code class="vue"></code></pre> -->
    </section>
  </q-card>
</template>

<script setup>
import oButton from '../../components/OButton.vue'
import { ref } from 'vue'
import SyntaxHighlight from '../../components/DesignSystem/SyntaxHighlight.vue'

const code = `<script>
import oButton from "../../components/OButton.vue";
//size: sm, md, lg
//variation: [primary] [secondary] [tertiary]
<${'/'}script>

<template>
  <o-button
    size="sm"
    primary
    >Button SM
  </o-button>
</template>

`
const progress = ref({ loading: false, percentage: 0 })

function startComputing (a, b) {
  progress.value.loading = true
  progress.value.percentage = 0

  setInterval(() => {
    progress.value.percentage += Math.floor(Math.random() * 8 + 10)
    if (progress.value.percentage >= 100) {
      progress.value.loading = false
    }
  }, 1200)
}
</script>

<style lang="sass"></style>
