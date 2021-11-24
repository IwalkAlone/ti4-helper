<script setup lang="ts">
import { useRoomStore } from "@/store/store";
import { storeToRefs } from "pinia";
import {
  baseGameFactions,
  prophecyOfKingsFactions,
  allFactions,
  Faction,
} from "@/assets/factions";
import randomiseFactions, { RandomisationResult } from "@/factionRandomiser";
import { ref, Ref } from "vue";

const store = useRoomStore();
const { players, guaranteeExpansionRace } = storeToRefs(store);

const result: Ref<RandomisationResult | undefined> = ref();

function generate() {
  if (guaranteeExpansionRace.value) {
    // generate both separately, use base game player order
    const baseGameResult = randomiseFactions(
      players.value,
      baseGameFactions,
      2
    );
    const prophecyOfKingsResult = randomiseFactions(
      players.value,
      prophecyOfKingsFactions,
      1
    );

    if (baseGameResult === "timeout" || prophecyOfKingsResult === "timeout") {
      result.value = "timeout";
      return;
    }

    baseGameResult.forEach(({ player, factions }) => {
      const expansionFaction = prophecyOfKingsResult.find(
        (item) => item.player.id === player.id
      )?.factions[0] as Faction;

      factions.push(expansionFaction);
    });

    result.value = baseGameResult;
    return;
  }

  result.value = randomiseFactions(players.value, allFactions, 3);
}
</script>

<template>
  <PageHeader title="Рассадка" />
  <div class="p-3">
    <div class="text-center mt-3 my-6">
      <BaseButton @click="generate">Сгенерировать рассадку</BaseButton>
    </div>

    <div v-if="result === 'timeout'">
      Не удалось сгенерировать рассадку с заданными ограничениями. Попробуйте
      уменьшить количество исключенных фракций.
    </div>

    <div v-else-if="result !== undefined">
      <div
        v-for="({ player, factions }, index) in result"
        :key="player.id"
        class="border-1 border-dark-900 border-l-4 rounded mb-2 p-2 relative"
      >
        <div class="mb-2">{{ index + 1 }}. {{ player.name }}</div>
        <div
          v-if="index === 0"
          class="absolute right-3 -top-3 bg-light-100 px-1"
        >
          Председатель
        </div>
        <FactionCard
          v-for="faction in factions"
          :key="faction.id"
          :faction="faction"
          class="mb-1"
        />
      </div>
    </div>
  </div>
</template>
