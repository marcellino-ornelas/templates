import * as is from 'is';
import logger from '@tps/utilities/logger';
import { SettingsFilePrompt } from '@tps/types/settings';

export default class Prompt {
  public name: SettingsFilePrompt['name'];

  public message: SettingsFilePrompt['message'];

  public aliases: SettingsFilePrompt['aliases'];

  public tpsType: SettingsFilePrompt['tpsType'];

  public type: SettingsFilePrompt['type'];

  public default: SettingsFilePrompt['default'];

  public choices: SettingsFilePrompt['choices'];

  public validate: SettingsFilePrompt['validate'];

  public filter: SettingsFilePrompt['filter'];

  public transformer: SettingsFilePrompt['transformer'];

  public when: SettingsFilePrompt['when'];

  public pageSize: SettingsFilePrompt['pageSize'];

  public prefix: SettingsFilePrompt['prefix'];

  public suffix: SettingsFilePrompt['suffix'];

  constructor(prompt: SettingsFilePrompt) {
    logger.prompt.info('Prompt %O', prompt);
    this.aliases = prompt.aliases || [];
    this.tpsType = prompt.tpsType || 'package';

    if (!['package', 'data'].includes(this.tpsType)) {
      throw new Error(
        "Invalid prop type in prompts. tpsType must be either 'package' or 'data'"
      );
    }

    // inquire props
    this.name = prompt.name;
    this.type = prompt.type;
    this.message = prompt.message;

    // let defaultValue;
    // const isPrompterDefaultIndex = ['list', 'rawlist', 'expand'].includes(
    //   prompt.type
    // );

    // if (isPrompterDefaultIndex) {
    //   let defaultFromChoices = this.choices[prompt.default];

    //   if (is.func(this.filter)) {
    //     defaultFromChoices = this.filter(defaultFromChoices);
    //   }

    //   defaultValue = defaultFromChoices;
    // } else {
    //   defaultValue = prompt.default;
    // }

    this.default = prompt.default;
    this.choices = prompt.choices || [];
    this.validate = prompt.validate;
    this.filter = prompt.filter;
    this.transformer = prompt.transformer;
    this.when = prompt.when;
    this.pageSize = prompt.pageSize;
    this.prefix = prompt.prefix;
    this.suffix = prompt.suffix;
  }

  isData(): boolean {
    return this.tpsType === 'data';
  }

  isPkg(): boolean {
    return !this.isData();
  }

  answerWith<T>(answers: Record<string, T>): T {
    const canAnswerBy = [this.name, ...this.aliases];

    const didAnswerBy = canAnswerBy.find((by) => is.defined(answers[by]));

    return !didAnswerBy ? undefined : answers[didAnswerBy];
  }
}
