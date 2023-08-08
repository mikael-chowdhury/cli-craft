/// <reference types="node" />
import { PassThrough } from "stream";
export declare class Logger extends PassThrough {
    private wroteNewline;
    private EntireLog;
    constructor();
    private updateNewline;
    private log;
    debug(message: any, newline?: boolean): void;
    error(message: any, newline?: boolean): void;
    success(message: any, newline?: boolean): void;
    export(path: string): void;
}
