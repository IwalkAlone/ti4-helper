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

const roomDoc = doc(db, "rooms/DevRoom");
const playersCollectionRef = collection(db, "rooms/DevRoom/players");
const playersQuery = query(playersCollectionRef, orderBy("timestamp"));

export const useRoomStore = defineStore("room", {
  state() {
    const players: Player[] = [];
    return {
      enableExpansionContent: true,
      guaranteeExpansionRace: true,
      players,
    };
  },

  actions: {
    subscribeToFirebase() {
      onSnapshot(roomDoc, (snapshot) => {
        const roomData = snapshot.data();
        if (!roomData) {
          console.error("Failed to load DevRoom");
          return;
        }

        this.$patch({
          enableExpansionContent: roomData.enableExpansionContent,
          guaranteeExpansionRace: roomData.guaranteeExpansionRace,
        });
      });

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

    updateRoom(changes: {
      enableExpansionContent?: boolean;
      guaranteeExpansionRace?: boolean;
    }) {
      updateDoc(roomDoc, changes);
    },

    addPlayer() {
      addDoc(playersCollectionRef, { name: "", timestamp: serverTimestamp() });
    },

    updatePlayer(id: string, changes: Partial<Player>) {
      updateDoc(doc(playersCollectionRef, id), changes);
    },

    removePlayer(id: string) {
      deleteDoc(doc(playersCollectionRef, id));
    },

    setPlayers(players: Player[]) {
      this.players = players;
    },
  },
});
