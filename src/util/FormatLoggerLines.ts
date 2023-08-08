import chalk from "chalk";
import GetTimestamp from "../util/GetTimestamp";

export default (
  level: string,
  message: string,
  colour: (msg: string) => string,
  writeTimestamp: boolean = true
) =>
  message
    .split("\n")
    .map((line) =>
      writeTimestamp
        ? colour(
            chalk.bold(` [${level.toUpperCase()}] `) +
              " ".repeat(Math.max(0 - (level.length - 7), 0)) +
              GetTimestamp() +
              " " +
              line
          )
        : colour(message)
    )
    .join("\n");
