<template>
  <div class="o-chat-message mt-16">
    <q-chat-message
      :avatar="data.usuario.foto"
      :text="[data.comentario]"
      :sent="sender"
    ></q-chat-message>

    <div
      class="flex items-center gap-6 text-paragraph-3 mt-4"
      :class="{
        'justify-end mr-[2.75rem]': sender,
        'ml-[2.75rem]': !sender,
      }"
    >
      <span class="capitalize">{{ data.usuario.nome || 'Sem nome' }}</span>
      <span class="text-neutral-100/40 dark:text-white/10">•</span>
      <span class="text-neutral-60 dark:text-white/40">{{
        data.data_amigavel
      }}</span>
      <TagBase
        type="projeto"
        v-if="data.tipo_etapa"
        :nome="data.tipo_etapa.tipo_etapa"
        :cor="data.tipo_etapa.cor"
      />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import TagBase from 'src/components/Tag/TagBase.vue'

const props = defineProps({
  data: Object,
})

// Pegando os valores do usuário logado pelo provider
const user = inject('user')

// Verificando se usuário enviou ou recebeu a mensagem
const sender = props.data.usuario_criacao === user.value.id
</script>

<style lang="sass"></style>
