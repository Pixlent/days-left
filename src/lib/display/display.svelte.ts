export type DisplayType = "multiple_choice" | "info" | "dice";

export interface IDisplay {
  type: DisplayType;
}

export interface InfoDisplay extends IDisplay {
  type: "info";
  title: string;
  description: string;
  onContinue: () => void;
}

export interface MultipleChoiceDisplay extends IDisplay {
  type: "multiple_choice";
  title: string;
  description: string;
  options: Array<{
    text: string;
    onSelect: () => void;
  }>;
}

export interface DiceDisplay extends IDisplay {
  type: "dice";
  title: string;
  description: string;
  onRoll: (dice: number) => void;
}

export type AnyDisplay = MultipleChoiceDisplay | InfoDisplay | DiceDisplay;
