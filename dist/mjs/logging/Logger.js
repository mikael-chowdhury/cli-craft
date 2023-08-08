import fs from "fs";
import { PassThrough } from "stream";
import ToString from "../util/ToString";
import chalk from "chalk";
import FormatLoggerLines from "../util/FormatLoggerLines";
export class Logger extends PassThrough {
    wroteNewline = true;
    EntireLog = "";
    constructor() {
        super();
    }
    updateNewline(message) {
        this.wroteNewline = message.endsWith("\n");
    }
    log(message) {
        let finalString = ToString(message);
        this.EntireLog += finalString;
        this.write(finalString);
    }
    debug(message, newline = true) {
        let finalString = ToString(message);
        finalString = FormatLoggerLines("debug", finalString, chalk.yellow, this.wroteNewline);
        this.updateNewline(finalString + (newline ? "\n" : ""));
        this.log(finalString + (newline ? "\n" : ""));
    }
    error(message, newline = true) {
        let finalString = ToString(message);
        finalString = FormatLoggerLines("error", finalString, chalk.red, this.wroteNewline);
        this.updateNewline(finalString + (newline ? "\n" : ""));
        this.log(finalString + (newline ? "\n" : ""));
    }
    success(message, newline = true) {
        let finalString = ToString(message);
        finalString = FormatLoggerLines("success", finalString, chalk.green, this.wroteNewline);
        this.updateNewline(finalString + (newline ? "\n" : ""));
        this.log(finalString + (newline ? "\n" : ""));
    }
    export(path) {
        if (fs.existsSync(path) && fs.statSync(path).isFile()) {
            fs.writeFileSync(path, chalk.reset(this.EntireLog));
        }
        else
            console.log(chalk.red.bold("invalid path or path is not a file!"));
    }
}
