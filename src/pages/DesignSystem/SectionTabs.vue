<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Tabs</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/input#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="sym_r_arrow_outward"></q-icon>
        </o-button>
      </div>

      <section>
        <q-tabs v-model="tab" class="text-neutral-100 text-paragraph-1">
          <q-tab name="mails">
            <template class="inline-flex flex-row items-center gap-4">
              <q-icon size="1.25rem" name="sym_r_add_circle_outline"></q-icon>
              <p>Mails</p>
            </template>
          </q-tab>
          <q-tab name="alarms" label="Alarms"></q-tab>
          <q-tab name="movies" label="Movies"></q-tab>
        </q-tabs>
      </section>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import oButton from '../../components/OButton.vue';
import SyntaxHighlight from '../../components/DesignSystem/SyntaxHighlight.vue';

const code = '';
const tab = ref('mails');
</script>

<style lang="sass"></style>
