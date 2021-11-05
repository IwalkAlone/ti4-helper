<script setup lang="ts">
import { ref, onUnmounted, Ref } from "vue";
import db from "./firestore";
import { factions } from "@/assets/factions";

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

function factionBackground(faction: { nameplateBackground: string }) {
  const backgroundColor = "rgba(49,49,80,1)";
  return {
    backgroundImage: `linear-gradient(to left, transparent 0%, rgba(49,49,80,0) 40px, ${backgroundColor} 90px, ${backgroundColor} 100%), url(${faction.nameplateBackground})`,
  };
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
    <div
      v-for="faction in factions"
      :key="faction.name"
      class="flex min-w-full sm:min-w-90 items-center h-6 mb-1 px-2"
    >
      <input
        :id="faction.name"
        type="checkbox"
        :value="faction.name"
        class=""
      />
      <label
        :for="faction.name"
        class="
          pl-6
          inline-block
          rounded
          w-full
          text-light-100
          bg-right bg-contain bg-no-repeat
          uppercase
          font-ti4
          border-1 border-dark-100
        "
        :style="factionBackground(faction)"
        >{{ faction.name }}
      </label>
    </div>
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
