<script setup lang="ts">
import IconVote from "~icons/fluent/vote-20-filled";
import IconPresenter from "~icons/fluent/presenter-20-filled";
import IconPerson from "~icons/fluent/person-settings-20-filled";
import IconTable from "~icons/fluent/table-cells-merge-20-regular";
import MainNavLink from "@/components/MainNavLink.vue";
</script>

<template>
  <div
    class="
      container
      h-full
      p-0
      md:mx-auto md:w-max-120 md:border-l-1 md:border-r-1
      border-dark-900
      bg-light-100
    "
  >
    <div class="h-full overflow-y-auto"><router-view /></div>

    <div class="w-full flex items-center h-full pt-1 bg-space">
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

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: "Handel Gothic";
  src: url("@/assets/fonts/Handel\ Gothic\ Cyrillic.ttf");
}

.container {
  display: grid;
  grid-template-rows: 1fr 4rem;
}
</style>
