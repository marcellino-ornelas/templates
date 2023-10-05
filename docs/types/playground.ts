import { SettingsFilePrompt } from 'templates-mo/src/types/settings';

export interface PlaygroundPrompt extends Partial<SettingsFilePrompt> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
}

export interface PlaygroundTps {
	name: string;
	prompts: PlaygroundPrompt[];
}
