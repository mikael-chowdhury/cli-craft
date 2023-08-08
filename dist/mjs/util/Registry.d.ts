export declare class Registry<T> {
    private contents;
    Registry(): void;
    Set(key: string, value: T): void;
    Get(key: string): T | undefined;
    Keys(): string[];
    Values(): T[];
    GetContents(): {
        [key: string]: T;
    };
}
