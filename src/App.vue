<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, ref, provide } from 'vue'
// import emitter from 'src/boot/emitter'

import 'src/css/cores.sass'
import 'src/css/quasar/@index.sass'
import 'src/css/body.sass'
import 'src/css/pages/DesignSystem.sass'
import 'src/css/tailwind.css'
import 'src/css/stores/blurMode.sass'
import 'src/css/vendor/materialSymbolsRounded.sass'

export default defineComponent({
  name: 'App',
  // setup() {
  // onMounted(() => emitter.on('loader', (type) => null))
  // return { loader }
  // },
})

// data() {
//   return {
//     loader: null,
//   }
// },
// created() {
//   const loader = this.loader
//   emitter.on('loader', (type) => {
//     loader[type]()
//     console.log('chegou')
//   })
// },
</script>

<style>
/* *::selection {
  background: rgba(var(--primary-pure), 0.1);
} */
</style>
