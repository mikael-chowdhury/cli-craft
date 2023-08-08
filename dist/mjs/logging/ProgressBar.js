import chalk from "chalk";
export class ProgressBar {
    name;
    Value;
    MaxValue;
    constructor(name, initialValue, maxValue) {
        this.name = name;
        this.Value = initialValue;
        this.MaxValue = maxValue;
    }
    getBarContents() {
        let contents = "";
        let completePercentage = Math.floor((this.Value / this.MaxValue) * 10);
        contents += "#".repeat(Math.min(completePercentage, 10));
        contents += "-".repeat(Math.max(10 - completePercentage, 0));
        return contents;
    }
    update() {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(this.name +
            `  ${chalk.yellow("[")}${chalk.cyanBright(this.getBarContents())}${chalk.yellow("]")}  ` +
            Math.fround((this.Value / this.MaxValue) * 100) +
            "%");
    }
    set value(val) {
        this.Value = val;
        this.update();
    }
    get value() {
        return this.Value;
    }
}
