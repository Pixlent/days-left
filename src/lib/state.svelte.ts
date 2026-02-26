import type { Item } from "./item.svelte";
import type { AnyDisplay } from "./display/display.svelte";

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
  display: {
    type: "info",
    title: "Tutorial",
    content: "To start, please press the button bellow",
    onContinue: () => {
      gameState.display = {
        type: "multiple_choice",
        title: "Do you like pineapple on pizza?",
        options: [
          {
            text: "Yes.",
            onSelect: () => {
              gameState.display = {
                type: "info",
                title: "Yes, yes!",
                content: "You have good taste my friend",
                onContinue: () => {},
              };
            },
          },
          {
            text: "No.",
            onSelect: () => {
              gameState.display = {
                type: "info",
                title: "What is wrong with you?",
                content: "You are a monster...",
                onContinue: () => {},
              };
            },
          },
        ],
      };
    },
  } as AnyDisplay,
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
