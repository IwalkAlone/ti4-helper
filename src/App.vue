<script setup lang="ts">
import IconVote from "~icons/fluent/vote-20-filled";
import IconPresenter from "~icons/fluent/presenter-20-filled";
import IconPerson from "~icons/fluent/person-settings-20-filled";
import IconTable from "~icons/fluent/table-cells-merge-20-regular";
import MainNavLink from "@/components/MainNavLink.vue";
</script>

<template>
  <div class="fixed h-full w-full flex flex-col p-0">
    <div
      id="page-header"
      class="border-b-1 border-dark-100 text-center shadow-md shadow-dark-900"
    >
      Заголовок
    </div>

    <div class="h-full overflow-y-auto"><router-view /></div>

    <div class="flex items-center pt-2 pb-1 bg-space">
      <MainNavLink
        label="Игроки"
        :icon="IconPerson"
        :to="{ name: 'GameSetup' }"
      />
      <MainNavLink
        label="Фракции"
        :icon="IconVote"
        :to="{ name: 'FactionSetup' }"
      />
      <MainNavLink
        label="Рассадка"
        :icon="IconTable"
        :to="{ name: 'RandomizerTester' }"
      />
      <MainNavLink
        label="Политика"
        :icon="IconPresenter"
        :to="{ name: 'GameSetup' }"
      />
      <MainNavLink
        label="Голоса"
        :icon="IconVote"
        :to="{ name: 'GameSetup' }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: "Handel Gothic";
  src: url("@/assets/fonts/Handel\ Gothic\ Cyrillic.ttf");
}
</style>
