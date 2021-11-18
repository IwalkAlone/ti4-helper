import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import GameSetup from "@/components/GameSetup.vue";
import FactionSetup from "@/components/FactionSetup.vue";
import PlayerRejectedFactions from "@/components/PlayerRejectedFactions.vue";
import RandomizerTester from "@/components/RandomizerTester.vue";

const routes: RouteRecordRaw[] = [
  {
    name: "GameSetup",
    path: "/setup",
    component: GameSetup,
  },
  {
    name: "FactionSetup",
    path: "/bans",
    component: FactionSetup,
  },
  {
    name: "PlayerRejectedFactions",
    path: "/bans/player/:id",
    component: PlayerRejectedFactions,
  },
  {
    name: "RandomizerTester",
    path: "/randomizerTester",
    component: RandomizerTester,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/setup",
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
