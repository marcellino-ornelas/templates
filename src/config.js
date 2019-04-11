import is from 'is';
import * as TPS from '@tps/utilities/constants';
import { defaults } from '@tps/utilities/helpers';
import { json } from '@tps/utilities/fileSystem';

export default class Config {
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
    this.configurations[name] = value;
  }
}
