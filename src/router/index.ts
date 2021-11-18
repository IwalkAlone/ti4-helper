import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import GameSetup from "@/components/GameSetup.vue";
import BansSetup from "@/components/BansSetup.vue";
import RandomizerTester from "@/components/RandomizerTester.vue";

const routes: RouteRecordRaw[] = [
  {
    name: "GameSetup",
    path: "/setup",
    component: GameSetup,
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
  {
    path: "/:pathMatch(.*)*",
    redirect: "/setup",
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
