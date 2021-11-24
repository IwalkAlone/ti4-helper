<script setup lang="ts">
import { useRoomStore, Player } from "@/store/store";
import { storeToRefs } from "pinia";
import { computed } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import { baseGameFactions, prophecyOfKingsFactions } from "@/assets/factions";
import { ComputedRef, watch } from "vue";
import { intersection } from "lodash";
import IconBack from "~icons/fluent/chevron-double-left-20-regular";

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

watch(
  player,
  (p) => {
    if (route.name === "PlayerRejectedFactions" && !p) {
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
    <PageHeader title="Исключить фракции" />

    <div
      class="
        px-3
        py-1
        border-b-1 border-b-dark-900
        sticky
        top-8
        z-10
        bg-light-100
        shadow-dark-900 shadow-md
      "
    >
      <router-link
        class="flex items-center justify-between"
        :to="{ name: 'FactionSetup' }"
      >
        <IconBack class="flex-shrink-0" />
        <div class="text-right text-sm">
          <div>Игрок: {{ player.name }}</div>
          <div>
            Всего:
            <span class="text-base" :class="{ 'text-red-800': bansDisabled }">
              {{ rejectedFactions.length }}/{{ MAX_BANS }}
            </span>

            <template v-if="enableExpansionContent">
              , из дополнения:
              <span
                class="text-base"
                :class="{ 'text-red-800': expansionBansDisabled }"
              >
                {{ expansionBanCount }}/{{ MAX_EXPANSION_BANS }}
              </span>
            </template>
          </div>
        </div>
      </router-link>
    </div>

    <div class="p-3">
      <FactionCheckbox
        v-for="faction in baseGameFactions"
        :key="faction.name"
        v-model="rejectedFactions"
        :prevent-checking="bansDisabled"
        :faction="faction"
      />

      <template v-if="enableExpansionContent">
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

        <div>
          <FactionCheckbox
            v-for="faction in prophecyOfKingsFactions"
            :key="faction.name"
            v-model="rejectedFactions"
            :prevent-checking="expansionBansDisabled"
            :faction="faction"
          />
        </div>
      </template>
    </div>
  </template>
</template>
