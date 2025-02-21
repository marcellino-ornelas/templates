import * as TPS from '@tps/utilities/constants';
import { isDir, isDirAsync } from '@tps/utilities/fileSystem';
import { getAllDirectoriesAndUp, getNpmPaths } from '@tps/utilities/helpers';
import path from 'path';

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

export const directoryIsTpsInitialized = async (
	location: string,
): Promise<boolean> => {
	return isDirAsync(path.join(location, TPS.TPS_FOLDER));
};
