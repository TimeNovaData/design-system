<template>
  <aside
    class="OSidebar"
    ref="sidebar"
    level="0"
    @mouseenter="GLOBAL.debounce(100, handleMouseEnter, 'sideTime')()"
    @mouseleave="GLOBAL.debounce(50, handleMouseLeave, 'sideTime')()"
  >
    <header class="">
      <MenuLogo />
    </header>
  </aside>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MenuLogo from "./MenuLogo.vue";
import GLOBAL from "../../utils/GLOBAL";

const props = defineProps({
  menu: Array,
});

const sidebar = ref(null);
let $ = {};

onMounted(() => {
  console.log(sidebar);
  $ = {
    nv0: sidebar.value,
  };
});

function handleMouseEnter() {
  console.log("Enter");
  $.nv0.classList.add("active");
}

function handleMouseLeave() {
  console.log("leave");
  $.nv0.classList.remove("active");
}
</script>

<style lang="sass">
.body--light
  --logo-color: #000
  --sidebar-bg: var(--white)

.body--dark
  --logo-color: white
  --sidebar-bg: var(--black)

.OSidebar
  --sidebar-width-nv0: 5rem
  --sidebar-width-nv0-open: 21.25rem
  --sidebar-width-nv0-transition: .2s cubic-bezier(.4,0,.2,1)
  --z-index-sidebar-nv0: 9000
  --z-index-sidebar-nv1: 9001
  --width-sidebar-nv-1: 80px


.OSidebar
  position: fixed
  height: 100vh
  left: 0
  top: 0
  width: var(--sidebar-width-nv0)
  z-index: var(--z-index-sidebar-nv0)
  background: rgb(var(--sidebar-bg))
  border-right: 1px solid rgba(var(--neutral-100),0.1)
  transition: var(--sidebar-width-nv0-transition)
  transition-property: width

  &.active
    width: var(--sidebar-width-nv0-open)
</style>
