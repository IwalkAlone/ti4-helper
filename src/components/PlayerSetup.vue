<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayersStore } from "@/store/playersStore";
const MAX_PLAYERS = 8;

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);
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
</template>
