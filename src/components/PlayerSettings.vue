<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/store/store";
const MAX_PLAYERS = 8;

const store = useRoomStore();
const { players } = storeToRefs(store);
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
            @input="store.updatePlayer(player.id, {name: ($event.target as HTMLInputElement).value})"
          />
        </div>
        <div>
          <BaseButton @click="store.removePlayer(player.id)">
            Удалить
          </BaseButton>
        </div>
      </li>
    </ol>
    <BaseButton v-if="players.length < MAX_PLAYERS" @click="store.addPlayer">
      Добавить игрока
    </BaseButton>
  </form>
</template>
