import type {
  InfoDisplay,
  MultipleChoiceDisplay,
  D6Display,
} from "../display/display.svelte";
import {
  ChocolateBar,
  CondensedMilk,
  GranolaBar,
  LockPick,
  OrangeSoda,
  SaltyCrackers,
  WaterBottle,
} from "../item.svelte";
import { die, gameState, nextDay } from "../state.svelte";
import { exit, exitOrStayTheNight, youFound } from "./common.svelte";

export const gasStation = {
  type: "info",
  description: "You have arrived at a gas station",
  onContinue: intro,
} as InfoDisplay;

function intro() {
  gameState.display = {
    type: "multiple_choice",
    description:
      "You have been faced with the choice of searching or exiting the gas station",
    options: [
      {
        text: "Search",
        onSelect: lookForFood,
      },
      {
        text: "Exit",
        onSelect: exit,
      },
    ],
  } as MultipleChoiceDisplay;
}

function lookForFood() {
  let random = Math.random();
  if (random < 0.25) {
    zombieEncounter();
  } else if (random < 0.375) {
    dairyIsle();
  } else if (random < 0.5) {
    snackAisle();
  } else if (random < 0.75) {
    hardwareSection();
  } else {
    cooler();
  }
}

function hardwareSection() {
  gameState.inventory.push(new LockPick());
  gameState.display = {
    type: "info",
    description: "You discover the hardware section and find a lock pick",
    onContinue: () => {
      exitOrStayTheNight(exit);
    },
  } as InfoDisplay;
}

function dairyIsle() {
  gameState.display = {
    type: "d6",
    description:
      "You discover the dairy isle. You need to roll a die to decide what you find",
    onRoll: (dice) => {
      if (dice > 3) {
        gameState.inventory.push(new CondensedMilk());
        gameState.display = {
          type: "info",
          title: "Result",
          description: `You ended up finding condensed milk`,
          onContinue: () => {
            exitOrStayTheNight(exit);
          },
        } as InfoDisplay;
      } else {
        gameState.display = {
          type: "info",
          title: "Result",
          description: `It appears the cooler was empty`,
          onContinue: () => {
            exitOrStayTheNight(exit);
          },
        } as InfoDisplay;
      }
    },
  } as D6Display;
}

function snackAisle() {
  gameState.display = {
    type: "d6",
    description:
      "You discover the snack aisle. You need to roll a die to decide what you find",
    onRoll: (dice) => {
      if (dice < 2) {
        gameState.display = {
          type: "info",
          title: "Result",
          description: "There was no food to be found.",
          onContinue: () => {
            exitOrStayTheNight(exit);
          },
        } as InfoDisplay;
      } else if (dice < 4) {
        gameState.inventory.push(new GranolaBar());
        youFound(new GranolaBar());
      } else if (dice < 5) {
        gameState.inventory.push(new SaltyCrackers());
        youFound(new SaltyCrackers());
      } else if (dice <= 6) {
        gameState.inventory.push(new ChocolateBar());
        youFound(new ChocolateBar());
      }
    },
  } as D6Display;
}

function cooler() {
  gameState.display = {
    type: "d6",
    description:
      "You discover a cooler. You need to roll a die to decide what you find",
    onRoll: (die) => {
      if (die > 4) {
        gameState.inventory.push(new OrangeSoda());
        youFound(new OrangeSoda());
      } else if (die > 2) {
        gameState.inventory.push(new WaterBottle());
        youFound(new WaterBottle());
      } else {
        gameState.display = {
          type: "info",
          description: "The cooler was empty",
          onContinue: () => {
            exitOrStayTheNight(exit);
          },
        } as InfoDisplay;
      }
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
    type: "d6",
    description:
      "You need to roll a die to figure out whether or not you survive the encounter",
    onRoll: (dice) => {
      gameState.health -= (6 - dice) * 9;
      exitOrStayTheNight(exit);
    },
  } as D6Display;
}

function hideFromZombie() {
  gameState.display = {
    type: "d6",
    description:
      "You need to roll a die to figure out whether or not you succeed at hiding",
    onRoll: (dice) => {
      if (dice <= 2) {
        die();
        return;
      }
      gameState.display = {
        type: "info",
        description:
          "You sneaked your way around the zombie without being noticed",
        onContinue: () => {
          exitOrStayTheNight(exit);
        },
      } as InfoDisplay;
    },
  } as D6Display;
}
