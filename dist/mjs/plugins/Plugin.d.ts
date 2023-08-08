export interface Plugin {
    name: string;
    version: string;
    initRenderers: () => void;
    initPlugins: () => void;
    onReady: () => void;
}
