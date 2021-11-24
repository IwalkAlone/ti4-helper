<script setup lang="ts">
import { Faction } from "@/assets/factions";

const props = defineProps<{
  faction: Faction;
}>();

function factionBackground(nameplateBackground: string) {
  const backgroundColor = "rgba(49,49,80,1)";
  return {
    backgroundImage: `linear-gradient(to left, transparent 0%, rgba(49,49,80,0) 40px, ${backgroundColor} 90px, ${backgroundColor} 100%), url(${nameplateBackground})`,
  };
}
</script>

<template>
  <div
    class="
      pl-2
      rounded
      bg-right bg-contain bg-no-repeat
      text-light-100
      uppercase
      font-ti4
      border-1 border-dark-100
      whitespace-nowrap
    "
    :style="factionBackground(faction.nameplateBackground)"
  >
    {{ faction.name }}
  </div>
</template>
