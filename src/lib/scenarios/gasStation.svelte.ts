import type {
  InfoDisplay,
  MultipleChoiceDisplay,
  D6Display,
} from "../display/display.svelte";
import {
  ChocolateBar,
  CondensedMilk,
  GranolaBar,
  OrangeSoda,
  SaltyCrackers,
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

function lookForFood() {
  let random = Math.random();
  if (random < 0.4) {
    zombieEncounter();
  } else if (random < 0.7) {
    dairyIsle();
  } else {
    snackAisle();
  }
}

function dairyIsle() {
  gameState.display = {
    type: "d6",
    description:
      "You discover the dairy isle. You need to roll a die to decide what you find",
    onRoll: (dice) => {
      for (let i = 0; i < dice; i++) {
        gameState.inventory.push(new CondensedMilk());
      }
      gameState.display = {
        type: "info",
        title: "Result",
        description: `You ended up finding ${dice} potato(es)`,
        onContinue: () => {
          exitOrStayTheNight(exit);
        },
      } as InfoDisplay;
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
      if (dice <= 1) {
        die();
        return;
      } else if (dice <= 5) {
        gameState.health -= dice * 7;
      }
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
