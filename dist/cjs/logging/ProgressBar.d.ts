export declare class ProgressBar {
    private name;
    private Value;
    private MaxValue;
    constructor(name: string, initialValue: number, maxValue: number);
    private getBarContents;
    update(): void;
    set value(val: number);
    get value(): number;
}
