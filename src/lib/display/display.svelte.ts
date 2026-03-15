export type DisplayType = "multiple_choice" | "info" | "d6";

export interface IDisplay {
  type: DisplayType;
}

export interface InfoDisplay extends IDisplay {
  type: "info";
  description: string;
  onContinue: () => void;
}

export interface MultipleChoiceDisplay extends IDisplay {
  type: "multiple_choice";
  description: string;
  options: Array<{
    text: string;
    onSelect: () => void;
  }>;
}

export interface D6Display extends IDisplay {
  type: "d6";
  description: string;
  onRoll: (die: number) => void;
}

export type AnyDisplay = MultipleChoiceDisplay | InfoDisplay | D6Display;
