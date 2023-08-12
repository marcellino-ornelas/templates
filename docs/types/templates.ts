import type * as utils from 'templates-mo/lib/templates/utils';

export interface Tps {
  name: string;
  answers: Record<string, any>;
  utils: typeof utils;
  u: typeof utils;
}

export interface TpsAnswer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [p: string]: any;
}
