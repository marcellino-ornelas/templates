import { Tpsrc, TpsrcTemplateConfig } from '@tps/types/tpsrc';
import { CWD, IS_TESTING } from '@tps/utilities/constants';
import { cosmiconfigAll } from '@tps/utilities/fileSystem';
import { stripPrefix } from '@tps/utilities/helpers';
import logger from '@tps/utilities/logger';
import {
	cosmiconfig,
	defaultLoaders,
	getDefaultSearchPlaces,
} from 'cosmiconfig';
import * as is from 'is';

const tpsConfigName = 'tps';

const defaultTpsrcSearches = getDefaultSearchPlaces(tpsConfigName);

const nestedTpsrcSearches = defaultTpsrcSearches.map((location) => {
	return `.tps/${location}`;
});

/**
 * TODO: Remove these from the list
 * - .tps/.config/tpsrc.cjs
 * - .tps/.config/tpsrc.ts
 * - .tps/.config/tpsrc.js
 * - .tps/.config/tpsrc.yml
 * - .tps/.config/tpsrc.yaml
 * - .tps/.config/tpsrc.json
 * - .tps/.config/tpsrc
 * - .tps/package.json
 */
const tpsrcSearchPlaces = [...defaultTpsrcSearches, ...nestedTpsrcSearches];

const tpsrcConfig = cosmiconfig(tpsConfigName, {
	cache: !IS_TESTING,
	searchStrategy: 'global',
	loaders: defaultLoaders,
	searchPlaces: tpsrcSearchPlaces,
});

export async function getTpsrc(
	templateName: string,
): Promise<TpsrcTemplateConfig> {
	const tpsrcfiles = await cosmiconfigAll(CWD, tpsrcConfig, tpsrcSearchPlaces);

	if (is.empty(tpsrcfiles)) {
		logger.tps.info('No tps files to find: %n', {
			cwd: CWD,
			tpsrcSearchPlaces,
		});
	}

	return tpsrcfiles.reverse().reduce((tpsrcCombined, config) => {
		if (!config || config?.isEmpty) return;

		const tpsrc = config.config as Tpsrc;

		logger.tps.info('Loading tpsrc from: %s %n', config.filepath, tpsrc);

		const templateConfig =
			tpsrc[templateName] ??
			tpsrc[`tps-${templateName}`] ??
			tpsrc[stripPrefix(templateName, 'tps-')] ??
			null;

		return {
			...tpsrcCombined,
			...(templateConfig ?? {}),
		};
	}, {} as TpsrcTemplateConfig);
}
