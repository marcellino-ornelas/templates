import * as TPS from '@tps/utilities/constants';
import { isDir, isDirAsync } from '@tps/utilities/fileSystem';
import { getAllDirectoriesAndUp, getNpmPaths } from '@tps/utilities/helpers';
import path from 'path';

/**
 * All tpsrc config file names.
 *
 * @example
 *
 *	[
 *		'.tps/tps.config.cjs',
 *		'.tps/tps.config.ts',
 *		'.tps/tps.config.js',
 *		'.tps/.tpsrc.cjs',
 *		'.tps/.tpsrc.ts',
 *		'.tps/.tpsrc.js',
 *		'.tps/.tpsrc.yml',
 *		'.tps/.tpsrc.yaml',x
 *		'.tps/.tpsrc.json',
 *		'.tps/.tpsrc',
 *		'tps.config.cjs',
 *		'tps.config.ts',
 *		'tps.config.js',
 *		'.config/tpsrc.cjs',
 *		'.config/tpsrc.ts',
 *		'.config/tpsrc.js',
 *		'.config/tpsrc.yml',
 *		'.config/tpsrc.yaml',
 *		'.config/tpsrc.json',
 *		'.config/tpsrc',
 *		'.tpsrc.cjs',
 *		'.tpsrc.ts',
 *		'.tpsrc.js',
 *		'.tpsrc.yml',
 *		'.tpsrc.yaml',
 *		'.tpsrc.json',
 *		'.tpsrc',
 *		'package.json'
 *	]
 */
// const tpsrcConfigNames: string[] = []; //tpsrcSearchPlaces;

/**
 * Get all locations a template can be
 *
 * Templates can be in be:
 * - any `.tps/` directory from the callers cwd and any directory above it
 * - Any `node_module` directory from the callers cwd and any directory above it
 */
export const getTemplateLocations = (cwd: string = TPS.CWD): string[] => {
	const tpsDirectoryLocations = getAllDirectoriesAndUp(cwd).map((dir) => {
		return path.join(dir, TPS.TPS_FOLDER);
	});

	// TODO: Sort this by directory
	return [
		...tpsDirectoryLocations,
		path.join(TPS.MAIN_DIR, TPS.TPS_FOLDER),
		...getNpmPaths(cwd),
	];
};

/**
 * Get the path to a template or null if template doesnt exist
 */
export const findTemplate = (
	templateName: string,
	cwd: string = TPS.CWD,
): string | null => {
	const homeDirectory = getTemplateLocations(cwd).find((tpsDir) => {
		return isDir(path.join(tpsDir, templateName));
	});

	if (!homeDirectory) return null;

	return path.join(homeDirectory, templateName);
};

// /**
//  * Gets path to the global .tps/ directory
//  */
// const getGloablTpsPath = (): string | null => {
// 	return path.join(TPS.USER_HOME, TPS.TPS_FOLDER);
// };

// const getLocalTpsPath = (): string | null => {
// 	const tpsLocal: string = findUp(TPS.TPS_FOLDER, TPS.CWD);
// 	const hasLocalTpsFolder = tpsLocal && tpsLocal !== TPS.GLOBAL_PATH;

// 	if (!hasLocalTpsFolder) return null;

// 	return tpsLocal;
// };

export const directoryIsTpsInitialized = (
	location: string,
): Promise<boolean> => {
	return isDirAsync(path.join(location, TPS.TPS_FOLDER));
};

// const hasGloablTps = (): boolean => {
// 	return Templates.directoryIsTpsInitialized(TPS.USER_HOME);
// };

// const hasLocalTps = (): boolean => {
// 	return !!Templates.getLocalTpsPath();
// };
