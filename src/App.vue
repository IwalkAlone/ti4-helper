<script setup lang="ts">
import { ref } from "vue";
import { Faction, factions } from "@/assets/factions";
import FactionSelector from "@/components/FactionSelector.vue";

import { storeToRefs } from "pinia";
import { usePlayersStore } from "./store/playersStore";

const selectedFactions = ref(new Set<Faction>(factions));

const MAX_PLAYERS = 6;

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);

function factionSelectedChanged(faction: Faction, selected: boolean) {
  if (selected) {
    selectedFactions.value.add(faction);
  } else {
    selectedFactions.value.delete(faction);
  }
}
</script>

<template>
  <ol>
    <li v-for="player in players" :key="player.id">
      <input
        type="text"
        :value="player.name"
        @input="playersStore.updatePlayer(player.id, $event)"
      />
      <button type="button" @click="playersStore.removePlayer(player.id)">
        Remove
      </button>
    </li>
  </ol>
  <button
    v-if="players.length < MAX_PLAYERS"
    type="button"
    @click="playersStore.addPlayer"
  >
    Add Player
  </button>

  <div class="flex flex-wrap">
    <FactionSelector
      v-for="faction in factions"
      :key="faction.name"
      :faction="faction"
      :selected="selectedFactions.has(faction)"
      @input="factionSelectedChanged(faction, $event)"
    />
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
</style>
