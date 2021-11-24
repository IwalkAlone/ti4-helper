<script setup lang="ts">
import IconVote from "~icons/fluent/vote-20-filled";
import IconPresenter from "~icons/fluent/presenter-20-filled";
import IconPerson from "~icons/fluent/person-settings-20-filled";
import IconTable from "~icons/fluent/table-cells-merge-20-regular";
import MainNavLink from "@/components/MainNavLink.vue";
</script>

<template>
  <div class="h-full flex flex-col p-0">
    <div class="h-full pb-15"><router-view /></div>

    <div class="fixed bottom-0 w-full flex items-center h-15 pt-1 bg-space">
      <!-- TODO match icons by partial path so they are active when sub-view is active? -->
      <MainNavLink
        label="Игроки"
        :icon="IconPerson"
        :to="{ name: 'GameSetup' }"
      />
      <!-- TODO missing icon -->
      <MainNavLink
        label="Фракции"
        :icon="IconVote"
        :to="{ name: 'FactionSetup' }"
      />
      <MainNavLink
        label="Рассадка"
        :icon="IconTable"
        :to="{ name: 'Seating' }"
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
