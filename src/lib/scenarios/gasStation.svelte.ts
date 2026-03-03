import type {
  InfoDisplay,
  MultipleChoiceDisplay,
  D20Display,
  D6Display,
} from "../display/display.svelte";
import { Croissant, Potato } from "../item.svelte";
import { gameState } from "../state.svelte";

export const gasStation = {
  type: "info",
  description: "You have arrived at a gas station",
  onContinue: intro,
} as InfoDisplay;

function intro() {
  gameState.display = {
    type: "multiple_choice",
    description:
      "You have been faced with the choice of looking for food or exiting the gas station",
    options: [
      {
        text: "Look for food",
        onSelect: lookForFood,
      },
      {
        text: "Exit",
        onSelect: exit,
      },
    ],
  } as MultipleChoiceDisplay;
}

function exit() {
  gameState.display = {
    type: "info",
    description: "You have finished the first scenario",
    onContinue: () => {
      gameState.display = gasStation;
    },
  } as InfoDisplay;
}

function lookForFood() {
  let random = Math.random();
  if (random < 0.4) {
    zombieEncounter();
  } else if (random < 0.7) {
    freezer();
  } else {
    bakedGoods();
  }
}

function freezer() {
  gameState.display = {
    type: "d6",
    description:
      "You discover a freezer. You need to roll a die to decide what you find",
    onRoll: (dice) => {
      for (let i = 0; i < dice; i++) {
        gameState.inventory.push(new Potato());
      }
      gameState.display = {
        type: "info",
        title: "Result",
        description: `You ended up finding ${dice} potato(es)`,
        onContinue: exitOrStayTheNight,
      } as InfoDisplay;
    },
  } as D6Display;
}

function bakedGoods() {
  gameState.display = {
    type: "d6",
    description:
      "You discover the baked goods section. You need to roll a die to decide what you find",
    onRoll: (dice) => {
      for (let i = 0; i < dice; i++) {
        gameState.inventory.push(new Croissant());
      }
      gameState.display = {
        type: "info",
        title: "Result",
        description: `You ended up finding ${dice} croissants`,
        onContinue: exitOrStayTheNight,
      } as InfoDisplay;
    },
  } as D6Display;
}

function zombieEncounter() {
  gameState.display = {
    type: "multiple_choice",
    description:
      "You've been lucky enough to encounter a zombie. You can either sneak around it, or fight it.",
    options: [
      {
        text: "Fight it",
        onSelect: fightZombie,
      },
      {
        text: "Hide from it",
        onSelect: hideFromZombie,
      },
    ],
  } as MultipleChoiceDisplay;
}

function fightZombie() {
  gameState.display = {
    type: "d20",
    description:
      "You need to roll a dice to figure out whether or not you survive the encounter",
    onRoll: (dice) => {
      if (dice < 5) {
        die();
        return;
      } else if (dice <= 15) {
        gameState.health -= 15 - (dice - 5);
      }
      exitOrStayTheNight();
    },
  } as D20Display;
}

function hideFromZombie() {
  gameState.display = {
    type: "d20",
    description:
      "You need to roll a die to figure out whether or not you succeed at hiding",
    onRoll: (dice) => {
      if (dice < 8) {
        die();
        return;
      }
      gameState.display = {
        type: "info",
        description:
          "You sneaked your way around the zombie without being noticed",
        onContinue: exitOrStayTheNight,
      } as InfoDisplay;
    },
  } as D20Display;
}

function die() {
  gameState.display = {
    type: "info",
    description:
      "You died. You ended up surviving " + gameState.daysSurvived + " days.",
    onContinue: () => {
      gameState.display = gasStation;
    },
  } as InfoDisplay;
}

function exitOrStayTheNight() {
  gameState.display = {
    type: "multiple_choice",
    description:
      "You've searched everything, and can leave. Do you stay the night, or exit?",
    options: [
      {
        text: "Stay",
        onSelect: () => {
          gameState.daysSurvived += 1;
          gameState.display = {
            type: "info",
            description:
              "You ended up staying a night, and nothing bad happened :)",
            onContinue: exitOrStayTheNight,
          } as InfoDisplay;
        },
      },
      {
        text: "Exit",
        onSelect: exit,
      },
    ],
  } as MultipleChoiceDisplay;
}
