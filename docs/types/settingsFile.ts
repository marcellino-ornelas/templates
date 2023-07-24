export interface Prompt {
  name: string;
  message: string;
  tpsType: 'data' | 'package';
  type: 'confirm' | 'input' | 'rawlist' | 'confirm' | 'password' | 'checkbox';
  choices: string[];
  aliases: string[];
  when: () => boolean;
  default: any;
}

export interface SettingsFile {
  prompts: Prompt[];
}
