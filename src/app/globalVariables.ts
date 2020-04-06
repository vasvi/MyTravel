export class GlobalVariables {
  private static globalVariables: object = {};

  static setGlobalVariable(key, value) {
    if (this.globalVariables[key] !== undefined) {
      this.globalVariables[key] = value;
    }
  }

  static getGlobalVariable(key) {
    return this.globalVariables[key];
  }
}
