export interface TemplateOptions {
	/**
	 * Don't load local `.tps/` config folder
	 */
	noLocalConfig: boolean;
	/**
	 * Don't load global `.tps/` config folder
	 */
	noGlobalConfig: boolean;
	/**
	 * Don't load the default folder
	 */
	defaultPackage: boolean;
	/**
	 * Use all default prompt answers
	 */
	default: boolean;
	/**
	 * Show hidden prompts
	 */
	hidden: boolean;
	/**
	 * Force creation of template. This will over write files
	 */
	force: boolean;
	/**
	 * Force creation of template. This will over write files
	 */
	newFolder: boolean;
	/**
	 * Force creation of template. This will delete the directory if exists.
	 */
	wipe: boolean;
	/**
	 * Change where templates reads `.tps` folder from
	 */
	tpsPath: string | null;
	/**
	 * Directory to prepend to each build paths
	 */
	extendedDest: string;
	/**
	 * Use experimental template engine
	 */
	experimentalTemplateEngine: boolean;
}

export interface TemplateAnswers {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[answerName: string]: any;
}
