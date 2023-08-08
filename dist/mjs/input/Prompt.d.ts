import { PromptOptions, promptRenderer } from "types";
declare const Prompt: {
    <ResultType>(optionsParam: PromptOptions): Promise<ResultType>;
    renderers: {
        [key: string]: promptRenderer;
    };
    setRenderer(rendererName: string, render: (text: string) => string): void;
};
export { Prompt };
