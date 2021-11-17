<script setup lang="ts">
import { ref } from "vue";
import { Faction, factions } from "@/assets/factions";
import FactionSelector from "@/components/FactionSelector.vue";

const selectedFactions = ref(new Set<Faction>(factions));

function factionSelectedChanged(faction: Faction, selected: boolean) {
  if (selected) {
    selectedFactions.value.add(faction);
  } else {
    selectedFactions.value.delete(faction);
  }
}
</script>

<template>
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
