import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import { createPinia } from "pinia";
import { usePlayersStore } from "./store/playersStore";

const app = createApp(App);

app.use(createPinia());
app.mount("#app");

usePlayersStore().subscribeToFirebase();
