<script setup lang="ts">
import { useRoomStore, Player } from "@/store/store";
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import { baseGameFactions, prophecyOfKingsFactions } from "@/assets/factions";
import FactionCheckbox from "@/components/FactionCheckbox.vue";
import { ComputedRef, watch } from "vue";
import { intersection } from "lodash";

const MAX_BANS = 5;
const MAX_EXPANSION_BANS = 1;

const store = useRoomStore();
const { players, enableExpansionContent } = storeToRefs(store);

const router = useRouter();
const route = useRoute();

// player may be missing because of an invalid URL, or because it got deleted while we are on the page
const player: ComputedRef<Player | undefined> = computed(() =>
  players.value.find((player) => player.id === route.params.id)
);

// bugged - navigation to other route causes this to trigger
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

const expansionBanCount = computed(
  () =>
    intersection(
      rejectedFactions.value,
      prophecyOfKingsFactions.map((f) => f.id)
    ).length
);

const bansDisabled = computed(() => rejectedFactions.value.length >= MAX_BANS);
const expansionBansDisabled = computed(
  () => bansDisabled.value || expansionBanCount.value >= MAX_EXPANSION_BANS
);
</script>

<template>
  <template v-if="player">
    <div
      class="
        px-3
        border-b-1 border-b-dark-900
        sticky
        top-0
        z-10
        bg-light-100
        shadow-dark-900 shadow-md
      "
    >
      <div>
        <div>
          Исключено фракций: {{ rejectedFactions.length }}/{{ MAX_BANS }}
        </div>
        <div>
          Исключено фракций из дополнения: {{ expansionBanCount }}/{{
            MAX_EXPANSION_BANS
          }}
        </div>
      </div>
    </div>

    <div class="p-3">
      <FactionCheckbox
        v-for="faction in baseGameFactions"
        :key="faction.name"
        v-model="rejectedFactions"
        :prevent-checking="bansDisabled"
        :faction="faction"
      />

      <div
        class="
          text-center
          my-2
          relative
          after:content-[attr(data-content)]
          after:absolute
          after:top-1/2
          after:left-0
          after:w-full
          after:border-b-1
          after:border-light-900
          after:-z-10
        "
      >
        <span class="bg-light-100 px-3 z-10 text-sm text-gray-500">
          Пророчество Королей
        </span>
      </div>

      <div v-if="enableExpansionContent">
        <FactionCheckbox
          v-for="faction in prophecyOfKingsFactions"
          :key="faction.name"
          v-model="rejectedFactions"
          :prevent-checking="expansionBansDisabled"
          :faction="faction"
        />
      </div>
    </div>
  </template>
</template>
