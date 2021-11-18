<script setup lang="ts">
import { usePlayersStore, Player } from "@/store/playersStore";
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { useRoute } from "vue-router";

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);

const route = useRoute();
const player = computed(() =>
  players.value.find((player) => player.id === route.params.id)
);
</script>

<template>
  <p v-if="!player">Player not found</p>
  <p v-else>{{ player.name }}</p>
</template>
