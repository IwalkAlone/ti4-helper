<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/store/store";

const store = useRoomStore();
const { players } = storeToRefs(store);
</script>

<template>
  <router-link
    v-for="(player, index) in players"
    :key="player.id"
    :to="{ name: 'PlayerRejectedFactions', params: { id: player.id } }"
    class="
      flex
      items-center
      justify-between
      border-1 border-dark-900 border-l-4
      rounded
      mb-2
      p-2
    "
  >
    <div>
      <div>{{ index + 1 }}. {{ player.name }}</div>
      <div class="text-sm">Все фракции доступны</div>
    </div>
    <div>></div>
  </router-link>
</template>
