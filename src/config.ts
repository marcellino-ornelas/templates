import { defaults } from '@tps/utilities/helpers';

export default class Config {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private configurations: Record<string, any>;

  constructor() {
    this.configurations = {};
  }

  load(configObject) {
    this.configurations = defaults(configObject, this.configurations);
    return this;
  }

  get(prop) {
    return this.configurations[prop];
  }

  set(prop, value) {
    this.configurations[prop] = value;
  }
}
