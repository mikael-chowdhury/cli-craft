import fs from "fs";
import { PassThrough } from "stream";
import ToString from "../util/ToString";
import chalk from "chalk";
import FormatLoggerLines from "../util/FormatLoggerLines";

export class Logger extends PassThrough {
  private wroteNewline: boolean = true;
  private EntireLog = "";

  constructor() {
    super();
  }

  private updateNewline(message: string) {
    this.wroteNewline = message.endsWith("\n");
  }

  private log(message: any) {
    let finalString = ToString(message);
    this.EntireLog += finalString;
    this.write(finalString);
  }

  public debug(message: any, newline: boolean = true) {
    let finalString = ToString(message);

    finalString = FormatLoggerLines(
      "debug",
      finalString,
      chalk.yellow,
      this.wroteNewline
    );

    this.updateNewline(finalString + (newline ? "\n" : ""));

    this.log(finalString + (newline ? "\n" : ""));
  }

  public error(message: any, newline: boolean = true) {
    let finalString = ToString(message);

    finalString = FormatLoggerLines(
      "error",
      finalString,
      chalk.red,
      this.wroteNewline
    );

    this.updateNewline(finalString + (newline ? "\n" : ""));

    this.log(finalString + (newline ? "\n" : ""));
  }

  public success(message: any, newline: boolean = true) {
    let finalString = ToString(message);

    finalString = FormatLoggerLines(
      "success",
      finalString,
      chalk.green,
      this.wroteNewline
    );

    this.updateNewline(finalString + (newline ? "\n" : ""));

    this.log(finalString + (newline ? "\n" : ""));
  }

  public export(path: string) {
    if (fs.existsSync(path) && fs.statSync(path).isFile()) {
      fs.writeFileSync(path, chalk.reset(this.EntireLog));
    } else console.log(chalk.red.bold("invalid path or path is not a file!"));
  }
}
