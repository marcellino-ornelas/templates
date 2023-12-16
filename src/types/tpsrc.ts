import { TemplateAnswers, TemplateOptions } from './templates';

export interface Tpsrc {
	[templateName: string]: TpsrcTemplateConfig;
}

export interface TpsrcTemplateConfig {
	opts: TemplateOptions;
	answers: TemplateAnswers;
}
