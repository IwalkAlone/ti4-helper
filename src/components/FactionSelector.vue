<script setup lang="ts">
import { Faction } from "@/assets/factions";

defineProps<{ faction: Faction; selected: boolean }>();
const emit = defineEmits<{ (e: "input", value: boolean): void }>();

function factionBackground(faction: { nameplateBackground: string }) {
  const backgroundColor = "rgba(49,49,80,1)";
  return {
    backgroundImage: `linear-gradient(to left, transparent 0%, rgba(49,49,80,0) 40px, ${backgroundColor} 90px, ${backgroundColor} 100%), url(${faction.nameplateBackground})`,
  };
}

function onInput($event: Event) {
  emit("input", ($event.target as HTMLInputElement).checked);
}
</script>

<template>
  <div class="flex min-w-full sm:min-w-90 items-center h-6 mb-1">
    <input
      :id="faction.name"
      type="checkbox"
      :value="faction.name"
      class="hidden"
      :checked="selected"
      @input="onInput"
    />
    <label
      :for="faction.name"
      class="
        pl-2
        cursor-pointer
        rounded
        w-full
        bg-right bg-contain bg-no-repeat
        text-light-100
        uppercase
        font-ti4
        border-1 border-dark-100
      "
      :class="{ 'opacity-60': !selected }"
      :style="factionBackground(faction)"
    >
      {{ faction.name }}
    </label>
  </div>
</template>

<style></style>
