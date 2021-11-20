<script setup lang="ts">
import { useRoomStore, Player } from "@/store/store";
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import { factions } from "@/assets/factions";
import FactionCheckbox from "@/components/FactionCheckbox.vue";
import { ComputedRef, watch } from "vue";

const store = useRoomStore();
const { players } = storeToRefs(store);

const router = useRouter();
const route = useRoute();

// player may be missing because of an invalid URL, or because it got deleted while we are on the page
const player: ComputedRef<Player | undefined> = computed(() =>
  players.value.find((player) => player.id === route.params.id)
);

watch(
  player,
  (p) => {
    if (!p) {
      router.push({ name: "FactionSetup" });
    }
  },
  { immediate: true }
);

const rejectedFactions = computed({
  get: () => (player.value ? player.value.rejectedFactionIds : []),
  set: (value) => {
    if (player.value !== undefined) {
      store.updatePlayer(player.value.id, { rejectedFactionIds: value });
    }
  },
});
</script>

<template>
  <div v-if="player">
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
