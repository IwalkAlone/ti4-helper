<script setup lang="ts">
import { ref } from "vue";

const MAX_PLAYERS = 6;
const playerNames = ref(["Сергей"]);

function addPlayer() {
  playerNames.value.push("");
}

function removePlayer(index: number) {
  playerNames.value.splice(index, 1);
}
</script>

<template>
  <div>
    <ol>
      <li v-for="(playerName, index) in playerNames" :key="index">
        <input type="text" :value="playerName" />
        <button type="button" @click="removePlayer(index)">Remove</button>
      </li>
    </ol>
    <button
      v-if="playerNames.length < MAX_PLAYERS"
      type="button"
      @click="addPlayer"
    >
      Add Player
    </button>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
