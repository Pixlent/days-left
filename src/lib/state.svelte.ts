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
    description: "To start, please press the button bellow",
    onContinue: dice,
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

function dice() {
  gameState.display = {
    type: "dice",
    title: "Roll a dice",
    description: "You got ",
    pool: [
      {
        min: 1,
        max: 5,
        function: () => {
          gameState.display.description = "You got 1-5";
        },
      },
      {
        min: 6,
        max: 20,
        function: () => {
          gameState.display.description = "You got 6-20";
        },
      },
    ],
  };
}

function pineappleQuestion() {
  gameState.display = {
    type: "multiple_choice",
    title: "Important question",
    description: "Do you like pineapple on pizza?",
    options: [
      {
        text: "Yes.",
        onSelect: pineappleYes,
      },
      {
        text: "No.",
        onSelect: pineappleNo,
      },
    ],
  };
}

function pineappleYes() {
  gameState.display = {
    type: "info",
    title: "Yes, yes!",
    description: "You have good taste my friend",
    onContinue: tutorialDisplay,
  };
}

function pineappleNo() {
  gameState.display = {
    type: "info",
    title: "What is wrong with you?",
    description: "You are a monster...",
    onContinue: tutorialDisplay,
  };
}

function tutorialDisplay() {
  gameState.display = {
    type: "info",
    title: "Tutorial",
    description: "To start, please press the button bellow",
    onContinue: pineappleQuestion,
  };
}
