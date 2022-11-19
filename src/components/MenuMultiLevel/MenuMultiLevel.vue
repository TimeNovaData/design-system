<template>
  <aside
    class="sidebar-container"
    :class="props.effects"
    :level="menu[0].nivel"
    @mouseenter="() => debounce(50, handleMouseEnter, 'menuOpen')()"
    @mouseleave="() => debounce(50, handleMouseLeave, 'menuOpen')()"
  >
    <header
      class="header-menu-one"
      :level="menu[0].nivel"
      :class="`${
        props.menu[0].nivel == 1
          ? 'border-b-[#cccccc3d] !border-b-[1px] py-6 '
          : ''
      }`"
    >
      <span v-if="props.menu[0].nivel != 1" class="line-horizontal"></span>
      <q-icon
        class="icon-title"
        v-if="props.menu[0].nivel == 2"
        :name="`svguse:/icons.svg#${props.menu[0].icon}`"
        size="24px"
        style="--icon: #06f784"
      ></q-icon>
      <div class="self-center" v-if="props.menu[0]?.nivel == 1">
        <!--   <img :src="logoIMG" class="logo-close" />
        <img :src="logoIMG" class="logo-open" /> -->
      </div>

      <div class="flex justify-center box-title" v-else>
        <span
          class="hidden sm:!block"
          @click="(e) => debounce(100, back, 'menuOpen')(e)"
        >
          Voltar
        </span>
        <h1 class="text-lg font-medium title">{{ title }}</h1>

        <span
          @click="(e) => debounce(100, closeSidemenu, 'menuOpen')(e)"
          class="hidden sm:!block"
        >
          Close
        </span>
      </div>
    </header>
    <ul>
      <MenuList
        v-for="item in props.menu"
        :key="item"
        :item="item"
        :nivel="menu[0].nivel"
      />
    </ul>
  </aside>
</template>

<script setup>
import { onMounted } from "vue";
import MenuList from "./MenuList.vue";

const props = defineProps({
  menu: Array,
  title: String,
  effects: String,
});

const debounce = (time, fn, name) => {
  return (...args) => {
    clearTimeout(window[name]);
    window[name] = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

let $els = {};
onMounted(() => {
  $els = {
    firstMenu: document.querySelector('.sidebar-container[level="1"]'),
  };
});

const clickInside = (e) => {
  const firstMenu = document.querySelector('.sidebar-container[level="1"]');
  let lisLevel1 = [
    ...firstMenu.closest("aside").querySelectorAll("li[level='1']"),
  ];

  if (!firstMenu.contains(e.target)) {
    firstMenu.classList.remove("active");
    firstMenu.classList.remove("open-menu-fixed");

    lisLevel1.map((li) => li.classList.remove("active"));
  } else {
    firstMenu.classList.add("open-menu-fixed");
  }
};

const handleMouseEnter = (e) => {
  // if (!props.menu[0].nivel === 1) return;

  $els.firstMenu.classList.add("active");

  document.addEventListener("click", clickInside);
  console.log("entrou");
};

const handleMouseLeave = () => {
  const lv1itens = $els.firstMenu.querySelectorAll("ul li[level='1'].active");
  const existActive = lv1itens.length;

  if (!existActive && !$els.firstMenu.classList.contains("open-menu-fixed")) {
    document.removeEventListener("click", clickInside);
    $els.firstMenu.classList.remove("active");
  }
};

const handleEnterOverflow = () => {
  const firstMenu = document.querySelector(".sidebar-container");
  if (!firstMenu.classList.contains("open-menu-fixed")) {
    handleMouseLeave();
  }
};

const back = (e) => {
  const nivel = e.target.closest("aside").attributes.level.value;
  const previousLiSelected = document.querySelector(
    `li.active[level="${nivel - 1}"]`
  );
  previousLiSelected.classList.remove("active");
};

const closeSidemenu = () => {
  document
    .querySelector(".sidebar-container")
    .classList.remove("active", "open-menu-fixed");
  document
    .querySelector(".sidebar-container li.active")
    .classList.remove("active");

  handleMouseLeave();
};
</script>

<style lang="sass">
.sidebar-container
  --sidebar-width-nv0: 5rem
  --z-index-sidebar-nv0: 9000
  --z-index-sidebar-nv1: 9001
  --width-sidebar-nv-1: 80px
  --width-sidebar-nv-1-open: 21.25rem

.sidebar-container
  position: fixed
  width: var(--sidebar-width-nv0)
  z-index: var(--z-index-sidebar-nv0)
  height: 100vh
  color: inherit
  left: 0
  top: 0

  >ul > li
    cursor: pointer
    white-space: nowrap
    flex-wrap: nowrap

  //LEVEL 1 --------------------------------------
  &[level="1"]
    background: rgb(var(--d-neutral-10))
    z-index:  var(--z-index-sidebar-nv1)
    width: var(--width-sidebar-nv-1)
    transition: all .3s
    overflow: hidden

    &.active
      width: var(--width-sidebar-nv-1-open)
      overflow: initial

    >ul li
      margin: 0 16px
      border-radius: 6px
      display: flex

      >a
        flex: 1 1 auto
        padding: 8px
        cursor: pointer

      &.active
        background: rgba(var(--white), 0.1)

        .sidebar-container[level="2"]
          width: var(--width-sidebar-nv-1-open)
          transition: .3s all
          pointer-events: auto

      &:has(ul > li)
        cursor: default

      &:hover
        background: rgba(var(--white), 0.1)


  //LEVEL 2 --------------------------------------
  &[level="2"]
    position: absolute
    left: 100%
    top:0
    width: 0px
    opacity: 0
    pointer-events: none


  //LEVEL 3 --------------------------------------
  // &[level="3"]
</style>
