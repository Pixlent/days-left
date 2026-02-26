export type DisplayType = "multiple_choice" | "info";

export interface IDisplay {
  type: DisplayType;
}

export interface InfoDisplay extends IDisplay {
  type: "info";
  title: string;
  content: string;
  onContinue: () => void;
}

export interface MultipleChoiceDisplay extends IDisplay {
  type: "multiple_choice";
  title: string;
  options: Array<{
    text: string;
    onSelect: () => void; // Type-safe callback
  }>;
}

export type AnyDisplay = MultipleChoiceDisplay | InfoDisplay;
