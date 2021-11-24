import { Player } from "@/store/store";
import { shuffle } from "lodash";
import { Faction } from "./assets/factions";

const MAX_ATTEMPTS = 100;

export type RandomisationResult =
  | { player: Player; factions: Faction[] }[]
  | "timeout";

export default function randomiseFactions(
  players: Player[],
  factions: Faction[],
  factionsPerPlayer: number
): RandomisationResult {
  const shuffledPlayers = shuffle(players);
  return randomiseHelper(shuffledPlayers, factions, factionsPerPlayer);
}

function randomiseHelper(
  players: Player[],
  factions: Faction[],
  factionsPerPlayer: number,
  attempt = 0
): RandomisationResult {
  if (attempt >= MAX_ATTEMPTS) {
    return "timeout";
  }

  const shuffledFactions = shuffle(factions);
  const result = [];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const playerFactions: Faction[] = [];

    result[i] = {
      player,
      factions: playerFactions,
    };

    if (shuffledFactions.length < (players.length - i) * factionsPerPlayer) {
      return randomiseHelper(players, factions, factionsPerPlayer, attempt + 1);
    }

    for (let j = 0; j < factionsPerPlayer; j++) {
      const faction = shiftUntilNonBannedFaction(shuffledFactions, player);

      if (faction === undefined) {
        return randomiseHelper(
          players,
          factions,
          factionsPerPlayer,
          attempt + 1
        );
      }

      result[i].factions.push(faction);
    }
  }

  return result;
}

function shiftUntilNonBannedFaction(
  factions: Faction[],
  player: Player
): Faction | undefined {
  const faction = factions.shift();

  if (faction === undefined) {
    return undefined;
  }

  if (player.rejectedFactionIds.includes(faction.id)) {
    return shiftUntilNonBannedFaction(factions, player);
  }

  return faction;
}
