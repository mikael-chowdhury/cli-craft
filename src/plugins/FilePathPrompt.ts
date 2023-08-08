import { Prompt } from "../input/index";
import { Plugin } from "./Plugin";
import chalk from "chalk";
import path from "path";
import fs from "fs";

export class FilePathPrompt implements Plugin {
  public name = "File Path Prompt";
  public version = "1.0.0";

  initRenderers = () => {
    Prompt.setRenderer("path", (text) => {
      const pathDown = text.split(path.sep).slice(0, -1).join(path.sep);
      const fullPath = text;

      if (fs.existsSync(pathDown) && fs.statSync(pathDown).isDirectory()) {
        const autoCompletePossibilities = fs
          .readdirSync(pathDown)
          .filter((x) => x.startsWith(path.basename(fullPath)))
          .sort((a, b) => a.length - b.length);

        if (autoCompletePossibilities.length > 0) {
          const bestCompletion = autoCompletePossibilities[0];
          const toAppend = bestCompletion.slice(path.basename(fullPath).length);

          return text + chalk.grey(toAppend);
        } else return text;
      } else if (fs.existsSync(fullPath)) {
        return chalk.bold(fullPath);
      }
      return fullPath;
    });
  };

  initPlugins = () => {};

  onReady = () => {};
}
