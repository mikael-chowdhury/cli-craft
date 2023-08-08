import chalk from "chalk";

export class ProgressBar {
  private name: string;
  private Value: number;
  private MaxValue: number;
  constructor(name: string, initialValue: number, maxValue: number) {
    this.name = name;
    this.Value = initialValue;
    this.MaxValue = maxValue;
  }

  private getBarContents() {
    let contents = "";

    let completePercentage = Math.floor((this.Value / this.MaxValue) * 10);

    contents += "#".repeat(Math.min(completePercentage, 10));
    contents += "-".repeat(Math.max(10 - completePercentage, 0));

    return contents;
  }

  update() {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
      this.name +
        `  ${chalk.yellow("[")}${chalk.cyanBright(
          this.getBarContents()
        )}${chalk.yellow("]")}  ` +
        Math.fround((this.Value / this.MaxValue) * 100) +
        "%"
    );
  }

  public set value(val: number) {
    this.Value = val;
    this.update();
  }

  public get value() {
    return this.Value;
  }
}
