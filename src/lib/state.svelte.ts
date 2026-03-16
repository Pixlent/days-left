import type { IDisplay, InfoDisplay } from "./display/display.svelte";
import { ChocolateBar, WaterBottle, type Item } from "./item.svelte";
import { nextScenario } from "./scenarios/common.svelte";

export enum AppState {
  LAUNCHER = "LAUNCHER",
  GAME = "GAME",
}

export enum Display {
  INFO_DISPLAY,
  MULTIPLE_CHOICE,
}

export enum Location {
  GAS_STATION,
  PHARMACY,
  HOUSE,
}

const intro = {
  type: "info",
  description:
    "You have been put into the middle of a zombie apocalypse, and only have a bottle of water and a chocolate bar. You'll walk around, scavenge for food and fight zombies. Your objective is to survive as many days as possible; this is your score. Good luck!",
  onContinue: () => {
    gameState.display = nextScenario();
  },
} as InfoDisplay;

export const gameState = $state({
  display: intro as IDisplay,
  daysSurvived: 0,
  health: 100,
  thirst: 100,
  hunger: 100,
  inventory: [new WaterBottle(), new ChocolateBar()] as Item[],
  location: Location.GAS_STATION,
});

export function nextDay() {
  gameState.daysSurvived += 1;
  hydrate((Math.random() * 10 + 20) * -1);
  eat((Math.random() * 10 + 10) * -1);
}

export function die() {
  gameState.display = {
    type: "info",
    description:
      "You died. You ended up surviving " + gameState.daysSurvived + " days.",
    onContinue: () => {
      location.reload();
    },
  } as InfoDisplay;
}

export function heal(amount: number) {
  gameState.health += amount;
  if (gameState.health > 100) {
    gameState.health = 100;
  }
}

export function hydrate(amount: number) {
  gameState.thirst += amount;
  if (gameState.health > 100) {
    gameState.thirst = 100;
  }
}

export function eat(amount: number) {
  gameState.hunger += amount;
  if (gameState.hunger > 100) {
    gameState.hunger = 100;
  }
}
