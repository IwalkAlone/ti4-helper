import { defineStore } from "pinia";

export const useGameSettingsStore = defineStore("gameSettings", {
  state() {
    return {
      enableExpansionContent: true,
      guaranteeExpansionRace: true,
      bansPerPlayer: 5,
      picksPerPlayer: 3,
    };
  },
});
