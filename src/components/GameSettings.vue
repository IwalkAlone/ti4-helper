<script setup lang="ts">
import { useRoomStore } from "@/store/store";
import { storeToRefs } from "pinia";

const store = useRoomStore();
const { enableExpansionContent, guaranteeExpansionRace } = storeToRefs(store);
</script>

<template>
  <form>
    <div>
      <input
        id="enableExpansionContent"
        type="checkbox"
        class="mr-1"
        :checked="enableExpansionContent"
        @input="store.$patch({enableExpansionContent: ($event.target as HTMLInputElement).checked})"
      />
      <label for="enableExpansionContent">
        Дополнение "Пророчество Королей"
      </label>
    </div>
    <div>
      <input
        id="guaranteeExpansionRace"
        type="checkbox"
        class="mr-1"
        :checked="guaranteeExpansionRace"
        @input="store.$patch({guaranteeExpansionRace: ($event.target as HTMLInputElement).checked})"
      />
      <label for="guaranteeExpansionRace">
        Гарантировать 1 расу из дополнения каждому игроку
      </label>
    </div>
  </form>
</template>
