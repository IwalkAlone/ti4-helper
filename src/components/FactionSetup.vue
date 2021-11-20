<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Player, useRoomStore } from "@/store/store";
import { allFactions } from "@/assets/factions";

const store = useRoomStore();
const { players } = storeToRefs(store);

function rejectedFactionsText(player: Player) {
  if (player.rejectedFactionIds.length === 0) {
    return "Все фракции доступны";
  }

  const factionNames = allFactions
    .filter((f) => player.rejectedFactionIds.includes(f.id))
    .map((f) => f.name);

  return `Исключены: ${factionNames.join(", ")}`;
}
</script>

<template>
  <div class="p-3">
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
        <div class="text-sm">
          {{ rejectedFactionsText(player) }}
        </div>
      </div>
      <div>></div>
    </router-link>
  </div>
</template>
