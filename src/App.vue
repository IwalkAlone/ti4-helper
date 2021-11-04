<script setup lang="ts">
import { ref, onUnmounted, Ref } from "vue";
import db from "./firestore";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "@firebase/firestore";

const MAX_PLAYERS = 6;
const playersCollectionRef = collection(db, "players");
const players: Ref<{ id: string; name: string }[]> = ref([]);

const unsubscribe = onSnapshot(playersCollectionRef, (collection) => {
  players.value = collection.docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.data().name,
    };
  });
});

onUnmounted(() => unsubscribe());

function addPlayer() {
  addDoc(playersCollectionRef, { name: "" });
}

function updatePlayer(id: string | undefined, $event: Event) {
  updateDoc(doc(playersCollectionRef, id), {
    name: ($event.target as HTMLInputElement).value,
  });
}

function removePlayer(id: string) {
  deleteDoc(doc(playersCollectionRef, id));
}
</script>

<template>
  <div>
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
    <button
      v-if="players.length < MAX_PLAYERS"
      type="button"
      @click="addPlayer"
    >
      Add Player
    </button>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
