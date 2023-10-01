import { test } from './util';

describe('iteration', () => {
  describe('without index', () => {
    it('should repeat string N times', () => {
      test(
        [
          '{{~tps.arr:x}}*{{~}}',
          '{{~ tps.arr:x }}*{{~}}',
          '{{~ tps.arr: x }}*{{~}}',
          '{{~ tps.arr :x }}*{{~}}',
        ],
        { arr: Array(3) },
        '***'
      );
    });

    it('should concatenate items', () => {
      test(['{{~tps.arr:x}}{{=x}}{{~}}'], { arr: [1, 2, 3] }, '123');
    });
  });

  describe('with index', () => {
    it('should repeat string N times', () => {
      test(
        ['{{~tps.arr:x:i}}*{{~}}', '{{~ tps.arr : x : i }}*{{~}}'],
        { arr: Array(3) },
        '***'
      );
    });

    it('should concatenate indices', () => {
      test(['{{~tps.arr:x:i}}{{=i}}{{~}}'], { arr: Array(3) }, '012');
    });

    it('should concatenate indices and items', () => {
      test(
        ['{{~tps.arr:x:i}}{{?i}}, {{?}}{{=i}}:{{=x}}{{~}}'],
        { arr: [10, 20, 30] },
        '0:10, 1:20, 2:30'
      );
    });
  });
});
