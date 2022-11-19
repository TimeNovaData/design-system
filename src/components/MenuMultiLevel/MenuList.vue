<template>
  <li
    ref="ref_li"
    class="flex items-center"
    :class="props.item.class"
    :level="nivel"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <q-icon
      class="icon"
      v-if="nivel == 1"
      :name="`svguse:/icons.svg#${item.icon}`"
      size="24px"
      @click="navigate"
    >
    </q-icon>
    <router-link :to="props.item.href ? props.item.href : ''">
      <a class="name-section" :level="nivel">
        {{ props.item.name }}
      </a>
    </router-link>

    <SidebarIndex
      v-if="props.item.submenu"
      :menu="props.item.submenu"
      :title="props.item.name"
    />
  </li>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import SidebarIndex from "./MenuMultiLevel.vue";

const router = useRouter();

const navigate = () => {
  if (props.item.href) {
    router.push(props.item.href);
  }
};

const props = defineProps({
  item: Object,
  nivel: Number,
});

const ref_li = ref(); //evita ref vazia, se n tiver nada deixa `null`

const handleClick = () => {
  //verificando se o effects está ativado
  const containsEffect = document
    .querySelector("aside")
    .classList.contains("effects-active");
  // if (props.item.href) {
  //   $route.push(props.item.href);
  // }
  const aside = ref_li.value.closest("aside");

  if (aside.attributes.level.value == 1) {
    // Limpando todas as outras possíveis classes ativas
    let lisLevel1 = [...aside.querySelectorAll("li[level='1']")];
    lisLevel1.map((li) => li.classList.remove("active"));

    ref_li.value.classList.add("active");

    if (containsEffect) {
      lisLevel1.map((li) => li.classList.remove("activeEffect"));
      ref_li.value.classList.add("activeEffect");
    }
  }
};

const handleMouseEnter = (e) => {
  const aside = e.target.closest("aside");
  const nivel = aside?.attributes?.level?.value;
  if (nivel == 2) {
    const lis = aside.querySelectorAll('li[level="2"]');
    [...lis].map((li) => li.classList.remove("active"));

    const li = e.target.closest("li");
    li.classList.add("active");
  }
};

const handleMouseLeave = (e) => {
  const aside = e.target.closest("aside");
  const nivel = aside?.attributes?.level?.value;
  if (nivel == 2) {
    const li = e.target.closest("li[level='2']");
    li.classList.remove("active");
  }
};
</script>
