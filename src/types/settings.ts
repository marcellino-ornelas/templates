// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnswersHash = Record<string, any>;

export enum SettingsFilePromptTpsType {
  data = 'data',
  package = 'package',
}

export enum SettingsFilePromptType {
  confirm = 'confirm',
  input = 'input',
  list = 'list',
  rawlist = 'rawlist',
  password = 'password',
  checkbox = 'checkbox',
}

export interface SettingsFilePrompt {
  name: string;

  message: string;

  tpsType: keyof typeof SettingsFilePromptTpsType;

  type: keyof typeof SettingsFilePromptType;

  choices: string[];

  aliases: string[];

  pageSize: number;

  prefix: string;

  suffix: string;

  default:
    | string
    | number
    | boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Array<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((answers: AnswersHash) => any);

  validate: (
    input: string,
    answers: AnswersHash
  ) => (boolean | string) | Promise<boolean | string>;

  filter: (input: string) => Promise<string> | string;

  transformer: (input: string) => string | Promise<string>;

  when: boolean | ((answers: AnswersHash) => boolean);
}

export interface SettingsFile {
  prompts: SettingsFilePrompt[];
}
