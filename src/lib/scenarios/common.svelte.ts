import type {
  IDisplay,
  InfoDisplay,
  MultipleChoiceDisplay,
} from "../display/display.svelte";
import type { Item } from "../item.svelte";
import { gameState, nextDay } from "../state.svelte";
import { cabin } from "./cabin.svelte";
import { gasStation } from "./gasStation.svelte";

export function exit() {
  gameState.display = {
    type: "info",
    description: "You continue to look for places to scavenge",
    onContinue: () => {
      nextDay();
      gameState.display = nextScenario();
    },
  } as InfoDisplay;
}

export function exitOrStayTheNight(exit: () => void) {
  return (gameState.display = {
    type: "multiple_choice",
    description:
      "You've searched everything, and can leave. Do you stay the night, or exit?",
    options: [
      {
        text: "Stay",
        onSelect: () => {
          nextDay();
          gameState.display = {
            type: "info",
            description:
              "You stayed the night, but as a consequence, drained your food and water.",
            onContinue: () => {
              gameState.display = exitOrStayTheNight(exit);
            },
          } as InfoDisplay;
        },
      },
      {
        text: "Exit",
        onSelect: exit,
      },
    ],
  } as MultipleChoiceDisplay);
}

export function youFound(item: Item) {
  gameState.display = {
    type: "info",
    title: "Result",
    description: `You ended up finding ${item.name}`,
    onContinue: () => {
      exitOrStayTheNight(exit);
    },
  } as InfoDisplay;
}

export function nextScenario(): IDisplay {
  const amountOfScenarios = 2;
  let rand = Math.floor(Math.random() * amountOfScenarios);

  if (rand == 0) {
    return gasStation;
  }
  return cabin;
}
