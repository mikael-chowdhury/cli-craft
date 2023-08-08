import {
  PromptOptions,
  PromptOptionsAsserted,
  promptRenderer,
  rendererOptions,
} from "types";
import chalk from "chalk";
import readline from "readline";
import SetDefaultObjectProperties from "../util/SetDefaultObjectProperties";
import { PromptBase } from "../input/PromptBase";

const letters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const numbers = [..."1234567890"];
const symbols = [..."!@£$%^&*()_+-=[]{}:;'\"\\|?/.,`~±§"];

const any = letters.concat(numbers).concat(symbols);

const defaultPromptOptions: PromptOptions = {
  prompt: "",
  type: "string",
  renderer: "default",
  validate: (text) => true,
};

const writePrompt = (prompt: string) => {
  const length = PromptBase({ prompt });
  process.stdout.write(" ");

  return length + 1;
};

const renderPrompt = (options: PromptOptions, unRenderedText: string) => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  const length = writePrompt(options.prompt);
  process.stdout.write(
    Prompt.renderers[options.renderer as rendererOptions](unRenderedText)
  );

  process.stdout.cursorTo(length + unRenderedText.length);
};

const Prompt = <ResultType>(
  optionsParam: PromptOptions
): Promise<ResultType> => {
  const options = SetDefaultObjectProperties<PromptOptions>(
    optionsParam,
    defaultPromptOptions
  ) as PromptOptionsAsserted;

  let allowedChars: any[];

  switch (options.type) {
    case "string":
      allowedChars = letters;
      break;
    case "number":
      allowedChars = numbers;
      break;
    case "any":
      allowedChars = any;
      break;
  }

  return new Promise((res, rej) => {
    writePrompt(options.prompt);

    process.stdin.setRawMode(true);

    readline.emitKeypressEvents(process.stdin);

    let unRenderedText = "";
    let validationFailed = false;
    const callback = (
      chunk: Buffer,
      key: { name: string; sequence: string; ctrl: boolean }
    ) => {
      let resolved = false;
      if (key && key.name == "c" && key.ctrl) {
        process.exit(0);
      } else if (key.name == "return") {
        const validation = options.validate(unRenderedText);
        if (validation == true) {
          if (validationFailed) {
            process.stdout.moveCursor(0, 1);
            process.stdout.clearLine(0);
            process.stdout.moveCursor(0, -1);
          }
          process.stdout.write("\n");
          process.stdin.removeAllListeners("keypress");
          process.stdin.setRawMode(false);
          res(unRenderedText as unknown as ResultType);
          resolved = true;
        } else {
          validationFailed = true;
          process.stdout.write(
            chalk.red.bold("\n >> ") +
              (typeof validation == "string" ? validation : "Invalid Input")
          );
          process.stdout.moveCursor(0, -1);
          writePrompt(options.prompt);
        }
      } else if (key.name == "backspace") {
        unRenderedText = unRenderedText.slice(0, unRenderedText.length - 1);
      } else {
        if (allowedChars.includes(key.sequence)) {
          unRenderedText += key.sequence;
        } else if (key.name == "space") {
          unRenderedText += " ";
        }
      }

      if (!resolved) {
        renderPrompt(options, unRenderedText);
      } else {
        res(unRenderedText as unknown as ResultType);
      }
    };
    process.stdin.on("keypress", callback);
  });
};

Prompt.renderers = {
  default: (text) => {
    return text;
  },
  password: (text) => {
    return "●".repeat(text.length);
  },
} as { [key: string]: promptRenderer };

Prompt.setRenderer = (
  rendererName: string,
  render: (text: string) => string
) => {
  Prompt.renderers[rendererName as keyof typeof Prompt.renderers] = render;
};

(globalThis as any).Prompt = Prompt;

export { Prompt };
