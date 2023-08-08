export class Registry {
    contents = {};
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
