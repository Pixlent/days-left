import { eat, gameState, hydrate } from "./state.svelte";

export interface Item {
  name: String;
}

export interface Consumable {
  consume(): void;
}

export function isConsumable(obj: any): obj is Consumable {
  return (
    typeof obj === "object" && obj !== null && typeof obj.consume === "function"
  );
}

export class Axe implements Item {
  name = "Axe";
}

export class BeefJerky implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 25 + 20);
  }
  name = "Beef Jerky";
}

export class ChocolateBar implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 20 + 20);
  }
  name = "Chocolate Bar";
}

export class CondensedMilk implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 50 + 40);
  }
  name = "Condensed Milk";
}

export class DogFood implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 10 + 20);
  }
  name = "Dog Food";
}

export class GranolaBar implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 20 + 30);
  }
  name = "Granola Bar";
}

export class PeanutButter implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 30 + 40);
  }
  name = "Peanut Butter";
}

export class SaltyCrackers implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 30 + 30);
    hydrate((Math.random() * 10 + 20) * -1);
  }
  name = "Salty Crackers";
}

export class SardineTin implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 10 + 30);
  }
  name = "Tin of Sardines";
}

export class TomatoSoup implements Item, Consumable {
  consume(): void {
    eat(Math.random() * 20 + 20);
    hydrate(Math.random() * 20 + 20);
  }
  name = "Tomato Soup";
}

export class WaterBottle implements Item, Consumable {
  consume(): void {
    hydrate(Math.random() * 30 + 60);
  }
  name = "Bottle of Water";
}

export class OrangeSoda implements Item, Consumable {
  consume(): void {
    hydrate(Math.random() * 10 + 30);
    eat(Math.random() * 10 + 10);
  }
  name = "Orange Soda";
}

export class Cola implements Item, Consumable {
  consume(): void {
    hydrate(Math.random() * 10 + 30);
    eat(Math.random() * 10 + 10);
  }
  name = "Cola";
}
