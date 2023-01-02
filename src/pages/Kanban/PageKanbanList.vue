<template>
  <q-card class="m-16 h-full overflow-hidden card-kanban-list">
    <div class="flex gap-8 items-center px-6 pt-6">
      <OButton
        secondary
        size="md"
        v-for="item in colunasWithCards"
        :key="item.coluna.id"
        :class="`${active === item.coluna.id ? 'active' : ''}`"
        @click="active = item.coluna.id"
        class="text-neutral-100/70"
      >
        {{ item.coluna.nome }}
        <q-badge
          class="bg-neutral-100/10 text-neutral-100 w-20 h-20 shrink-0 dark:bg-white/10 dark:text-white/80 font-semibold"
          :class="`${
            active === item.coluna.id
              ? '!bg-primary-pure/10 !text-primary-pure'
              : ''
          }`"
          rounded
        >
          <p class="block m-auto">{{ item.cards.length }}</p>
        </q-badge>
      </OButton>
    </div>
    <OTable
      :columns="columns1"
      :rows="onlyCards"
      :filter="filter"
      class="mx-6 mt-6 h-auto max-h-full my-sticky-header-table"
      :class="`${!onlyCards.length ? 'opacity-0' : ''}`"
      :pagination="{
        rowsPerPage: 100,
      }"
    >
      <template v-slot:body="props">
        <q-tr
          class="cursor-pointer"
          :props="props"
          @click="() => $emit('openModal', props.row)"
        >
          <q-td key="titulo" :auto-width="false">
            {{ props.row.titulo }}
          </q-td>

          <q-td key="tag" :auto-width="true">
            <div class="flex gap-4 flex-nowrap">
              <div v-for="tag in props.row.tag" :key="tag.id">
                <TagBase :tag="tag" :nome="tag.nome" :cor="tag.cor_letra" />
              </div>
            </div>
          </q-td>

          <q-td key="projeto" :auto-width="true">
            <div class="flex gap-4 flex-nowrap">
              <TagBase
                :tag="props.row.projeto"
                :nome="props.row.projeto.nome"
                type="projeto"
                :cor="props.row.projeto.cor"
              />

              <TagBase
                v-if="
                  props.row.projeto.tem_subprojetos && props.row.sub_projeto
                "
                :tag="props.row.sub_projeto"
                :nome="props.row.sub_projeto.nome"
                type="projeto"
                :cor="props.row.sub_projeto.cor"
              />
            </div>
          </q-td>

          <q-td key="quantidade_tasks" :auto-width="true">
            <div
              class="flex gap-4 text-paragraph-2"
              v-if="props.row.quantidade_tasks"
            >
              <span class="text-primary-pure">{{
                props.row.quantidade_tasks_concluidas
              }}</span>
              de
              {{ props.row.quantidade_tasks }}
            </div>
            <div v-else>-</div>
          </q-td>

          <q-td key="responsaveis" :auto-width="true">
            <div class="h-32 w-[100px] relative">
              <div
                v-for="(item, index) in props.row.responsaveis"
                :key="item.id"
              >
                <AvatarSingle
                  :index="index"
                  :item="item"
                  :nome="item.nome"
                ></AvatarSingle>
              </div>
            </div>
          </q-td>

          <q-td key="solicitado" :auto-width="true">
            <p class="text-end">{{ FData(props.row.data_criacao) }}</p>
          </q-td>

          <q-td key="desejado" :auto-width="true">
            <p class="text-end">{{ FData(props.row.data_desejada) }}</p>
          </q-td>

          <q-td key="previsto" :auto-width="true">
            <p class="text-end">{{ FData(props.row.data_prevista) }}</p>
          </q-td>

          <q-td key="orçado" :auto-width="true">
            <p class="text-end">{{ FData(props.row.tempo_estimado) }}</p>
          </q-td>

          <q-td key="decorrido" :auto-width="true">
            <p class="text-end">{{ FData(props.row.tempo_decorrido) }}</p>
          </q-td>

          <!-- <q-td :auto-width="false" key="user_criacao">
            <div class="inline-flex items-center">
              <AvatarSingle
                class="!w-32 !h-32 overflow-hidden mr-2 ajuste-img"
                :estatic="true"
                :item="props.row.user_criacao"
              ></AvatarSingle>
              <p class="">{{ props.row.user_criacao?.nome }}</p>
            </div>
          </q-td>

          <q-td :auto-width="false" key="projeto">
            <div class="projeto-td">
              <q-badge
                rounded
                class="shrink-0 w-8 h-8"
                :style="{ background: props.row.projeto.cor }"
              ></q-badge>
              {{ props.row.projeto.nome }}
            </div>
          </q-td>

          <q-td :auto-width="false" key="tempo_estimado">
            <p class="whitespace-nowrap text-paragraph-2">
              {{ GLOBAL.FTime(props.row.tempo_estimado) }}
            </p>
            <p
              class="whitespace-nowrap text-paragraph-3 text-neutral-70 dark:text-white/70"
            >
            
              00h 00m
            </p>
          </q-td>

          <q-td :auto-width="true" key="tag">
            <div
              class="whitespace-nowrap text-paragraph-2 flex flex-nowrap gap-4"
            >
              <OBadge
                v-for="tag in props.row.tag.filter((i) => i.nome)"
                size="sm"
                :badge="true"
                :key="tag?.id"
                :color="returnRGB(tag?.cor_letra)"
                :small="true"
                class="rounded-generic h-32 dark:!text-white/90"
              >
                <template #content>
                  <p class="text-center mx-auto" square>
                    {{ tag?.nome }}
                  </p>
                </template>
              </OBadge>
            </div>
          </q-td> -->
        </q-tr>
      </template>
    </OTable>
    <div
      v-show="!onlyCards.length"
      class="flex flex-col items-center ml-8 -mt-16 gap-8 opacity-40 justify-center"
    >
      <q-icon class="block opacity-30" name="atr" size="2.5rem"></q-icon>
      <p class="text-paragraph-2">Coluna vazia</p>
    </div>
  </q-card>
</template>

<script setup>
import AvatarSingle from 'src/components/Avatar/AvatarSingle.vue'
import OButton from 'src/components/Button/OButton.vue'
import OTable from 'src/components/Table/OTable.vue'
import TagBase from 'src/components/Tag/TagBase.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { inject, ref, computed, watch } from 'vue'
import { columns1 } from './columns.js'

const { FData } = GLOBAL
const active = ref(1)
const filter = ref('')
const chamados = inject('chamados')
const colunasWithCards = inject('colunasWithCards')

const emit = defineEmits(['openModal'])

const onlyCards = computed(() =>
  colunasWithCards.value.reduce((acc, i) => {
    const cards = i.cards.filter((i) => i.fase.id === active.value)
    acc = [...acc, ...cards]
    return acc
  }, [])
)

// watch(active, () => {
//   emit('colFilter', { coluna: active.value })
// })
</script>

<style lang="sass" scoped>
.my-sticky-header-table
  :deep(.q-table__bottom)
    display: none
</style>
