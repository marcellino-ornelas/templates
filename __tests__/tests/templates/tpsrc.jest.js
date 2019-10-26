import { TESTING_TPS } from '@test/support/constants';
import Templates from '@test/templates';
import path from 'path';

/**
 * Templates testing OLD
 */
// describe.skip('[Templates] Config: ', () => {
//   describe('Using basic features', () => {
//     let tps;
//     beforeAll(() => {
//       tps = new Templates('testing', {
//         noGlobalConfig: true
//       });
//     });

//     it('should load local configurations', () => {
//       const config = tps.config;
//       console.log(config);
//       expect(config).toEqual(
//         expect.objectContaining({
//           name: 'testing-config'
//         })
//       );
//     });

//     it('should allow user to add more configurations', () => {
//       const newConfig = {
//         name: 'testing-new-config',
//         age: 24
//       };

//       tps.setAnswers(newConfig);

//       const config = tps.config;

//       expect(config).toEqual(expect.objectContaining(newConfig));
//     });

//     it("should throw error if it doesn't receive an object as a argument", () => {
//       const badConifgs = ['hey', false, true, 3456, []];

//       badConifgs.forEach(badConifg => {
//         expect(() => {
//           tps.setAnswers(badConifg);
//         }).toThrow();
//       });
//     });
//   });

//   describe('Using Prompts features', () => {
//     let tps;
//     beforeEach(() => {
//       tps = new Templates('testing-prompt-types-select', {
//         noGlobalConfig: true
//       });
//     });

//     it('should answer prompt when config is loaded', () => {
//       tps.setAnswers({ cssType: 'less' });

//       expect(tps._prompts.needsAnswers()).toBeFalsy();

//       expect(tps._prompts.answers).toHaveProperty('cssType', 'less');
//     });
//   });
// });

describe('[Templates] tpsrc: ', () => {
  let tps;
  beforeAll(() => {
    tps = new Templates('testing-tpsrc', {
      noGlobalConfig: true
    });
  });

  it('should load local tpsrc file', () => {
    const opts = tps.opts;
    const answers = tps._prompts.answers;

    expect(opts).toMatchObject({
      extendedDest: './new-path'
    });

    expect(answers).toEqual(
      expect.objectContaining({
        test: 'oh-yea'
      })
    );
  });
});
