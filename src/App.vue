<script setup lang="ts"></script>

<template>
  <div class="fixed h-full w-full flex flex-col p-0">
    <div class="h-full p-3 overflow-y-auto">
      <router-view />
    </div>

    <div class="flex items-center h-15">
      <router-link
        :to="{ name: 'GameSetup' }"
        class="
          border-t-1 border-r-1 border-dark-100
          h-full
          w-1/2
          text-center
          px-3
          py-1
          break-words
        "
      >
        &lt;&lt; PlayersSetupP layersSetup
      </router-link>
      <router-link
        :to="{ name: 'BansSetup' }"
        class="
          border-t-1 border-dark-100
          h-full
          text-center
          w-1/2
          px-3
          py-1
          break-words
        "
        >BansSetup &gt;&gt;</router-link
      >
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

.router-link-active {
  @apply bg-light-900;
}
</style>
