import { CheckBoxChoice } from "./types";
import { renderers } from "./input";

declare module "get-cursor-position" {}

declare global {
  function CheckBox(options: CheckBoxOptions): Promise<CheckBoxChoice[]>;
  function MultipleChoice(options: MultipleChoiceOptions): Promise<string>;
  interface Prompt {
    (options: any): void;
    setRenderer: (renderer: Function) => void;
    renderers: { [key: string]: promptRenderer };
  }
}

export type promptTypes = "number" | "string" | "any";

export type rendererOptions = "default" | "password" | string;
export interface PromptBaseOptions {
  prompt: string;
}

export interface PromptOptions {
  prompt: string;
  type: promptTypes;
  renderer?: rendererOptions;
  validate?: (text: string) => boolean | string;
}

export interface PromptOptionsAsserted {
  prompt: string;
  type: promptTypes;
  renderer: rendererOptions;
  validate: (text: string) => boolean | string;
}

export type promptRenderer = (text: string) => string;

export interface MultipleChoiceOptions {
  prompt: string;
  choices: string[];
}

export interface CheckBoxChoice {
  name: string;
  value: boolean;
}

export interface CheckBoxOptions {
  prompt: string;
  choices: (CheckBoxChoice | string)[];
}

export interface Command {
  name: string;
  aliases: string[];
  exec: (argv: string[], flags: { [key: string]: string }) => void;
}

export interface CommandHandlerOptions {
  ignoreNoCommandFound?: boolean;
}

export interface CommandHandlerOptionsAsserted {
  ignoreNoCommandFound: boolean;
}
