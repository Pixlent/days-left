import type {
  IDisplay,
  InfoDisplay,
  MultipleChoiceDisplay,
  DiceDisplay,
} from "../display/display.svelte";
import { gameState } from "../state.svelte";

export const gasStation = {
  type: "info",
  title: "Gas Station",
  description: "You have arrived at a gas station",
  onContinue: intro,
} as InfoDisplay;

function intro() {
  gameState.display = {
    type: "multiple_choice",
    title: "Choice",
    description:
      "You have been faced with the choice of looking for food or exciting the gas station",
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
    title: "You're done",
    description: "You have finished the first scenario",
    onContinue: () => {
      gameState.display = gasStation;
    },
  } as InfoDisplay;
}

function lookForFood() {
  gameState.display = {
    type: "dice",
    title: "You've encountered a skill-check",
    description: "You need to roll a dice to decide what happens",
    onRoll: (dice) => {
      if (dice >= 1 && dice <= 5) {
        zombieEncounter();
      } else if (dice >= 6 && dice <= 12) {
        bakedGoods();
      } else if (dice >= 13 && dice <= 20) {
        freezer();
      }
    },
  } as DiceDisplay;
}

function freezer() {
  gameState.display = {
    type: "dice",
    title: "You discover a freezer",
    description: "You need to roll a dice to decide how lucky you are",
    onRoll: (dice) => {
      gameState.display = {
        type: "info",
        title: "Result",
        description: `You ended up finding ${dice} potato(es)`,
        onContinue: exitOrStayTheNight,
      } as InfoDisplay;
    },
  } as DiceDisplay;
}

function bakedGoods() {
  gameState.display = {
    type: "dice",
    title: "You discover the baked goods section",
    description: "You need to roll a dice to decide how lucky you are",
    onRoll: (dice) => {
      gameState.display = {
        type: "info",
        title: "Result",
        description: `You ended up finding ${dice} croissants`,
        onContinue: exitOrStayTheNight,
      } as InfoDisplay;
    },
  } as DiceDisplay;
}

function zombieEncounter() {
  gameState.display = {
    type: "multiple_choice",
    title: "Choice",
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
    type: "dice",
    title: "Roll a die",
    description:
      "You need to roll a dice to figure out whether or not you survive the encounter",
    onRoll: (dice) => {
      if (dice < 5) {
        die();
        return;
      } else if (dice < 15) {
        gameState.health -= 15 - (dice - 5);
      }
      exitOrStayTheNight();
    },
  } as DiceDisplay;
}

function hideFromZombie() {
  gameState.display = {
    type: "dice",
    title: "Roll a die",
    description:
      "You need to roll a die to figure out whether or not you succeed at hiding",
    onRoll: (dice) => {
      if (dice < 8) {
        die();
        return;
      }
      gameState.display = {
        type: "info",
        title: "You went unnoticed!",
        description:
          "You sneaked your way around the zombie without being noticed",
        onContinue: exitOrStayTheNight,
      } as InfoDisplay;
    },
  } as DiceDisplay;
}

function die() {
  gameState.display = {
    type: "info",
    title: "You died",
    description: "You ended up surviving " + gameState.daysSurvived + " days.",
    onContinue: () => {
      gameState.display = gasStation;
    },
  } as InfoDisplay;
}

function exitOrStayTheNight() {
  gameState.display = {
    type: "multiple_choice",
    title: "Choice",
    description:
      "You've searched everything, and can leave. Do you stay the night, or exit?",
    options: [
      {
        text: "Stay",
        onSelect: () => {
          gameState.display = {
            type: "info",
            title: "1 Day later",
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
