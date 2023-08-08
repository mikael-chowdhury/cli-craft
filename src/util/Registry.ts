export class Registry<T> {
  private contents: { [key: string]: T } = {};

  public Registry() {}

  Set(key: string, value: T) {
    this.contents[key] = value;
  }

  Get(key: string): T | undefined {
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
