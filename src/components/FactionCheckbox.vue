<script setup lang="ts">
import { Faction } from "@/assets/factions";
import { computed } from "vue";

const props = defineProps<{
  faction: Faction;
  modelValue: number[];
  preventChecking: boolean;
}>();
const emit = defineEmits<{ (e: "update:modelValue", value: number[]): void }>();

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const disabled = computed(
  () => props.preventChecking && !props.modelValue.includes(props.faction.id)
);
</script>

<template>
  <div class="flex min-w-full sm:min-w-90 items-center h-6 mb-1">
    <input
      :id="faction.name"
      v-model="checked"
      :disabled="disabled"
      type="checkbox"
      class="hidden"
      :value="faction.id"
    />
    <label :for="faction.name" class="cursor-pointer w-full">
      <FactionCard :faction="faction" />
    </label>
  </div>
</template>

<style scoped lang="scss">
:checked + label {
  @apply opacity-60;
}
</style>
