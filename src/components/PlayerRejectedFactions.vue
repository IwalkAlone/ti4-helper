<script setup lang="ts">
import { useRoomStore, Player } from "@/store/store";
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { useRoute } from "vue-router";
import { Faction, factions } from "@/assets/factions";
import FactionCheckbox from "@/components/FactionCheckbox.vue";
import { ref, Ref } from "vue";

const store = useRoomStore();
const { players } = storeToRefs(store);

const route = useRoute();
const player = computed(() =>
  players.value.find((player) => player.id === route.params.id)
);

const rejectedFactions: Ref<Faction[]> = ref([]);
</script>

<template>
  <div v-if="!player">Player not found</div>
  <div v-else>
    {{ player.name }}

    <div>Bans: 5/5</div>
    <div>Expansion Bans: 1/1</div>
    <div>
      <FactionCheckbox
        v-for="faction in factions"
        :key="faction.name"
        v-model="rejectedFactions"
        :faction="faction"
      />
    </div>
  </div>
</template>
