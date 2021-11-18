import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import PlayerSetup from "@/components/PlayerSetup.vue";
import BansSetup from "@/components/BansSetup.vue";
import RandomizerTester from "@/components/RandomizerTester.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/players",
  },
  {
    name: "PlayersSetup",
    path: "/players",
    component: PlayerSetup,
  },
  {
    name: "BansSetup",
    path: "/bans",
    component: BansSetup,
  },
  {
    name: "RandomizerTester",
    path: "/randomizerTester",
    component: RandomizerTester,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
