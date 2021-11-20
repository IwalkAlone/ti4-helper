<script setup lang="ts">
import { Faction } from "@/assets/factions";
import { computed } from "vue";

const props = defineProps<{ faction: Faction; modelValue: Faction[] }>();
const emit =
  defineEmits<{ (e: "update:modelValue", value: Faction[]): void }>();

function factionBackground(faction: { nameplateBackground: string }) {
  const backgroundColor = "rgba(49,49,80,1)";
  return {
    backgroundImage: `linear-gradient(to left, transparent 0%, rgba(49,49,80,0) 40px, ${backgroundColor} 90px, ${backgroundColor} 100%), url(${faction.nameplateBackground})`,
  };
}

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="flex min-w-full sm:min-w-90 items-center h-6 mb-1">
    <input
      :id="faction.name"
      v-model="checked"
      type="checkbox"
      class="hidden"
      :value="faction"
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
      :style="factionBackground(faction)"
    >
      {{ faction.name }}
    </label>
  </div>
</template>

<style>
:checked + label {
  @apply opacity-60;
}
</style>
