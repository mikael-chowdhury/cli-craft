"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
class Registry {
    constructor() {
        this.contents = {};
    }
    Registry() { }
    Set(key, value) {
        this.contents[key] = value;
    }
    Get(key) {
        return this.contents[key];
    }
    Keys() {
        return Object.keys(this.contents);
    }
    Values() {
        return Object.values(this.contents);
    }
    GetContents() {
        return this.contents;
    }
}
exports.Registry = Registry;
