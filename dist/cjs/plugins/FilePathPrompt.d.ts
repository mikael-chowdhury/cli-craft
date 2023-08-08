import { Plugin } from "./Plugin";
export declare class FilePathPrompt implements Plugin {
    name: string;
    version: string;
    initRenderers: () => void;
    initPlugins: () => void;
    onReady: () => void;
}
