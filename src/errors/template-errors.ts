/* eslint-disable max-classes-per-file */
import { LOCAL_PATH } from '@tps/utilities/constants';

export class TemplateNotFoundError extends Error {
  public template: string;

  constructor(templateName: string) {
    super(`Template (${templateName}) was not found.`);
    this.name = 'TemplateNotFoundError';
    this.template = templateName;
    Object.setPrototypeOf(this, TemplateNotFoundError.prototype);
  }
}

export class RequiresTemplateError extends Error {
  constructor() {
    super('Must specify a template folder to use!');
    this.name = 'RequiresTemplateError';

    Object.setPrototypeOf(this, RequiresTemplateError.prototype);
  }
}

export class PackageAlreadyCompiledError extends Error {
  constructor(packageName: string) {
    super();
    this.name = 'PackageAlreadyCompiledError';
    this.message = `Package (${packageName}) was already compiled`;
  }
}

export class SettingsUnkownFileTypeError extends Error {
  public settings: string;

  constructor(settingsPath: string) {
    super();
    this.name = 'TpsSettingsUnknownFileTypeError';
    this.settings = settingsPath;
    this.message = `\
  Could not load settings file! Please make sure this file is a json or js file 
  settings path: ${settingsPath}
  `;
  }
}

export class NoPromptsError extends Error {
  constructor() {
    super();
    this.name = 'NoPromptsError';
    this.message = `No prompts set.`;
  }
}

export class PromptNoPromptFoundError extends Error {
  public promptName: string;

  constructor(name: string) {
    super();
    this.name = 'PromptNoPromptFoundError';
    this.promptName = name;
    this.message = `There was no prompt found with the name of: ${name}`;
  }
}

export class PromptInvalidAnswersError extends Error {
  public answers: Record<string, any>;

  constructor(answers: Record<string, any>) {
    super();
    this.name = 'PromptInvalidAnswersError';
    this.answers = answers;
    this.message = `Invalid answers passed in. Answers needs to be an object. Got ${JSON.stringify(
      answers
    )}`;
  }
}

export class ParentDirectoryInitializedError extends Error {
  public tps: string;

  constructor(parentTps: string) {
    super();
    this.name = 'ParentDirectoryInitializedError';
    this.tps = parentTps;
    this.message = `\
tps is already initialized in a parent directory.
tps location: ${LOCAL_PATH}

In order to initialize this folder add the --force flag
`;
  }
}

export class InitializedAlreadyError extends Error {
  public path: string;

  constructor(filePath: string) {
    super();
    this.name = 'InitializedAlreadyError';
    this.path = filePath;
    this.message = `tps is already initialized in this repo. ${filePath}`;
  }
}

export class GlobalInitializedAlreadyError extends Error {
  public path: string;

  constructor(filePath) {
    super();
    this.name = 'GlobalInitializedAlreadyError';
    this.path = filePath;
    this.message = `tps is already initialized globally initialized`;
  }
}
