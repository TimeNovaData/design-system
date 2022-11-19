<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Breadcrumbs</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/breadcrumbs#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="sym_r_arrow_outward"></q-icon>
        </o-button>
      </div>

      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>

      <q-breadcrumbs separator=">">
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>

      <!--
      <syntax-highlight :code="code"></syntax-highlight> -->

      <!--  <pre class="mt-32" v-highlightjs="codeBTN"><code class="vue"></code></pre> -->
    </section>
  </q-card>
</template>

<script setup>
import oButton from "../../components/OButton.vue";
// import { ref } from "vue";
// import SyntaxHighlight from "../../components/DesignSystem/SyntaxHighlight.vue";

// const code = `<script>
// import oButton from "../../components/OButton.vue";
// //size: sm, md, lg
// //variation: [primary] [secondary] [tertiary]
// <${"/"}script>

// <template>
//   <o-button
//     size="sm"
//     primary
//     >Button SM
//   </o-button>
// </template>

// `;
// const progress = ref({ loading: false, percentage: 0 });

// function startComputing(a, b) {
//   progress.value.loading = true;
//   progress.value.percentage = 0;

//   setInterval(() => {
//     progress.value.percentage += Math.floor(Math.random() * 8 + 10);
//     if (progress.value.percentage >= 100) {
//       progress.value.loading = false;
//     }
//   }, 1200);
// }
</script>

<style lang="sass"></style>
