/*
 * Modules
 */
import Prompter from '@tps/prompter';

/*
 * Constants
 */
const PROMPTER_QUESTIONS = [
  {
    name: 'test-normal-flag',
    flag: 'test1',
    question: 'test-normal-flag',
    default: ''
  },
  {
    name: 'test-advanced-long',
    flag: {
      long: 'test2'
    },
    question: 'test-advanced-long',
    default: ''
  },
  {
    name: 'test-advanced-short',
    flag: {
      long: 'test3',
      short: 'd'
    },
    question: 'test-advanced-short',
    default: ''
  }
];

const ANSWER_TO_PROMPTS = {
  'test-normal-flag': 'value1',
  'test-advanced-long': 'value2',
  'test-advanced-short': 'value3'
};

describe('Prompter:', () => {
  let prompter;
  beforeEach(() => {
    prompter = new Prompter(PROMPTER_QUESTIONS);
  });

  describe('Prompt:', () => {
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

  it('should have all prompt answers', () => {
    prompter.setAnswers(ANSWER_TO_PROMPTS);

    prompter.getAnswers().then(promptAnswers => {
      expect(promptAnswers).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
    });
  });

  it('should have all prompt answer when flags are put in', () => {
    prompter.setAnswers({
      'test-normal-flag': 'value1',
      // testing long flag
      test2: 'value2',
      // testing short flag
      d: 'value3'
    });

    prompter.getAnswers().then(promptAnswers => {
      expect(promptAnswers).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
    });
  });
});
