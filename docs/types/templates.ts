import type * as utils from 'templates-mo/lib/templates/utils';

export interface Tps {
  name: string;
  answers: TpsAnswers;
  utils: typeof utils;
  u: typeof utils;
  a: TpsAnswers;
}

export interface TpsAnswers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [p: string]: any;
}
