<script setup lang="ts">
import { ref, onUnmounted, Ref } from "vue";
import db from "./firestore";
import { Faction, factions } from "@/assets/factions";
import FactionSelector from "@/components/FactionSelector.vue";

import {
  doc,
  collection,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const selectedFactions = ref(new Set<Faction>(factions));

const MAX_PLAYERS = 6;
const playersCollectionRef = collection(db, "players");
const playersQuery = query(playersCollectionRef, orderBy("timestamp"));
const players: Ref<{ id: string; name: string }[]> = ref([]);

const unsubscribe = onSnapshot(playersQuery, (querySnapshot) => {
  players.value = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.data().name,
    };
  });
});

onUnmounted(() => unsubscribe());

function addPlayer() {
  addDoc(playersCollectionRef, { name: "", timestamp: serverTimestamp() });
}

function updatePlayer(id: string | undefined, $event: Event) {
  updateDoc(doc(playersCollectionRef, id), {
    name: ($event.target as HTMLInputElement).value,
  });
}

function removePlayer(id: string) {
  deleteDoc(doc(playersCollectionRef, id));
}

function factionSelectedChanged(faction: Faction, selected: boolean) {
  if (selected) {
    selectedFactions.value.add(faction);
  } else {
    selectedFactions.value.delete(faction);
  }
}
</script>

<template>
  <ol>
    <li v-for="player in players" :key="player.id">
      <input
        type="text"
        :value="player.name"
        @input="updatePlayer(player.id, $event)"
      />
      <button type="button" @click="removePlayer(player.id)">Remove</button>
    </li>
  </ol>
  <button v-if="players.length < MAX_PLAYERS" type="button" @click="addPlayer">
    Add Player
  </button>

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

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: "Handel Gothic";
  src: url("@/assets/fonts/Handel\ Gothic\ Cyrillic.ttf");
}
</style>
