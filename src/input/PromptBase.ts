import chalk from "chalk";
import { PromptBaseOptions } from "../types";

export const PromptBase = (options: PromptBaseOptions) => {
  const str = ` ${chalk.greenBright("?")} ${options.prompt}`;
  process.stdout.write(str);

  return options.prompt.length + 3;
};
