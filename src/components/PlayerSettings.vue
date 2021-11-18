<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayersStore } from "@/store/playersStore";
const MAX_PLAYERS = 8;

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);
</script>

<template>
  <form>
    <ol class="list-decimal ml-5">
      <li v-for="player in players" :key="player.id" class="mb-1">
        <input
          type="text"
          class="bg-light-100"
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
  </form>
</template>
