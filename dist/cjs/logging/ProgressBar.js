"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const chalk_1 = __importDefault(require("chalk"));
class ProgressBar {
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
            `  ${chalk_1.default.yellow("[")}${chalk_1.default.cyanBright(this.getBarContents())}${chalk_1.default.yellow("]")}  ` +
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
exports.ProgressBar = ProgressBar;
