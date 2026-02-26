import type { Item } from "./item.svelte";

export enum AppState {
  LAUNCHER = "LAUNCHER",
  GAME = "GAME",
}

export enum Display {
  INFO_DISPLAY,
  MULTIPLE_CHOICE,
}

export enum Location {
  PHARMACY,
  HOUSE,
}

export const gameState = $state({
  display: Display.INFO_DISPLAY,
  daysSurvived: 0,
  turn: 0,
  health: 100,
  inventory: [] as Item[],
  location: Location.HOUSE,
});

export function nextTurn() {
  gameState.turn += 1;
  if (Math.random() > 0.6) gameState.daysSurvived += 1;
}
