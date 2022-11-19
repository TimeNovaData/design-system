<template>
  <q-card class="p-16 w-full">
    <h1 class="text-title-2">Design System</h1>
    <p>Sugestão Extensões...</p>
    <p>Settings.json</p>
    <pre><code>
      "tailwindCSS.emmetCompletions": true,
      "tailwindCSS.includeLanguages": {
        "vue": "html",
        "vue-html": "html",
      },
    </code></pre>
    <p>Baseado no quasar...</p>
    <p>Estrutura css ...</p>

    <p>Icones</p>
    <p>
      usamos a lib material symbols é só usar no q-icon o nome do icone iniciado
      por "sym_r_" ex: "sym_r_arrow_outward"
    </p>
    <a
      class=""
      href="https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded"
      target="_blank"
      >Material Symbols</a
    >
    <a href="https://discord.gg/cXrcex9q">Discord Comunidade Quasar</a>

    <p></p>

    <q-tree
      dense
      control-color="var(--d-neutral-30)"
      :nodes="simple"
      node-key="label"
      v-model:expanded="expanded"
      class="select-none mt-16"
    >
      <template v-slot:default-header="prop">
        <div class="flex items-center text-12">
          <div class="font-bold text-neutral-100 dark:text-white/90">
            {{ prop.node.label }}
          </div>
          <p class="ml-16 text-neutral-60">{{ prop.node.explanation }}</p>
        </div>
      </template>
    </q-tree>
  </q-card>

  <!--
    prioridades para depois
    1*



    2*
      trocar toggle (fiel ao ds do andrei no figma)
      colocar um badge no select multiplo,  do tipo (item), (item), (+5)



    3*
     tirar elevaçao do select ao selecionar
     trocar todos os icones default do pacote

   -->
</template>

<script setup>
import { ref } from "vue";

const expanded = ref(["Estrutura do projeto"]);
const simple = [
  {
    label: "Estrutura do projeto",
    children: [
      {
        label: "dist/",
        explanation: "# Destino",

        children: [{ label: "assets" }],
      },
      {
        label: "src/",
        explanation: "# Fonte",
        children: [{ label: "assets" }, { label: "boot" }],
      },
      { label: ".editorconfig" },
      { label: ".eslintrc.js" },
      { label: "package.json" },
      { label: "postcss.config.js" },
      { label: "tailwind.config.cjs" },

      {
        label: "quasar.config.js",
        explanation: "# Arquivo de configuração do quasar CLI",
      },
    ],
  },
];
</script>

<style lang="scss" scoped></style>
