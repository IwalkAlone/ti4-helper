<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayersStore } from "@/store/playersStore";
const MAX_PLAYERS = 8;

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);
</script>

<template>
  <form>
    <ol class="mb-2">
      <li
        v-for="(player, index) in players"
        :key="player.id"
        class="mb-1 flex items-center justify-between"
      >
        <div>
          <span class="mr-1">{{ index + 1 }}.</span>
          <input
            type="text"
            class="bg-light-100"
            :value="player.name"
            placeholder="Имя игрока"
            @input="playersStore.updatePlayer(player.id, $event)"
          />
        </div>
        <div>
          <button
            type="button"
            class="
              border-light-900 border-1
              px-4
              py-1
              rounded
              shadow-dark-900 shadow-md
            "
            @click="playersStore.removePlayer(player.id)"
          >
            Удалить
          </button>
        </div>
      </li>
    </ol>
    <button
      v-if="players.length < MAX_PLAYERS"
      class="
        border-light-900 border-1
        px-4
        py-2
        rounded
        shadow-dark-900 shadow-md
      "
      type="button"
      @click="playersStore.addPlayer"
    >
      Добавить игрока
    </button>
  </form>
</template>
