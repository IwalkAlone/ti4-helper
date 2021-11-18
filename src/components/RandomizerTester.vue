<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { Faction, factions } from "@/assets/factions";
import { shuffle, range } from "lodash";

let players: Ref<number[][]> = ref([]);

const NUM_PLAYERS = 6;
const FACTIONS_PER_PLAYER = 3;
const NUM_FACTIONS = 24;
const NUM_REPETITIONS = (1000 * NUM_FACTIONS) / FACTIONS_PER_PLAYER;
const generated = ref(false);

function generate() {
  generated.value = false;
  players.value = [];

  for (let i = 0; i < NUM_PLAYERS; i++) {
    players.value.push(Array(NUM_FACTIONS).fill(0));
  }

  for (let i = 0; i < NUM_REPETITIONS; i++) {
    const results = distribute_with_ban();

    if (!results) {
      console.count("Generation failed");
      continue;
    }

    console.count("Generation succeeded");

    for (let j = 0; j < results.length; j++) {
      for (let k = 0; k < results[j].length; k++) {
        players.value[j][results[j][k]]++;
      }
    }
  }

  console.log(players.value);

  generated.value = true;
}

function distribute_naive() {
  let factions = Array(NUM_FACTIONS);
  let results = Array(NUM_PLAYERS);

  for (let i = 0; i < NUM_FACTIONS; i++) {
    factions[i] = i;
  }

  factions = shuffle(factions);

  for (let i = 0; i < NUM_PLAYERS; i++) {
    results[i] = factions.splice(0, FACTIONS_PER_PLAYER);
  }

  return results;
}

const MAX_ATTEMPTS = 10;
const BANS = [
  range(0, 5),
  range(5, 10),
  range(10, 15),
  range(15, 20),
  range(0, 5),
  range(5, 10),
  range(0, 4),
  range(0, 4),
];

//onst BANS = [range(0, 5), [], [], [], [], [], [], []];

function distribute_with_ban(attempt = 0): number[][] | undefined {
  if (attempt >= MAX_ATTEMPTS) {
    return undefined;
  }

  let factions: number[] = Array(NUM_FACTIONS);
  let results = Array(NUM_PLAYERS);

  for (let i = 0; i < NUM_FACTIONS; i++) {
    factions[i] = i;
  }

  factions = shuffle(factions);

  for (let i = 0; i < NUM_PLAYERS; i++) {
    results[i] = [];
    if (factions.length < (NUM_PLAYERS - i) * FACTIONS_PER_PLAYER) {
      //console.count("Not enough factions left");
      return distribute_with_ban(attempt + 1);
    }

    for (let j = 0; j < FACTIONS_PER_PLAYER; j++) {
      const faction = shiftUntilNonBannedFaction(i);

      if (faction === undefined) {
        //console.count("Trying again");
        return distribute_with_ban(attempt + 1); // try again
      }

      results[i].push(faction);
    }
  }

  return results;

  function shiftUntilNonBannedFaction(playerIndex: number): number | undefined {
    let faction = factions.shift();

    if (faction === undefined) {
      return undefined;
    }

    if (BANS[playerIndex].includes(faction)) {
      return shiftUntilNonBannedFaction(playerIndex);
    }

    return faction;
  }
}
</script>

<template>
  <button @click="generate">Generate</button>
  <table v-if="generated">
    <thead>
      <tr>
        <th>Faction ID</th>
        <th v-for="player in NUM_PLAYERS" :key="player">Player {{ player }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="faction in NUM_FACTIONS" :key="faction">
        <td>{{ faction }}</td>
        <td v-for="player in NUM_PLAYERS" :key="player">
          {{ players[player - 1][faction - 1] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
