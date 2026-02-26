import type { Item } from "./item.svelte";

export enum AppState {
  LAUNCHER = "LAUNCHER",
  GAME = "GAME",
}

export enum Location {
  PHARMACY,
  HOUSE,
}

export const gameState = $state({
  days_survived: 0,
  turn: 0,
  health: 100,
  inventory: [] as Item[],
  location: Location.HOUSE,
});
