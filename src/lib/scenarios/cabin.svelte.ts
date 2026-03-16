import type CD6Display from "../display/CD6Display.svelte";
import type {
  D6Display,
  InfoDisplay,
  MultipleChoiceDisplay,
} from "../display/display.svelte";
import { gameState, heal, nextDay } from "../state.svelte";
import { exit } from "./common.svelte";

export const cabin = {
  type: "info",
  description: "You have arrived at a cabin",
  onContinue: intro,
} as InfoDisplay;

function intro() {
  gameState.display = {
    type: "multiple_choice",
    description:
      "You found a cabin and you can either attempt to enter or continue looking",
    options: [
      {
        text: "Enter",
        onSelect: enter,
      },
      {
        text: "Continue Looking",
        onSelect: exit,
      },
    ],
  } as MultipleChoiceDisplay;
}

function enter() {
  if (
    gameState.inventory.some((item) => item.name && item.name === "Lock Pick")
  ) {
    gameState.display = {
      type: "d6",
      description:
        "The door is locked, but you can attempt to lockpick it. You need to roll a 5 or higher to enter",
      onRoll: (die) => {
        if (die > 4) {
          gameState.display = {
            type: "info",
            description: "You enter the cabin and discover a bed",
            onContinue: bed,
          } as InfoDisplay;
          return;
        }
        gameState.display = {
          type: "info",
          description: "You weren't able to unlock the door",
          onContinue: exit,
        } as InfoDisplay;
      },
    } as D6Display;
  } else {
    gameState.display = {
      type: "info",
      description: "The door was locked",
      onContinue: exit,
    } as InfoDisplay;
  }
}

function bed() {
  gameState.display = {
    type: "multiple_choice",
    description: "You can either stay up or sleep to restore health",
    options: [
      {
        text: "Sleep",
        onSelect: sleep,
      },
      {
        text: "Exit",
        onSelect: exit,
      },
    ],
  } as MultipleChoiceDisplay;
}

function sleep() {
  nextDay();
  exit();
  heal(Math.random() * 15 + 25);
}
