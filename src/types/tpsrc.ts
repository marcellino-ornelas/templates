import { TemplateAnswers, TemplatesOptions } from './templates';

export interface Tpsrc {
	[templateName: string]: TpsrcTemplateConfig;
}

export interface TpsrcTemplateConfig {
	opts: TemplatesOptions;
	answers: TemplateAnswers;
}
