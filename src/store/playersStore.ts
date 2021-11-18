import { defineStore } from "pinia";
import db from "@/firestore";
import {
  doc,
  collection,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export interface Player {
  id: string;
  name: string;
}

const playersCollectionRef = collection(db, "players");
const playersQuery = query(playersCollectionRef, orderBy("timestamp"));

export const usePlayersStore = defineStore("players", {
  state() {
    const players: Player[] = [];
    return {
      players,
    };
  },

  actions: {
    subscribeToFirebase() {
      onSnapshot(playersQuery, (querySnapshot) => {
        const newPlayers = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        });

        this.$patch({
          players: newPlayers,
        });
      });
    },

    addPlayer() {
      addDoc(playersCollectionRef, { name: "", timestamp: serverTimestamp() });
    },

    updatePlayer(id: string, $event: Event) {
      updateDoc(doc(playersCollectionRef, id), {
        name: ($event.target as HTMLInputElement).value,
      });
    },

    removePlayer(id: string) {
      deleteDoc(doc(playersCollectionRef, id));
    },

    setPlayers(players: Player[]) {
      this.players = players;
    },
  },
});
