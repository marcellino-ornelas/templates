import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '../support/constants';

const prompter = new Prompter(PROMPTER_QUESTIONS);

describe('[Prompter] Prompt:', () => {
  it('should have correct properties for simple flag', () => {
    const prompt = prompter.getPrompt('test-normal-flag');

    expect(prompt).toEqual(
      expect.objectContaining({
        name: 'test-normal-flag',
        longFlag: 'test1',
        message: 'test-normal-flag',
        default: ''
      })
    );
  });

  it('should have correct properties for advanced flag ( long )', () => {
    const prompt = prompter.getPrompt('test-advanced-long');

    expect(prompt).toEqual(
      expect.objectContaining({
        name: 'test-advanced-long',
        longFlag: 'test2',
        shortFlag: null,
        message: 'test-advanced-long',
        default: ''
      })
    );
  });

  it('should have correct properties for advanced flag ( short )', () => {
    const prompt = prompter.getPrompt('test-advanced-short');

    expect(prompt).toEqual(
      expect.objectContaining({
        name: 'test-advanced-short',
        longFlag: 'test3',
        shortFlag: 'd',
        message: 'test-advanced-short',
        default: ''
      })
    );
  });
});
